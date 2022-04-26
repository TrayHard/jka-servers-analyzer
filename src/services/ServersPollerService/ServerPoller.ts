import { interval, Observable, takeWhile } from 'rxjs';
import store from '../../store/store';
import logger from '../../utils/logger';
import { EParserType } from '../DbManagerService/interfaces/JkaServer';
import { ParserTask } from '../ParserService/ParserTask';
import { IServerRequestor, ServerRequestor } from './ServerRequestor';

export interface IServerPollerParams extends IServerRequestor {
  serverId: string,
  cooldown: number,
  parserType: EParserType,
}

// ? TODO: Will be needed when Clientuserinfo would be implemented
// export enum EInteractErrors {
//   WRONG_UID_RANGE = 'UID must be from 0 to 31!',
// }

/**
 * Polls JKA server with specified cooldown and parserType
 */
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
      // Once created: each _cooldown secs poll the server and parse the data unless _isOn is false
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

  // ! TODO: Rcon status parsing
  // private _getRconStatus(): Promise<string> {
  //   return this.doRconRequest('status');
  // }

  // ? TODO: Clientuserinfo parsing for next version
  // private _getRconDumpUser(uid: number): Promise<string> {
  //   if (uid < 0 || uid > 31) throw new Error(EInteractErrors.WRONG_UID_RANGE);
  //   return this.doRconRequest(`dumpuser ${uid}`)
  // }

  async execute() {
    const self = this;
    try {
      const getStatusResponse = await this._getStatus();
      store.parserQueue.data.push(new ParserTask({
        stringToParse: getStatusResponse,
        serverId: self._serverId,
        // parserType: self._parserType,
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