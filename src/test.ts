import { createSocket } from 'dgram';
import { networkInterfaces } from 'os';
import config from './config';

const REQUEST_TIMEOUT = 5; // secs
const REQUEST_COOLDOWN = 1; // mins

export async function pollServer(HOST: string, PORT: string): Promise<any> {
  async function getStatusNet() {
    return new Promise((resolve, reject) => {
      const packet = Buffer.from(`\xFF\xFF\xFF\xFFrcon ${process.env.RCON} status`, 'latin1');
      const socket = createSocket('udp4');
      socket.once('message', response => {
        const msg = response.toString();
        resolve(msg)
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
