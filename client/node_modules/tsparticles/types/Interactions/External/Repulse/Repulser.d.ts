import type { Container } from "../../../Core/Container";
import { ExternalInteractorBase } from "../../../Core/Utils/ExternalInteractorBase";
import type { IParticle } from "../../../Core/Interfaces/IParticle";
interface IContainerRepulse {
    particles: IParticle[];
    finish?: boolean;
    count?: number;
    clicking?: boolean;
}
declare type ContainerRepulser = Container & {
    repulse?: IContainerRepulse;
};
export declare class Repulser extends ExternalInteractorBase {
    handleClickMode: (mode: string) => void;
    constructor(container: ContainerRepulser);
    isEnabled(): boolean;
    reset(): void;
    interact(): Promise<void>;
    private singleSelectorRepulse;
    private hoverRepulse;
    private processRepulse;
    private clickRepulse;
}
export {};
