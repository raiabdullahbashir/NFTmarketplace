import type { ICoordinates } from "../../../../Core/Interfaces/ICoordinates";
import type { IDimension } from "../../../../Core/Interfaces/IDimension";
import type { IEmitterShape } from "../../IEmitterShape";
export declare class SquareShape implements IEmitterShape {
    randomPosition(position: ICoordinates, size: IDimension, fill: boolean): ICoordinates;
}
