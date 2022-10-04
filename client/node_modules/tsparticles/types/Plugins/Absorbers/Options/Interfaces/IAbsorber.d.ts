import type { IAbsorberSize } from "./IAbsorberSize";
import type { IColor } from "../../../../Core/Interfaces/Colors";
import type { IRangedCoordinates } from "../../../../Core/Interfaces/ICoordinates";
import { RecursivePartial } from "../../../../Types/RecursivePartial";
export interface IAbsorber {
    color: IColor | string;
    name?: string;
    opacity: number;
    position?: RecursivePartial<IRangedCoordinates>;
    size: IAbsorberSize;
    draggable: boolean;
    destroy: boolean;
    orbits: boolean;
}
