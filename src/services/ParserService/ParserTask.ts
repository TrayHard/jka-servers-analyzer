import { EParserType } from "../DbManagerService/interfaces/JkaServer";

export type TParserTaskParams = {
  stringToParse: string,
  serverId: string,
} & ({
  isRcon: true,
  parserType: EParserType,
} | {
  isRcon: false,
})

export class ParserTask {
  stringToParse: string;
  serverId: string;
  parserType?: EParserType;
  isRcon: boolean;
  date: Date;

  constructor(params: TParserTaskParams) {
    this.stringToParse = params.stringToParse;
    this.serverId = params.serverId;
    this.isRcon = params.isRcon;
    if (params.isRcon) {
      this.parserType = params.parserType;
    }
    this.date = new Date();
  }
}
