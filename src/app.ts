import { ServiceManager } from "./services/ServiceManager";

export class App {
  private _instance?: App
  serviceManager = new ServiceManager();

  constructor() {}

  get instance() {
    if (this._instance === undefined) this._instance = new App();
    return this._instance;
  }

  async startApp() {
    this.serviceManager.init();
  }
}

const app = new App();

export default app;
