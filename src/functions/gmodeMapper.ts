export const gamemodeMapper = (g_gamemode: any): EGamemodes => {
  switch (g_gamemode) {
    case "0":
      return EGamemodes.FFA;
    case "3":
      return EGamemodes.DUEL;
    case "4":
      return EGamemodes.POWER_DUEL;
    case "6":
      return EGamemodes.TFFA;
    case "7":
      return EGamemodes.SIEGE;
    case "8":
      return EGamemodes.CTF;
    default:
      throw new Error(`There is no gamemode type for value "${g_gamemode}"!`);
  }
}

export enum EGamemodes {
  FFA = 'FFA',
  DUEL = 'DUEL',
  POWER_DUEL = 'POWER_DUEL',
  TFFA = 'TFFA',
  CTF = 'CTF',
  SIEGE = 'SIEGE',
}