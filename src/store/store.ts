import { IJkaServer } from '../services/DbManagerService/interfaces/JkaServer';
import { State } from './State';

export class Store {
  servers = new State<IJkaServer[]>([]);
}

const store = new Store();

export default store;
