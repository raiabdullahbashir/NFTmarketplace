import type { Container } from "../../../Core/Container";
import type { LinkParticle } from "./LinkParticle";
import type { Particle } from "../../../Core/Particle";
import { ParticlesInteractorBase } from "../../../Core/Utils/ParticlesInteractorBase";
export declare class Linker extends ParticlesInteractorBase {
    constructor(container: Container);
    isEnabled(particle: Particle): boolean;
    reset(): void;
    interact(p1: LinkParticle): Promise<void>;
    private setColor;
}
