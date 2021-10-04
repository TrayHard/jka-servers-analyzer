import app from "./app";
import { doRequest } from "./functions/doRequest";
import { getClientIds } from "./functions/getClientIds";
import { EParserType } from "./services/DbManagerService/interfaces/JkaServer";
import { pollServer } from "./test";

// app.startApp()

doRequest({
  ip: 'rujka.ru',
  port: 29072,
  request: 'rcon 6LUWJW8pKk6LPyLd status'
},).then((r) => {
  console.log(r);
})