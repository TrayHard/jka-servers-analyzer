import app from "./app";
import { doRequest } from "./functions/doRequest";
import dotenv from 'dotenv';
import { pollServer } from "./test";
import crypto from 'asymmetric-crypto';
import { ServerRequestor } from "./services/ServersPollerService/ServerRequestor";
import { getCvarValue } from "./functions/getCvarValue";

dotenv.config();

const RCON_ENC = process.env.RCON_ENC
app.startApp();

// getCvarValue({
//   ip: 'rujka.ru',
//   port: 29070,
//   request: `getstatus`
// }).then(str => console.log(str))

// pollServer('rujka.ru', '29070')
//   .then(console.log)
//   .catch(console.error)

// const svRq = new ServerRequestor({
//   ip: 'rujka.ru',
//   port: 29072,
//   rconPassword: RCON_ENC,
// })

// svRq.getCvarValue('timelimit').then(res => console.log(getCvarValue(res, 'timelimit')))