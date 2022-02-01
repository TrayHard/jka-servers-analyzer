import { EGametypes } from "../types";
import { parseIntOtherwiseZero } from "../utils";
import { gametypeMapper } from "./gmodeMapper";

enum EGetStatusParseValueType {
  STRING = 'string',
  NUMBER = 'number',
  GAMETYPE = 'gametype',
}

function parseValue(strToParse: string, cvarName: string, type: EGetStatusParseValueType) {
  const match = strToParse.match(new RegExp(`${cvarName}\\\\(.+?)\\\\`));
  if (!match) throw new Error(`No "${cvarName}" cvar provided!`)
  const result = match[1];
  switch (type) {
    case EGetStatusParseValueType.STRING:
      return result;
    case EGetStatusParseValueType.NUMBER:
      return parseIntOtherwiseZero(result);
    case EGetStatusParseValueType.GAMETYPE:
      return gametypeMapper(result);
  }
}

export function getStatusParser (str: string): TGetStatusDataParsed {
  const strToParse = str.replace(/����statusResponse\n/, '');

  const cvars = [
    {
      cvarName: 'mapname',
      returnType: EGetStatusParseValueType.STRING,
    },
    {
      name: 'gametype',
      cvarName: 'g_gametype',
      returnType: EGetStatusParseValueType.GAMETYPE,
    },
    {
      cvarName: 'timelimit',
      returnType: EGetStatusParseValueType.NUMBER,
    },
    {
      cvarName: 'fraglimit',
      returnType: EGetStatusParseValueType.NUMBER,
    },
    {
      name: 'maxClients',
      cvarName: 'sv_maxclients',
      returnType: EGetStatusParseValueType.NUMBER,
    },
    {
      name: 'weaponDisable',
      cvarName: 'g_weapondisable',
      returnType: EGetStatusParseValueType.NUMBER,
    },
    {
      name: 'forcePowerDisable',
      cvarName: 'g_forcepowerdisable',
      returnType: EGetStatusParseValueType.NUMBER,
    },
  ]

  const result: TGetStatusDataParsed = cvars.reduce((acc, el) => ({
    ...acc,
    [el.name ?? el.cvarName]: parseValue(strToParse, el.cvarName, el.returnType),
  }), { clients: [] }) as unknown as TGetStatusDataParsed

  const playersMatch = Array.from(strToParse.matchAll(/\n\S+\s(\S+)\s"(.*)"/g));
  if (playersMatch) result.clients = playersMatch.map<TClient>(match => ({
    name: match[2],
    ping: match[1],
  }))

  return result;
}

export type TClient = {
  name: string,
  ping: string,
  ip?: string,
}

export type TGetStatusDataParsed = {
  map: string,
  gametype: EGametypes,
  clients: TClient[],
  timelimit: number,
  fraglimit: number,
  maxClients: number,
  weaponDisable: number,
  forcePowerDisable: number,
}