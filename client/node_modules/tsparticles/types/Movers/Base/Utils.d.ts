import type { IDelta } from "../../Core/Interfaces/IDelta";
import type { Particle } from "../../Core/Particle";
import type { SpinParticle } from "./Types";
export declare function applyDistance(particle: SpinParticle): void;
export declare function spin(particle: SpinParticle, moveSpeed: number): void;
export declare function applyPath(particle: Particle, delta: IDelta): void;
export declare function getProximitySpeedFactor(particle: Particle): number;
