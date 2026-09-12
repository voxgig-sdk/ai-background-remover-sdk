import { Context } from './Context';
declare class AiBackgroundRemoverError extends Error {
    isAiBackgroundRemoverError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { AiBackgroundRemoverError };
