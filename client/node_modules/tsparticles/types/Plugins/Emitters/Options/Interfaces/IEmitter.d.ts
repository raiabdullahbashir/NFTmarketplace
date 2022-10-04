import type { MoveDirection, MoveDirectionAlt } from "../../../../Enums/Directions/MoveDirection";
import type { EmitterShapeType } from "../../Enums/EmitterShapeType";
import type { IAnimatableColor } from "../../../../Options/Interfaces/IAnimatableColor";
import type { IEmitterLife } from "./IEmitterLife";
import type { IEmitterRate } from "./IEmitterRate";
import type { IEmitterSize } from "./IEmitterSize";
import type { IParticles } from "../../../../Options/Interfaces/Particles/IParticles";
import type { IRangedCoordinates } from "../../../../Core/Interfaces/ICoordinates";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export interface IEmitter {
    autoPlay: boolean;
    size?: IEmitterSize;
    direction?: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt | number;
    domId?: string;
    fill: boolean;
    life: IEmitterLife;
    name?: string;
    particles?: RecursivePartial<IParticles>;
    position?: RecursivePartial<IRangedCoordinates>;
    rate: IEmitterRate;
    shape: EmitterShapeType | keyof typeof EmitterShapeType;
    spawnColor?: IAnimatableColor;
    startCount: number;
}
