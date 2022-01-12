import app from "./app";
import { doRequest } from "./functions/doRequest";
import dotenv from 'dotenv';
import { pollServer } from "./test";
import crypto from 'asymmetric-crypto';

dotenv.config();

const RCON = process.env.RCON
// app.startApp();

// doRequest({
//   ip: 'rujka.ru',
//   port: 29070,
//   request: `rcon ${RCON} g_forceregentime`
// }).then(str => console.log(str))

// const res = pollServer('rujka.ru', '29070')
//   .then(console.log)
//   .catch(console.error)
