import { ServiceBase } from "..";
import { EEvents } from "../../eventbus";
import logger from "../../utils/logging";
import { JkaServer } from "../DbManagerService/models/JkaServer";
import { ServerPoller } from "./ServerPoller";

export class ServersPollerService extends ServiceBase {
  pollers: ServerPoller[] = [];

  constructor() {
    super();
  }

  start() {
    const self = this;
    const sub = this.eventBus.subscribe(EEvents.DB_LOADED, {
      async next() {
        const servers = await JkaServer.find();
        self.store.servers.data = servers;
        self.pollers = servers
          .filter(server => server.isPolling)
          .map(server => new ServerPoller({
            serverId: server._id,
            ip: server.hostname,
            port: server.port,
            rconPassword: server.rconPassword,
            parserType: server.parserType,
            cooldown: 10,
          }));
        sub.unsubscribe();
        self._broadcast();
      }
    })
  }

  private _broadcast(): void {
    logger.info('ServersPollerService', 'Servers polling has been started!');
    this.eventBus.emit(EEvents.SERVER_POLLING_STARTED);
  }
}

const serversPollerService = new ServersPollerService();

export default serversPollerService;
