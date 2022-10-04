import { Absorber } from "./Options/Classes/Absorber";
import { AbsorberInstance } from "./AbsorberInstance";
import type { Container } from "../../Core/Container";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber";
import type { IAbsorberOptions } from "./Options/Interfaces/IAbsorberOptions";
import type { IContainerPlugin } from "../../Core/Interfaces/IContainerPlugin";
import type { ICoordinates } from "../../Core/Interfaces/ICoordinates";
import type { IOptions } from "../../Options/Interfaces/IOptions";
import type { Particle } from "../../Core/Particle";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple";
export declare class Absorbers implements IContainerPlugin {
    private readonly container;
    array: AbsorberInstance[];
    absorbers: SingleOrMultiple<Absorber>;
    interactivityAbsorbers: SingleOrMultiple<Absorber>;
    constructor(container: Container);
    init(options?: RecursivePartial<IOptions & IAbsorberOptions>): void;
    particleUpdate(particle: Particle): void;
    draw(context: CanvasRenderingContext2D): void;
    stop(): void;
    resize(): void;
    handleClickMode(mode: string): void;
    addAbsorber(options: IAbsorber, position?: ICoordinates): AbsorberInstance;
    removeAbsorber(absorber: AbsorberInstance): void;
}
