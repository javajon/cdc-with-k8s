import { ProxyOptions, ProviderState } from '../types';
import { JsonMap } from '../../../../common/jsonTypes';
export declare const setupStates: (state: ProviderState, config: ProxyOptions) => Promise<JsonMap | void>;
