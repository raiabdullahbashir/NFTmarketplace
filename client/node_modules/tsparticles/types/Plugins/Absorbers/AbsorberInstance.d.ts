import { Absorbers } from "./Absorbers";
import type { Container } from "../../Core/Container";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber";
import type { IAbsorberSizeLimit } from "./Options/Interfaces/IAbsorberSizeLimit";
import type { ICoordinates } from "../../Core/Interfaces/ICoordinates";
import type { IRgb } from "../../Core/Interfaces/Colors";
import type { Particle } from "../../Core/Particle";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import { RotateDirection } from "../../Enums/Directions/RotateDirection";
import { Vector } from "../../Core/Utils/Vector";
declare type OrbitingParticle = Particle & {
    absorberOrbit?: Vector;
    absorberOrbitDirection?: RotateDirection;
    needsNewPosition?: boolean;
};
export declare class AbsorberInstance {
    private readonly absorbers;
    private readonly container;
    mass: number;
    opacity: number;
    size: number;
    color: IRgb;
    limit: IAbsorberSizeLimit;
    readonly name?: string;
    position: Vector;
    private dragging;
    private readonly initialPosition?;
    private readonly options;
    constructor(absorbers: Absorbers, container: Container, options: RecursivePartial<IAbsorber>, position?: ICoordinates);
    attract(particle: OrbitingParticle): void;
    resize(): void;
    draw(context: CanvasRenderingContext2D): void;
    private calcPosition;
    private updateParticlePosition;
}
export {};
