import type { Container } from "../../../Core/Container";
import { ExternalInteractorBase } from "../../../Core/Utils/ExternalInteractorBase";
export declare class Remover extends ExternalInteractorBase {
    handleClickMode: (mode: string) => void;
    constructor(container: Container);
    isEnabled(): boolean;
    reset(): void;
    interact(): Promise<void>;
}
