import { doRequest } from "../../functions/doRequest";
import { createDecipheriv, createCipheriv, randomBytes } from 'crypto';
import { decrypt, encrypt } from "../../utils/cryptoTools";

export enum EServerRequestErrors {
  NO_RCON_PASSWORD = 'No rcon password provided',
  BAD_RCON = 'Incorrect rcon password',
  INVALID_REQUEST = 'Allowed requests: getinfo, getstatus, rcon <pass> <cmd>',
}

export interface IServerRequestor {
  ip: string,
  port: number,
  rconPassword?: string,
}

/**
 * Provides object linked to specific JKA server and allows you to make requests
 */
export class ServerRequestor {
  private _ip: string;
  private _port: number;
  private _rconpassword?: string;

  constructor(params: IServerRequestor) {
    this._ip = params.ip;
    this._port = params.port;
    if (params.rconPassword) {
      this._rconpassword = decrypt(params.rconPassword);
    }
  }

  get ip(): string {
    return this._ip;
  }

  get port(): number {
    return this._port
  }

  get hostname(): string {
    return `${this.ip}:${this.port}`
  }

  get hasRcon(): boolean {
    return !!this._rconpassword;
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
    if (!this._isValidRequest(request)) throw new Error(EServerRequestErrors.INVALID_REQUEST)
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
    if (this._rconpassword) return this.doRequest(`rcon ${this._rconpassword} ${request}`, timeout)
      .then((response) => {
        const msg = response.replace(/????????????print\n/g, '').trim();
        if (msg === 'Bad rconpassword.\n') throw new Error(EServerRequestErrors.BAD_RCON)
        else return msg;
      })
    else return Promise.reject(new Error(EServerRequestErrors.NO_RCON_PASSWORD));
  }

  async getCvarValue(cvar: string) {
    return await this.doRconRequest(cvar)
  }
}
