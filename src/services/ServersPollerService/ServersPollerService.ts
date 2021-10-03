import { ServiceBase } from "..";
import { EEvents } from "../../eventbus";
import { JkaServer } from "../DbManagerService/models/JkaServer";
import { ServerPoller } from "./ServerPoller";

export class ServersPollerService extends ServiceBase {
  pollers: ServerPoller[] = [];

  constructor() {
    super();
  }

  start() {
    const sub = this.eventBus.subscribe(EEvents.DB_LOADED, {
      async next() {
        const jkaServers = await JkaServer.find();
        console.log({ jkaServers });
        sub.unsubscribe();
      }
    })
  }
}

const serversPollerService = new ServersPollerService();

export default serversPollerService;
