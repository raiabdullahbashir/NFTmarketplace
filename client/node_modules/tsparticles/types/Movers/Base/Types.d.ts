import type { IParticleSpin } from "./IParticleSpin";
import type { Particle } from "../../Core/Particle";
export declare type SpinParticle = Particle & {
    spin?: IParticleSpin;
    retina: {
        spinAcceleration?: number;
    };
};
