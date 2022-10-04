import type { ICoordinates } from "../../Core/Interfaces/ICoordinates";
import type { IParticle } from "../../Core/Interfaces/IParticle";
import type { ISide } from "./PolygonDrawerBase";
import { PolygonDrawerBase } from "./PolygonDrawerBase";
export declare class PolygonDrawer extends PolygonDrawerBase {
    getSidesData(particle: IParticle, radius: number): ISide;
    getCenter(particle: IParticle, radius: number): ICoordinates;
}
