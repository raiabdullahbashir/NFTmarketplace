import { ExternalInteractorBase } from "../../../Core/Utils/ExternalInteractorBase";
export class Pauser extends ExternalInteractorBase {
    constructor(container) {
        super(container);
        this.handleClickMode = (mode) => {
            if (mode !== "pause") {
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
    }
    async interact() {
    }
}
