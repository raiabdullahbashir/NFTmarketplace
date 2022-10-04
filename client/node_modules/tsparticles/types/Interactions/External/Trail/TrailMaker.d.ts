import type { Container } from "../../../Core/Container";
import { ExternalInteractorBase } from "../../../Core/Utils/ExternalInteractorBase";
import type { IDelta } from "../../../Core/Interfaces/IDelta";
export declare class TrailMaker extends ExternalInteractorBase {
    private delay;
    private lastPosition?;
    constructor(container: Container);
    interact(delta: IDelta): Promise<void>;
    isEnabled(): boolean;
    reset(): void;
}
