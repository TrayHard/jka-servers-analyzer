import { EParserType } from "../DbManagerService/interfaces/JkaServer";

export interface IParserTaskParams {
  stringToParse: string,
  serverId: string,
  isRcon: boolean,
  parserType: EParserType,
}

export class ParserTask {
  stringToParse: string;
  serverId: string;
  parserType: EParserType;
  isRcon: boolean;
  date: Date;

  constructor(params: IParserTaskParams) {
    this.stringToParse = params.stringToParse;
    this.serverId = params.serverId;
    this.isRcon = params.isRcon;
    this.parserType = params.parserType;
    this.date = new Date();
  }
}
