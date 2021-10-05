import { getTimeStamp } from '.';
import config from '../config';

const colors = require('colors');

const info = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.log(`[${getTimeStamp()}] ${colors.blue('INFO')} [${namespace}] ${message}`, object);
  } else {
    console.log(`[${getTimeStamp()}] ${colors.blue('INFO')} [${namespace}] ${message}`);
  }
};

const warn = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.warn(`[${getTimeStamp()}] ${colors.yellow('WARN')} [${namespace}] ${message}`, object);
  } else {
    console.warn(`[${getTimeStamp()}] ${colors.yellow('WARN')} [${namespace}] ${message}`);
  }
};

const error = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.error(`[${getTimeStamp()}] ${colors.red('ERROR')} [${namespace}] ${message}`, object);
  } else {
    console.error(`[${getTimeStamp()}] ${colors.red('ERROR')} [${namespace}] ${message}`);
  }
};

const debug = (namespace: string, message: string, object?: any) => {
  if (config.isDebug) {
    if (object) {
      console.debug(`[${getTimeStamp()}] ${colors.cyan('DEBUG')} [${namespace}] ${message}`, object);
    } else {
      console.debug(`[${getTimeStamp()}] ${colors.cyan('DEBUG')} [${namespace}] ${message}`);
    }
  }
};

const logger = {
  info,
  warn,
  error,
  debug
};

export default logger;
