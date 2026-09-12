import { BackgroundRemovalEntity } from './entity/BackgroundRemovalEntity';
export type * from './AiBackgroundRemoverTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { AiBackgroundRemoverEntityBase } from './AiBackgroundRemoverEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class AiBackgroundRemoverSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    BackgroundRemoval(entopts?: Record<string, any>): BackgroundRemovalEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): AiBackgroundRemoverSDK;
    tester(testopts?: any, sdkopts?: any): AiBackgroundRemoverSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof AiBackgroundRemoverSDK;
export { stdutil, config, BaseFeature, AiBackgroundRemoverEntityBase, AiBackgroundRemoverSDK, SDK, };
