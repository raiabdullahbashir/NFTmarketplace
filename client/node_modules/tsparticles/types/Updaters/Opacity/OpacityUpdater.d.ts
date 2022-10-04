import type { Container } from "../../Core/Container";
import type { IDelta } from "../../Core/Interfaces/IDelta";
import { IParticleUpdater } from "../../Core/Interfaces/IParticleUpdater";
import type { Particle } from "../../Core/Particle";
export declare class OpacityUpdater implements IParticleUpdater {
    private readonly container;
    constructor(container: Container);
    init(particle: Particle): void;
    isEnabled(particle: Particle): boolean;
    update(particle: Particle, delta: IDelta): void;
}
