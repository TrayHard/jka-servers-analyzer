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
            ip: server.hostname,
            port: server.port,
            rconPassword: server.rconPassword,
            cooldown: 10,
          }))
        sub.unsubscribe();
        logger.info('ServersPollerService', 'Servers polling has been started!');
      }
    })
  }
}

const serversPollerService = new ServersPollerService();

export default serversPollerService;
