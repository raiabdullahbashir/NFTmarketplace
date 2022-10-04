"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pauser = void 0;
const ExternalInteractorBase_1 = require("../../../Core/Utils/ExternalInteractorBase");
class Pauser extends ExternalInteractorBase_1.ExternalInteractorBase {
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
exports.Pauser = Pauser;
