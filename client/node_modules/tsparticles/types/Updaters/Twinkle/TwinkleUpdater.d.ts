import type { IParticleColorStyle } from "../../Core/Interfaces/IParticleColorStyle";
import type { IParticleUpdater } from "../../Core/Interfaces/IParticleUpdater";
import type { Particle } from "../../Core/Particle";
export declare class TwinkleUpdater implements IParticleUpdater {
    getColorStyles(particle: Particle, context: CanvasRenderingContext2D, radius: number, opacity: number): IParticleColorStyle;
    init(): void;
    isEnabled(particle: Particle): boolean;
    update(): void;
}
