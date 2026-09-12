import { AiBackgroundRemoverEntityBase } from '../AiBackgroundRemoverEntityBase';
import type { AiBackgroundRemoverSDK } from '../AiBackgroundRemoverSDK';
import type { Control } from '../types';
import type { BackgroundRemoval, BackgroundRemovalCreateData } from '../AiBackgroundRemoverTypes';
declare class BackgroundRemovalEntity extends AiBackgroundRemoverEntityBase<BackgroundRemoval> {
    constructor(client: AiBackgroundRemoverSDK, entopts: any);
    make(this: BackgroundRemovalEntity): BackgroundRemovalEntity;
    create(this: any, reqdata?: BackgroundRemovalCreateData, ctrl?: Control): Promise<BackgroundRemovalEntity>;
}
export { BackgroundRemovalEntity };
