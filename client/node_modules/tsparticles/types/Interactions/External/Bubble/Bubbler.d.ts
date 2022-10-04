import { ClickMode } from "../../../Enums/Modes/ClickMode";
import { Container } from "../../../Core/Container";
import { ExternalInteractorBase } from "../../../Core/Utils/ExternalInteractorBase";
import { Particle } from "../../../Core/Particle";
interface IContainerBubble {
    clicking?: boolean;
    durationEnd?: boolean;
}
declare type ContainerBubbler = Container & {
    bubble?: IContainerBubble;
};
export declare class Bubbler extends ExternalInteractorBase {
    handleClickMode: (mode: ClickMode | string) => void;
    constructor(container: ContainerBubbler);
    isEnabled(): boolean;
    reset(particle: Particle, force?: boolean): void;
    interact(): Promise<void>;
    private singleSelectorHover;
    private process;
    private clickBubble;
    private hoverBubble;
    private hoverBubbleSize;
    private hoverBubbleOpacity;
    private hoverBubbleColor;
}
export {};
