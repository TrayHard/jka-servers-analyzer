import { EParserType } from "../services/DbManagerService/interfaces/JkaServer";
import { TParserTaskParams, ParserTask } from "../services/ParserService/ParserTask";
import { EGametypes } from "../types";

export type TParseInfoBaseParams = TParserTaskParams & {
  parserType: EParserType.BASE,
}

export const parseInfoBase = (task: TParseInfoBaseParams) => {
  if (task.isRcon) {
    let str = task.stringToParse;
    str = str.replace(/����print\n/g, '');
    let map = str.match(/map: (\S+)/);
    console.log({map: map ? map[1] : null});
    return str;
  } else throw new Error('No parsing for not rcon servers implemented yet!');
}

export type TServerDataParsed = {
  playersAmount: number,
  map: string,
  gametype: EGametypes,
  players: TPlayer[],
}

export type TPlayer = {
  ip: string,
  name: string,
  ping: number,
}