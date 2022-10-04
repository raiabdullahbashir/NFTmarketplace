import { ClickMode } from "../../../Enums/Modes/ClickMode";
import type { Container } from "../../../Core/Container";
import { ExternalInteractorBase } from "../../../Core/Utils/ExternalInteractorBase";
export declare class Pusher extends ExternalInteractorBase {
    handleClickMode: (mode: ClickMode | string) => void;
    constructor(container: Container);
    isEnabled(): boolean;
    reset(): void;
    interact(): Promise<void>;
}
