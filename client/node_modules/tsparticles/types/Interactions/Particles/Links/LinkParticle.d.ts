import type { ILink } from "./ILink";
import type { Particle } from "../../../Core/Particle";
export declare type LinkParticle = Particle & {
    links: ILink[];
};
