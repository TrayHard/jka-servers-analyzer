import { parseIntOtherwiseZero } from "../utils";
import { EGamemodes, gamemodeMapper } from "./gmodeMapper";

export const getStatusParser = (str: string): TServerDataParsed => {
  let strToParse = str.replace(/����statusResponse\n/, '');

  let map;
  const mapMatch = strToParse.match(/mapname\\(.+?)\\/);
  if (mapMatch) map = mapMatch[1];
  else throw new Error('No mapname provided!')

  let gamemode;
  const gamemodeMatch = strToParse.match(/g_gametype\\([0-9])\\/);
  if (gamemodeMatch) gamemode = gamemodeMapper(gamemodeMatch[1]);
  else throw new Error('No g_gametype provided!')

  let timelimit;
  const timelimitMatch = strToParse.match(/timelimit\\([0-9]+)\\/);
  if (timelimitMatch) timelimit = parseIntOtherwiseZero(timelimitMatch[1]);
  else throw new Error('No timelimit provided!')

  let fraglimit;
  const fraglimitMatch = strToParse.match(/fraglimit\\([0-9]+)\\/);
  if (fraglimitMatch) fraglimit = parseIntOtherwiseZero(fraglimitMatch[1]);
  else throw new Error('No fraglimit provided!')

  let maxPlayers;
  const maxPlayersMatch = strToParse.match(/sv_maxclients\\([0-9]+)\\/);
  if (maxPlayersMatch) maxPlayers = parseIntOtherwiseZero(maxPlayersMatch[1]);
  else throw new Error('No maxPlayers provided!')

  let weaponDisable;
  const weaponDisableMatch = strToParse.match(/g_weapondisable\\([0-9]+)\\/);
  if (weaponDisableMatch) weaponDisable = parseIntOtherwiseZero(weaponDisableMatch[1]);
  else throw new Error('No weaponDisable provided!')

  let clients: TClient[] = [];
  const playersMatch = Array.from(strToParse.matchAll(/\n\S+\s(\S+)\s"(.*)"/g));
  if (playersMatch) clients = playersMatch.map<TClient>(match => ({
    name: match[2],
    ping: match[1],
  }))

  return {
    map,
    gamemode,
    clients,
    timelimit,
    fraglimit,
  };
}

export type TClient = {
  name: string,
  ping: string,
  ip?: string,
}

export type TServerDataParsed = {
  map: string,
  gamemode: EGamemodes,
  clients: TClient[],
  timelimit: number,
  fraglimit: number,
}