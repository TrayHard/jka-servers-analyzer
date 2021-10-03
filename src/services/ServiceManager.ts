import { ServiceBase } from ".";
import { serversPollerService } from './ServersPollerService';
import { dbService } from './DbManagerService';

export class ServiceManager {
  services: ServiceBase[] = [serversPollerService, dbService]

  init() {
    this.services.forEach(service => service.start());
  }
}
