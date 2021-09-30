import { createSocket } from 'dgram';
import { TServer } from '../../types';
import { IServerRequestor, ServerRequestor } from './ServerRequestor';

const REQUEST_TIMEOUT = 5; // secs
const REQUEST_COOLDOWN = 1; // mins

async function pollServer(HOST: string, PORT: string): Promise<any> {
  async function getStatusNet() {
    return new Promise((resolve, reject) => {
      const packet = Buffer.from('\xFF\xFF\xFF\xFFgetinfo', 'latin1');
      const socket = createSocket('udp4');
      socket.on('message', (msg, rinfo) => {
        resolve(msg.toString());
      });
      socket.send(packet, 0, packet.length, +PORT, HOST);
    });
  }
  // `����infoResponse
  // \\game\\eternaljk\\autodemo\\0\\fdisable\\163837\\wdisable\\524279\\truejedi\\0\\needpass\\1\\gametype\\3\\sv_maxclients\\16\\g_humanplayers\\0\\clients\\0\\mapname\\mp/duel1\\hostname\\^4/^1/^7RU^1JKA^0|^7DUEL\\protocol\\26`

  async function getStatusNetTimeout() {
    return new Promise(function (resolve, reject) {
      setTimeout(reject, 1000 * REQUEST_TIMEOUT);
    });
  }

  return Promise.race([getStatusNet(), getStatusNetTimeout()]);
}

export interface IInteractorParams extends IServerRequestor {
  cooldown: number
}

export class Interactor extends ServerRequestor {
  constructor(params: IInteractorParams) {
    super(params)
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
    return this.doRconRequest(`dumpuser ${uid}`)
  }

  execute() {

  }
}