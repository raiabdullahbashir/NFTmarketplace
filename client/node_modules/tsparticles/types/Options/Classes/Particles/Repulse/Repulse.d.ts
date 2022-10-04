import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IRepulse } from "../../../Interfaces/Particles/Repulse/IRepulse";
import type { RangeValue } from "../../../../Types/RangeValue";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { ValueWithRandom } from "../../ValueWithRandom";
export declare class Repulse extends ValueWithRandom implements IRepulse, IOptionLoader<IRepulse> {
    enabled: boolean;
    distance: RangeValue;
    duration: RangeValue;
    factor: RangeValue;
    speed: RangeValue;
    constructor();
    load(data?: RecursivePartial<IRepulse>): void;
}
