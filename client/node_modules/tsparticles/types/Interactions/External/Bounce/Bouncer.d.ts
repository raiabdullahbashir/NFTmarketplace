import type { Container } from "../../../Core/Container";
import { ExternalInteractorBase } from "../../../Core/Utils/ExternalInteractorBase";
export declare class Bouncer extends ExternalInteractorBase {
    constructor(container: Container);
    isEnabled(): boolean;
    interact(): Promise<void>;
    reset(): void;
    private processMouseBounce;
    private singleSelectorBounce;
    private processBounce;
}
