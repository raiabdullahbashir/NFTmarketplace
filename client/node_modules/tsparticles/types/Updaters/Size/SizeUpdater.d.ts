import type { IDelta } from "../../Core/Interfaces/IDelta";
import type { IParticleUpdater } from "../../Core/Interfaces/IParticleUpdater";
import type { Particle } from "../../Core/Particle";
export declare class SizeUpdater implements IParticleUpdater {
    init(): void;
    isEnabled(particle: Particle): boolean;
    update(particle: Particle, delta: IDelta): void;
}
