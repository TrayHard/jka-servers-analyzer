import { createCipheriv, createDecipheriv } from "crypto";
import { config as enableEnvs } from 'dotenv';

enableEnvs();

let CRYPTO_KEY: string, CRYPTO_IV: Buffer;

if (!process.env.CRYPTO_IV || !process.env.CRYPTO_KEY) throw new Error('Check CRYPTO_IV and CRYPTO_KEY envs!')

CRYPTO_KEY = process.env.CRYPTO_KEY;
CRYPTO_IV = Buffer.from(process.env.CRYPTO_IV, 'hex');

export function encrypt(str: string, algo: string = 'aes-256-cbc'): string {
  const cipher = createCipheriv(algo, CRYPTO_KEY, CRYPTO_IV)
  return cipher.update(str, 'utf-8', 'hex') + cipher.final('hex')
}

export function decrypt(str: string, algo: string = 'aes-256-cbc'): string {
  const decipher = createDecipheriv(algo, CRYPTO_KEY, CRYPTO_IV)
  return decipher.update(str, 'hex', 'utf-8') + decipher.final('utf-8')
}