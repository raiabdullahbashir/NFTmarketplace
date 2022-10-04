import { Container } from "../../Core/Container";
import { Emitter } from "./Options/Classes/Emitter";
import { EmitterInstance } from "./EmitterInstance";
import type { EmittersEngine } from "./EmittersEngine";
import type { IContainerPlugin } from "../../Core/Interfaces/IContainerPlugin";
import type { ICoordinates } from "../../Core/Interfaces/ICoordinates";
import type { IDelta } from "../../Core/Interfaces/IDelta";
import type { IEmitter } from "./Options/Interfaces/IEmitter";
import type { IEmitterOptions } from "./Options/Interfaces/IEmitterOptions";
import type { IOptions } from "../../Options/Interfaces/IOptions";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple";
export declare class Emitters implements IContainerPlugin {
    #private;
    private readonly container;
    array: EmitterInstance[];
    emitters: SingleOrMultiple<Emitter>;
    interactivityEmitters: SingleOrMultiple<Emitter>;
    constructor(engine: EmittersEngine, container: Container);
    init(options?: RecursivePartial<IOptions & IEmitterOptions>): void;
    play(): void;
    pause(): void;
    stop(): void;
    update(delta: IDelta): void;
    handleClickMode(mode: string): void;
    resize(): void;
    addEmitter(options: IEmitter, position?: ICoordinates): EmitterInstance;
    removeEmitter(emitter: EmitterInstance): void;
}
