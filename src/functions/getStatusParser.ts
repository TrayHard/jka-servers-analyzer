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
}