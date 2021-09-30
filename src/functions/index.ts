import { createSocket } from 'dgram';
import { isIPv4 } from 'net';

export interface IDoRequest {
  request: string,
  ip: string,
  port: number,
  timeout?: number,
}

export enum EDoRequest {
  NO_RESPONSE = 'No response!'
}

const DEFAULT_TIMEOUT = 3;
const MIN_TIMEOUT = 1;

export const doRequest = async (params: IDoRequest): Promise<string> => {
  if (!(params.port > 0 && params.port < 65535)) throw new Error('Port must be in range [1-65535]!');
  if (params.timeout && params.timeout < MIN_TIMEOUT) throw new Error('Timeout over 1 second is required!');
  // if (isIPv4(params.ip)) throw new Error('Invalid IPv4 address!');
  const timeout = params?.timeout || DEFAULT_TIMEOUT;
  return Promise.race<string>([
    new Promise<string>((resolve) => {
      const packet = Buffer.from(`\xFF\xFF\xFF\xFF${params.request}`, 'latin1');
      const socket = createSocket('udp4');
      socket.once('message', response => resolve(response.toString()));
      socket.send(packet, 0, packet.length, params.port, params.ip);
    }),
    new Promise<string>((resolve, reject) => setTimeout(() => reject(new Error(EDoRequest.NO_RESPONSE)), 1000 * timeout))
  ])
}
