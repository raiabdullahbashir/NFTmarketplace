import type { ICoordinates } from "../../../../Core/Interfaces/ICoordinates";
import type { RangeValue } from "../../../../Types/RangeValue";
export interface IAttract {
    distance: RangeValue;
    enable: boolean;
    rotateX: number;
    rotateY: number;
    rotate: ICoordinates;
}
