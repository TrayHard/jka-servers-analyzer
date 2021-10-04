import { ServiceBase } from "..";
import { EEvents } from "../../eventbus";
import logger from "../../utils/logging";
import { EParserType } from "../DbManagerService/interfaces/JkaServer";
import { ParserTask } from "./ParserTask";

export class ParserService extends ServiceBase {
  constructor() {
    super();
  }

  start() {
    const self = this;
    let sub = this.eventBus.subscribe(EEvents.SERVER_POLLING_STARTED, {
      async next() {
        sub.unsubscribe();
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

  processQueue(queue: ParserTask[]): void {
    const task = queue.shift();
    if (!task) return this.waitUntilDataInQueue();
    else this.processTask(task);
  }

  processTask(task: ParserTask) {
    switch (task.parserType) {
      case EParserType.BASE:
        
    }
  }
}

const parserService = new ParserService();

export default parserService;
