import type { Container } from "../../../Core/Container";
import type { Particle } from "../../../Core/Particle";
import { ParticlesInteractorBase } from "../../../Core/Utils/ParticlesInteractorBase";
export declare class Collider extends ParticlesInteractorBase {
    constructor(container: Container);
    isEnabled(particle: Particle): boolean;
    reset(): void;
    interact(p1: Particle): Promise<void>;
    private resolveCollision;
    private absorb;
}
