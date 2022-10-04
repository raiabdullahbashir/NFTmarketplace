import type { IDelta } from "../../Core/Interfaces/IDelta";
import type { IParticleMover } from "../../Core/Interfaces/IParticlesMover";
import type { Particle } from "../../Core/Particle";
import type { SpinParticle } from "./Types";
export declare class BaseMover implements IParticleMover {
    init(particle: SpinParticle): void;
    isEnabled(particle: Particle): boolean;
    move(particle: SpinParticle, delta: IDelta): void;
}
