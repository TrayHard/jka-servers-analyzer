import mongoose from "mongoose";
import { ServiceBase } from "..";
import config from "../../config";
import { EEvents } from "../../eventbus";
import logger from "../../utils/logging";

const NAMESPACE = 'DBService'

class DbManagerService extends ServiceBase {
  async start() {
    try {
      await mongoose.connect(config.mongo.url, config.mongo.options)
      this.eventBus.emit(EEvents.DB_LOADED);
      logger.info(NAMESPACE, 'Connected to MongoDB!');
    } catch (error) {
      logger.error(NAMESPACE, (error as Error).message, error);
    }
  }
}

export const dbService = new DbManagerService();
