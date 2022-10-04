import type { Container } from "../../Core/Container";
import type { IDelta } from "../../Core/Interfaces/IDelta";
import type { IParticleUpdater } from "../../Core/Interfaces/IParticleUpdater";
import type { Particle } from "../../Core/Particle";
export declare class OutOfCanvasUpdater implements IParticleUpdater {
    private readonly container;
    constructor(container: Container);
    init(): void;
    isEnabled(particle: Particle): boolean;
    update(particle: Particle, delta: IDelta): void;
    private updateOutMode;
    private destroy;
    private out;
    private bounce;
    private none;
}
