(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../Core/Utils/ExternalInteractorBase", "../../../Utils/Utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Pusher = void 0;
    const ExternalInteractorBase_1 = require("../../../Core/Utils/ExternalInteractorBase");
    const Utils_1 = require("../../../Utils/Utils");
    class Pusher extends ExternalInteractorBase_1.ExternalInteractorBase {
        constructor(container) {
            super(container);
            this.handleClickMode = (mode) => {
                if (mode !== "push") {
                    return;
                }
                const container = this.container;
                const options = container.actualOptions;
                const pushNb = options.interactivity.modes.push.quantity;
                if (pushNb <= 0) {
                    return;
                }
                const pushOptions = options.interactivity.modes.push;
                const group = (0, Utils_1.itemFromArray)([undefined, ...pushOptions.groups]);
                const groupOptions = group !== undefined ? container.actualOptions.particles.groups[group] : undefined;
                container.particles.push(pushNb, container.interactivity.mouse, groupOptions, group);
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
    exports.Pusher = Pusher;
});
