import mongoose, { Mongoose } from "mongoose";
import app from "./app";
import config from "./config";
import { doRequest } from "./functions/doRequest";
import { getClientIds } from "./functions/getClientIds";
import { getStatusParser } from "./functions/getStatusParser";
import { parseInfoBase } from "./functions/parseInfoBase";
import { dbService } from "./services/DbManagerService";
import { EParserType } from "./services/DbManagerService/interfaces/JkaServer";
import { JkaServer } from "./services/DbManagerService/models/JkaServer";
import { pollServer } from "./test";

app.startApp()

// mongoose.connect(config.mongo.url, config.mongo.options).then(async (test) => {
//   await new JkaServer({
//     hostname: 'rujka.ru',
//     port: 29070,
//     label: 'RUJKA Timeless',
//     rconPassword: '6LUWJW8pKk6LPyLd',
//     isPolling: true,
//     online: [],
//     parserType: EParserType.YBEPROXY,
//     note: 'YbeProxy 30 fps'
//   }).save();
//   await new JkaServer({
//     hostname: 'rujka.ru',
//     port: 29071,
//     label: 'RUJKA Modern',
//     rconPassword: '6LUWJW8pKk6LPyLd',
//     isPolling: true,
//     online: [],
//     parserType: EParserType.JAPRO,
//     note: 'jaPRO 30 fps'
//   }).save();
//   await new JkaServer({
//     hostname: 'rujka.ru',
//     port: 29072,
//     label: 'RUJKA Ancient',
//     rconPassword: '6LUWJW8pKk6LPyLd',
//     isPolling: true,
//     online: [],
//     parserType: EParserType.BASE,
//     note: 'JASS + svstats, 20 fps'
//   }).save();
// })

// doRequest({
//   ip: 'rujka.ru',
//   port: 29072,
//   request: 'getstatus'
// }).then((stringToParse) => {
//   // console.log({ stringToParse });

//   console.log(getStatusParser(stringToParse));

//   // console.log(parseInfoBase({
//   //   isRcon: true,
//   //   parserType: EParserType.BASE,
//   //   serverId: "",
//   //   stringToParse,
//   // }));
// })

// 6LUWJW8pKk6LPyLd status