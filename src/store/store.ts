import { TJkaServer } from '../services/DbManagerService/interfaces/JkaServer';
import { ParserTask } from '../services/ParserService/ParserTask';
import { State } from './State';

export class Store {
  servers = new State<TJkaServer[]>([]);
  parserQueue = new State<ParserTask[]>([]);
}

const store = new Store();

export default store;
