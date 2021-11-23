import pino, { LoggerOptions } from 'pino';
import { AppEnvironmentVariablesType } from './validateEnvironmentVariables';

export default function (config: AppEnvironmentVariablesType) {
  let options: LoggerOptions;

  switch (config.LOG_LEVEL) {
    case 'local':
      options = { prettyPrint: { colorize: true }, level: 'debug' };
      break;
    default:
      options = { level: config.LOG_LEVEL };
  }

  return pino(options);
}
