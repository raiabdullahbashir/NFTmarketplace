import { ClickMode } from "../../../Enums/Modes/ClickMode";
import type { Container } from "../../../Core/Container";
import { ExternalInteractorBase } from "../../../Core/Utils/ExternalInteractorBase";
import type { IParticle } from "../../../Core/Interfaces/IParticle";
interface IContainerAttract {
    particles: IParticle[];
    finish?: boolean;
    count?: number;
    clicking?: boolean;
}
declare type ContainerAttractor = Container & {
    attract?: IContainerAttract;
};
export declare class Attractor extends ExternalInteractorBase {
    handleClickMode: (mode: ClickMode | string) => void;
    constructor(container: ContainerAttractor);
    isEnabled(): boolean;
    reset(): void;
    interact(): Promise<void>;
    private hoverAttract;
    private processAttract;
    private clickAttract;
}
export {};
