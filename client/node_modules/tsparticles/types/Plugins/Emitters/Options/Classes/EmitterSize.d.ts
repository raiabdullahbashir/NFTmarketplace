import type { IEmitterSize } from "../Interfaces/IEmitterSize";
import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { SizeMode } from "../../../../Enums/Modes/SizeMode";
export declare class EmitterSize implements IEmitterSize, IOptionLoader<IEmitterSize> {
    mode: SizeMode | keyof typeof SizeMode;
    height: number;
    width: number;
    constructor();
    load(data?: RecursivePartial<IEmitterSize>): void;
}
