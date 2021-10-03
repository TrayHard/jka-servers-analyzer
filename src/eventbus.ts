import { filter, map, Observer, Subject } from "rxjs";

export enum EEvents {
  DB_LOADED = 'DB_LOADED'
}

export class EventBus {
  private _instance?: EventBus;
  private _subject$ = new Subject();

  constructor() {}

  get instance() {
    if (!this._instance === undefined) this._instance = new EventBus();
    return this._instance;
  }

  emit(event: EEvents) {
    this._subject$.next(event);
  }

  subscribe(eventName: EEvents, observer: Partial<Observer<unknown>>) {
    return this._subject$
      .pipe(
        filter(event => event === eventName)
      )
      .subscribe(observer);
  }
}

const eventBus = new EventBus();

export default eventBus;
