import { Observer, Subject, Subscription } from "rxjs";

export class State<T extends object> {
  data: T;
  private _subject$ = new Subject<T>();
  private _subscriptions: Subscription[] = [];

  constructor(data: T) {
    const self = this;
    this.data = new Proxy<T>(data, {
      set(target, prop, value) {
        if (prop) {
          target[prop as keyof T] = value;
          self._subject$.next(target);
          return true;
        } else return false;
      }
    });
  }

  subscribe(observer: Partial<Observer<T>>) {
    const subscription = this._subject$.subscribe(observer);
    this._subscriptions.push(subscription);
    return subscription;
  }

  clearAllSubscriptions() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}