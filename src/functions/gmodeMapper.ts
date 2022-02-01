import { EGametypes } from "../types";

export const gametypeMapper = (g_gametype: any): EGametypes => {
  switch (g_gametype) {
    case "0":
      return EGametypes.FFA;
    case "3":
      return EGametypes.DUEL;
    case "4":
      return EGametypes.POWER_DUEL;
    case "6":
      return EGametypes.TFFA;
    case "7":
      return EGametypes.SIEGE;
    case "8":
      return EGametypes.CTF;
    default:
      throw new Error(`There is no g_gametype type for value "${g_gametype}"!`);
  }
}