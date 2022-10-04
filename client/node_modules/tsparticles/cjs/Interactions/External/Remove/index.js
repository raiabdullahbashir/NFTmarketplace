"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadExternalRemoveInteraction = void 0;
const Remover_1 = require("./Remover");
async function loadExternalRemoveInteraction(engine) {
    await engine.addInteractor("externalRemove", (container) => new Remover_1.Remover(container));
}
exports.loadExternalRemoveInteraction = loadExternalRemoveInteraction;
