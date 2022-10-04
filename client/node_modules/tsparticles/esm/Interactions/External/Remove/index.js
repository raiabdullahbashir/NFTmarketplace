import { Remover } from "./Remover";
export async function loadExternalRemoveInteraction(engine) {
    await engine.addInteractor("externalRemove", (container) => new Remover(container));
}
