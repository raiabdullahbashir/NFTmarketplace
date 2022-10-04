import type { Container } from "../../../Core/Container";
import { ExternalInteractorBase } from "../../../Core/Utils/ExternalInteractorBase";
export declare class Connector extends ExternalInteractorBase {
    constructor(container: Container);
    isEnabled(): boolean;
    reset(): void;
    interact(): Promise<void>;
}
