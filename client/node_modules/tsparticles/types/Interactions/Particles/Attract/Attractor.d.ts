import type { Container } from "../../../Core/Container";
import type { IParticle } from "../../../Core/Interfaces/IParticle";
import type { Particle } from "../../../Core/Particle";
import { ParticlesInteractorBase } from "../../../Core/Utils/ParticlesInteractorBase";
export declare class Attractor extends ParticlesInteractorBase {
    constructor(container: Container);
    interact(p1: IParticle): Promise<void>;
    isEnabled(particle: Particle): boolean;
    reset(): void;
}
