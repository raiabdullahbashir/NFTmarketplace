import { ExternalInteractorBase } from "../../../Core/Utils/ExternalInteractorBase";
export class Remover extends ExternalInteractorBase {
    constructor(container) {
        super(container);
        this.handleClickMode = (mode) => {
            if (mode !== "remove") {
                return;
            }
            const container = this.container;
            const options = container.actualOptions;
            const removeNb = options.interactivity.modes.remove.quantity;
            container.particles.removeQuantity(removeNb);
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
