import { ServiceBase } from ".";
import { serversPollerService } from './ServersPollerService';
import { dbService } from './DbManagerService';
import { parserService } from './ParserService';

export class ServiceManager {
  services: ServiceBase[] = [serversPollerService, dbService, parserService]

  init() {
    this.services.forEach(service => service.start());
  }
}
