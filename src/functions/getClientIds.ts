import { EParserType } from "../services/DbManagerService/interfaces/JkaServer";

export interface IGetClientNumsParams {
  str: string,
  parserType: EParserType,
  isRcon: boolean,
}

export const getClientIds = (params: IGetClientNumsParams): number[] => {
  let result: number[] = []
  switch (params.parserType) {
    case EParserType.JAPRO:
      result = getClientIdsJapro(params.str, params.isRcon);
      break;
    case EParserType.BASE:
      result = getClientIdsBase(params.str, params.isRcon);
      break;
    case EParserType.YBEPROXY:
      result = getClientIdsYbeproxy(params.str, params.isRcon);
      break;
  }
  return result;
}

const getClientIdsJapro = (str: string, isRcon: boolean): number[] => {
  if (isRcon) {
    const match = str.match(/\n\s*(\d{1,2})/g);
    return match ? match.map(el => +el.slice(2)) : [];
  } else throw new Error('No parsing for not rcon servers implemented yet!');
}

const getClientIdsBase = (str: string, isRcon: boolean): number[] => {
  if (isRcon) {
    const match = str.match(/\n\s*(\d{1,2})/g);
    return match ? match.map(el => +el.slice(2)) : [];
  } else throw new Error('No parsing for not rcon servers implemented yet!');
}

const getClientIdsYbeproxy = (str: string, isRcon: boolean): number[] => {
  if (isRcon) {
    const match = Array.from(str.matchAll(/\n\s*\d{1,2}(?:\s*\d+){2}\s*[0-9.:]*\s*(\d+)/g)).map(el => +el[1]);
    return match ? match : [];
  } else throw new Error('No parsing for not rcon servers implemented yet!');
}