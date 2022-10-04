import type { Container } from "../../../Core/Container";
import type { IContainerPlugin } from "../../../Core/Interfaces/IContainerPlugin";
import type { Particle } from "../../../Core/Particle";
export declare class LinkInstance implements IContainerPlugin {
    private readonly container;
    constructor(container: Container);
    particleCreated(particle: Particle): void;
    particleDestroyed(particle: Particle): void;
    drawParticle(context: CanvasRenderingContext2D, particle: Particle): void;
    private drawLinkTriangle;
    private drawLinkLine;
}
