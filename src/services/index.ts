import app, { App } from "../app";
import eventBus, { EventBus } from "../eventbus";
import store, { Store } from "../store/store";
import logger from "../utils/logging";

interface IServiceBase {
  app: App,
  store: Store,
  eventBus: EventBus,
  start: () => void
}

export interface IServiceBaseParams {
  app: App,
  store: Store,
  eventBus: EventBus,
}

export class ServiceBase implements IServiceBase {
  app;
  store;
  eventBus;

  constructor() {
    this.app = app;
    this.store = store;
    this.eventBus = eventBus;
  }

  start() {
    logger.error('Services', 'Method "init" was not redefined for current Service!');
  }
}

