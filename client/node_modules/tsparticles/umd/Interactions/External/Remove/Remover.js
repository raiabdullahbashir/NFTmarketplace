(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../Core/Utils/ExternalInteractorBase"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Remover = void 0;
    const ExternalInteractorBase_1 = require("../../../Core/Utils/ExternalInteractorBase");
    class Remover extends ExternalInteractorBase_1.ExternalInteractorBase {
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
    exports.Remover = Remover;
});
