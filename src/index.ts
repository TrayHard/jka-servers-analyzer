import config from "./config";
import { Interactor } from "./contractors/Interactor/Interactor";

const rujka = new Interactor({
  ip: 'rujka.ru',
  port: 29070,
  rconPw: config.rcon,
  cooldown: 10,
})

rujka.execute()