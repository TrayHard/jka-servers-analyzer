// "g_forceregentime" is:"200^7" default:"200^7"
export function getCvarValue(str: string, cvarName: string): string {
  const reg = new RegExp(`"${cvarName}" is:"(.+?)\\^7" default:"(.+?)\\^7"`)
  const match = str.match(reg);
  if (!match) throw new Error(`No match for ${cvarName}!`)
  else return match[1];
}
