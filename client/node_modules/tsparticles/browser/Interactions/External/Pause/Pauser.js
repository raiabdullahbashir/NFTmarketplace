import { ExternalInteractorBase } from "../../../Core/Utils/ExternalInteractorBase";
/**
 * Particle attract manager
 * @category Interactions
 */
export class Pauser extends ExternalInteractorBase {
    constructor(container) {
        super(container);
        this.handleClickMode = (mode) => {
            if (mode !== "pause" /* pause */) {
                return;
            }
            const container = this.container;
            if (container.getAnimationStatus()) {
                container.pause();
            }
            else {
                container.play();
            }
        };
    }
    isEnabled() {
        return true;
    }
    reset() {
        // do nothing
    }
    async interact() {
        // do nothing
    }
}
