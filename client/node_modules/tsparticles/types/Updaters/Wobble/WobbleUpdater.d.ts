import type { Container } from "../../Core/Container";
import type { IDelta } from "../../Core/Interfaces/IDelta";
import type { IParticleUpdater } from "../../Core/Interfaces/IParticleUpdater";
import type { Particle } from "../../Core/Particle";
declare type WobbleParticle = Particle & {
    retina: {
        wobbleDistance?: number;
    };
};
export declare class WobbleUpdater implements IParticleUpdater {
    private readonly container;
    constructor(container: Container);
    init(particle: WobbleParticle): void;
    isEnabled(particle: WobbleParticle): boolean;
    update(particle: WobbleParticle, delta: IDelta): void;
}
export {};
