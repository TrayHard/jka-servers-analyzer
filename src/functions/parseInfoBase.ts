import { EParserType } from "../services/DbManagerService/interfaces/JkaServer";
import { ParserTask } from "../services/ParserService/ParserTask";

export interface IParseInfoBaseParams extends ParserTask {
  parserType: EParserType.BASE,
}

export const parseInfoBase = (task: IParseInfoBaseParams) => {
  if (task.isRcon) {
    const str = task.stringToParse;
    
  } else throw new Error('No parsing for not rcon servers implemented yet!');
}

export type TDataParsedBase = {
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