import { log } from "util";
import { ServiceBase } from "..";
import { EEvents } from "../../eventbus";
import { getStatusParser, TClient } from "../../functions/getStatusParser";
import logger from "../../utils/logger";
import { JkaClient } from "../DbManagerService/models/JkaClient";
import { OnlineStamp } from "./OnlineStamp";
import { ParserTask } from "./ParserTask";

const NAMESPACE = 'ParserService';

/**
 * start() => waitUntilDataInQueue() => processDataFromQueue =>
 * => processQueue() means processTask() unless no task left =>
 * => back to waitUntilDataInQueue()
 */
export class ParserService extends ServiceBase {
  constructor() {
    super();
  }

  start() {
    const self = this;
    let sub = this.eventBus.subscribe(EEvents.SERVER_POLLING_STARTED, {
      async next() {
        sub.unsubscribe();
        self.waitUntilDataInQueue();
        logger.info('ParserService', 'Parser service has been started!');
      }
    })
  }

  waitUntilDataInQueue(): void {
    const self = this;
    const sub = self.store.parserQueue.subscribe({
      next(queue) {
        sub.unsubscribe();
        self.processQueue(queue);
      }
    })
  }

  async processQueue(queue: ParserTask[]): Promise<void> {
    const task = queue.shift();
    if (!task) return this.waitUntilDataInQueue();
    else {
      await this.processTask(task);
      this.processQueue(queue);
    }
  }

  async processTask(task: ParserTask): Promise<void> {
    const parsedData = getStatusParser(task.stringToParse);
    const server = this.store.servers.data.find(server => server._id === task.serverId);
    logger.debug('ParserService', 'Processing the task', task)
    if (server) {
      server.online.push(new OnlineStamp(parsedData.clients.length))
      server.map = parsedData.map;
      server.gametype = parsedData.gametype;
      server.weaponDisable = parsedData.weaponDisable;
      server.maxClients = parsedData.maxClients;
      server.fraglimit = parsedData.fraglimit;
      server.timelimit = parsedData.timelimit;

      await server.save();
      logger.debug(NAMESPACE, `Updating server, name: "${server.label}", online: ${parsedData.clients.length}`);
    };
    for (const client of parsedData.clients) {
      await this.addOrUpdateClient(client);
    }
  }

  async addOrUpdateClient(client: TClient): Promise<void> {
    const clientCandidate = await JkaClient.findOne({ name: client.name });
    if (clientCandidate && (+client.ping || +client.ping === 0)) {
      await clientCandidate.updateOne({ pings: [...clientCandidate.pings, +client.ping] });
      await clientCandidate.save();
    } else await new JkaClient({
      name: client.name,
      pings: +client.ping ? [+client.ping] : [],
    }).save();
    logger.debug(NAMESPACE, `Saving client, name: "${client.name}", ping: ${client.ping}`);
  }
}

const parserService = new ParserService();

export default parserService;
