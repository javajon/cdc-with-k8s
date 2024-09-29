import { pino } from 'pino';
import { LogLevel } from './types';
export declare const createLogger: (level: LogLevel) => pino.Logger;
