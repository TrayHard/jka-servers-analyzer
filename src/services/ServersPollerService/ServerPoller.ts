import { interval, Observable, takeWhile } from 'rxjs';
import store from '../../store/store';
import logger from '../../utils/logging';
import { EParserType } from '../DbManagerService/interfaces/JkaServer';
import { ParserTask } from '../ParserService/ParserTask';
import { IServerRequestor, ServerRequestor } from './ServerRequestor';

export interface IServerPollerParams extends IServerRequestor {
  serverId: string,
  cooldown: number,
  parserType: EParserType,
}

export enum EInteractoErrors {
  WRONG_UID_RANGE = 'UID must be from 0 to 31!',
}

export class ServerPoller extends ServerRequestor {
  private _cooldown: number;
  private _stream$: Observable<number>;
  private _isOn: boolean;
  private _serverId: string;
  private _parserType: EParserType;

  constructor(params: IServerPollerParams) {
    super(params);
    this._cooldown = params.cooldown;
    this._serverId = params.serverId;
    this._parserType = params.parserType;
    this._isOn = true;
    this._stream$ = interval(this._cooldown * 1000).pipe(takeWhile(() => this._isOn));
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
    return this.doRequest('getstatus');
  }

  private _getRconStatus(): Promise<string> {
    return this.doRconRequest('status');
  }

  // TODO: Clientuseinfo parsing for next version
  // private _getRconDumpUser(uid: number): Promise<string> {
  //   if (uid < 0 || uid > 31) throw new Error(EInteractoErrors.WRONG_UID_RANGE);
  //   return this.doRconRequest(`dumpuser ${uid}`)
  // }

  async execute() {
    const self = this;
    try {
      const getStatusResponse = await this._getStatus();
      store.parserQueue.data.push(new ParserTask({
        stringToParse: getStatusResponse,
        serverId: self._serverId,
        parserType: self._parserType,
        isRcon: false,
      }));
    } catch (error) {
      logger.error('ServerPoller', '', error);
    }
  }

  stop() {
    this._isOn = false;
  }
}