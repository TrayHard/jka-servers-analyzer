import { interval, Observable, OperatorFunction } from 'rxjs';
import { IServerRequestor, ServerRequestor } from './ServerRequestor';

export interface IInteractorParams extends IServerRequestor {
  cooldown: number
}

export enum EInteractoErrors {
  WRONG_UID_RANGE = 'UID must be from 0 to 31!'
}

export class Interactor extends ServerRequestor {
  private _cooldown: number;
  private _stream$!: Observable<number>;

  constructor(params: IInteractorParams) {
    super(params);
    this._cooldown = params.cooldown;
    this._stream$ = interval(this._cooldown * 1000);
    this._stream$.subscribe(() => {
      this.execute();
    })
  }

  private _getInfo(): Promise<string> {
    return this.doRequest('getinfo')
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
        console.log('Response: ', resp);
      } catch (error) {
        console.error('ERROR', error);
      }
    } else {
      console.error('No rcon');
    }
  }
}