const fs = require('fs');
const util = require('util');
const colors = require('colors');

import config from '../config';
import { getTimeStamp } from './time';

const debugLogFile = fs.createWriteStream(config.logs.debugPath, {flags : 'w'});
const errorLogFile = fs.createWriteStream(config.logs.errorPath, {flags : 'w'});
const fullLogFile = fs.createWriteStream(config.logs.fullPath, {flags : 'w'});

function writeToLogFile(logFile: any, message: string, object?: any) {
  if (object) {
    logFile.write(util.format(message, object) + '\n');
  } else {
    logFile.write(util.format(message) + '\n');
  }
}

const info = (namespace: string, message: string, object?: any) => {
  const str = `[${colors.green(getTimeStamp())}] ${colors.cyan('INFO')} [${namespace}] ${colors.cyan('|')} ${message}`;
  const toPrint = [str];
  object && toPrint.push(object);
  console.log(...toPrint);
  if (!config.isDevMode) {
    writeToLogFile(fullLogFile, str, object);
  }
};

const warn = (namespace: string, message: string, object?: any) => {
  const str = `[${getTimeStamp()}] ${colors.yellow('WARN')} [${namespace}] ${colors.yellow('|')} ${message}`;
  const toPrint = [str];
  object && toPrint.push(object);
  console.warn(...toPrint);
  if (!config.isDevMode) {
    writeToLogFile(fullLogFile, str, object);
  }
};

const error = (namespace: string, message: string, object?: any) => {
  const str = `[${getTimeStamp()}] ${colors.red('ERROR')} [${namespace}] | ${message}`;
  const toPrint = [str];
  object && toPrint.push(object);
  console.error(colors.red(...toPrint));
  if (!config.isDevMode) {
    writeToLogFile(fullLogFile, str, object);
    writeToLogFile(errorLogFile, str, object);
  }
};

const debug = (namespace: string, message: string, object?: any) => {
  if (!config.debug) return;
  const str = `[${getTimeStamp()}] ${colors.blue('DEBUG')} [${namespace}] ${colors.blue('|')} ${message}`;
  const toPrint = [str];
  object && toPrint.push(object);
  console.debug(...toPrint);
  if (!config.isDevMode) {
    writeToLogFile(debugLogFile, str, object);
  }
};

const logger = {
  info,
  warn,
  error,
  debug
};

export default logger;
