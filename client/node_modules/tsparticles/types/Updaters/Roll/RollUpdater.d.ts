import type { IDelta } from "../../Core/Interfaces/IDelta";
import type { IParticleUpdater } from "../../Core/Interfaces/IParticleUpdater";
import type { Particle } from "../../Core/Particle";
export declare class RollUpdater implements IParticleUpdater {
    init(particle: Particle): void;
    isEnabled(particle: Particle): boolean;
    update(particle: Particle, delta: IDelta): void;
}
