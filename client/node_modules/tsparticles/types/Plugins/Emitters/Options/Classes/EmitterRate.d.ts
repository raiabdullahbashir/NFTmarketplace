import type { IEmitterRate } from "../Interfaces/IEmitterRate";
import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";
import type { RangeValue } from "../../../../Types/RangeValue";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class EmitterRate implements IEmitterRate, IOptionLoader<IEmitterRate> {
    quantity: RangeValue;
    delay: RangeValue;
    constructor();
    load(data?: RecursivePartial<IEmitterRate>): void;
}
