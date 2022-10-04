import type { IParticleMover } from "../../Core/Interfaces/IParticlesMover";
import { Particle } from "../../Core/Particle";
export declare class ParallaxMover implements IParticleMover {
    init(): void;
    isEnabled(particle: Particle): boolean;
    move(particle: Particle): void;
}
