import { EParserType } from "../services/DbManagerService/interfaces/JkaServer";
import { IParserTaskParams, ParserTask } from "../services/ParserService/ParserTask";

export interface IParseInfoBaseParams extends IParserTaskParams {
  parserType: EParserType.BASE,
}

export const parseInfoBase = (task: IParseInfoBaseParams) => {
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
  gamemode: EGamemodes,
  players: TPlayer[],
}

export enum EGamemodes {
  FFA = 'FFA',
  DUEL = 'DUEL',
  POWER_DUEL = 'POWER_DUEL',
  TFFA = 'TFFA',
  CTF = 'CTF',
  SIEGE = 'SIEGE',
}

export type TPlayer = {
  ip: string,
  name: string,
  ping: number,
}