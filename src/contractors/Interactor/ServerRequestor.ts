import { doRequest } from "../../functions";

export enum EServerRequestErrors {
  'NO_RCON_PASSWORD' = 'No rcon password provided',
  'BAD_RCON' = 'Incorrect rcon password',
}

export interface IServerRequestor {
  ip: string,
  port: number,
  rconPw?: string,
}

export class ServerRequestor {
  private _ip: string;
  private _port: number;
  private _rconPw?: string;

  constructor(params: IServerRequestor) {
    this._ip = params.ip;
    this._port = params.port;
    this._rconPw = params.rconPw;
  }

  get ip() {
    return this._ip;
  }

  get port() {
    return this._port
  }

  get hostname() {
    return `${this.ip}:${this.port}`
  }

  private _isValidRequest(request: string): boolean {
    if (!['getinfo', 'getstatus'].includes(request)) {
      const [rcon, pass, ...cmd] = request.split(' ');
      return !!(rcon && pass && rcon === 'rcon' && cmd.length);
    } else return true;
  }

  /**
   *
   * @param request Request to the server
   * @param timeout (in secs)
   * @returns Promise with response
   */
  doRequest(request: string, timeout?: number) {
    if (!this._isValidRequest(request)) throw new Error ('Allowed requests: getinfo, getstatus, rcon <pass> <cmd>')
    return doRequest({
      ip: this._ip,
      port: this._port,
      request,
      timeout,
    })
  }

  /**
   *
   * @param request Rcon request to the server
   * @param timeout (in secs)
   * @returns Promise with response
   */
  doRconRequest(request: string, timeout?: number): Promise<string> {
    if (this._rconPw) return this.doRequest(`rcon ${this._rconPw} ${request}`, timeout)
      .then((response) => {
        const msg = response.slice(10);
        if (msg === 'Bad rconpassword.\n') throw EServerRequestErrors.BAD_RCON
        else return msg;
      })
    else return Promise.reject(EServerRequestErrors.NO_RCON_PASSWORD);
  }
}
