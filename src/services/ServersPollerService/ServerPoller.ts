import { interval, Observable, OperatorFunction, take, takeUntil, takeWhile } from 'rxjs';
import { IServerRequestor, ServerRequestor } from './ServerRequestor';

export interface IServerPollerParams extends IServerRequestor {
  cooldown: number
}

export enum EInteractoErrors {
  WRONG_UID_RANGE = 'UID must be from 0 to 31!'
}

export class ServerPoller extends ServerRequestor {
  private _cooldown: number;
  private _stream$!: Observable<number>;
  private _isOn!: boolean;

  constructor(params: IServerPollerParams) {
    super(params);
    this._cooldown = params.cooldown;
    this._isOn = true;
    this._stream$ = interval(this._cooldown * 1000).pipe(takeWhile(() => this._isOn))
    const self = this;
    this._stream$.subscribe({
      next() {
        self.execute();
      },
      complete() {
        console.log('Completed');
      }
    })
  }

  private _getStatus(): Promise<string> {
    return this.doRequest('getstatus')
  }

  private _getRconStatus(): Promise<string> {
    return this.doRconRequest('status')
  }

  private _getRconDumpUser(uid: number): Promise<string> {
    if (uid < 0 || uid > 31) throw new Error(EInteractoErrors.WRONG_UID_RANGE);
    return this.doRconRequest(`dumpuser ${uid}`)
  }

  async execute() {
    if (this.hasRcon) {
      try {
        const resp = await this._getRconStatus()
        console.log('Response:\n', resp);
      } catch (error) {
        console.error('ERROR', error);
      }
    } else {
      try {
        const resp = await this._getStatus()
        console.log('Response: ', resp);
      } catch (error) {
        console.error('ERROR', error);
      }
    }
  }

  stop() {
    this._isOn = false;
  }
}