import express from 'express';
import { ProxyOptions } from './types';
export declare const registerBeforeHook: (app: express.Express, config: ProxyOptions, stateSetupPath: string) => void;
export declare const registerAfterHook: (app: express.Express, config: ProxyOptions, stateSetupPath: string) => void;
