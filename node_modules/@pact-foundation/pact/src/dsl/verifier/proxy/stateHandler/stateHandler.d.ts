import express from 'express';
import { ProxyOptions } from '../types';
export declare const createProxyStateHandler: (config: ProxyOptions) => (req: express.Request, res: express.Response) => Promise<express.Response>;
