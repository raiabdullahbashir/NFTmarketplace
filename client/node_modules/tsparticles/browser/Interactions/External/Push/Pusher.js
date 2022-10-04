import { ExternalInteractorBase } from "../../../Core/Utils/ExternalInteractorBase";
import { itemFromArray } from "../../../Utils/Utils";
/**
 * Particle attract manager
 * @category Interactions
 */
export class Pusher extends ExternalInteractorBase {
    constructor(container) {
        super(container);
        this.handleClickMode = (mode) => {
            if (mode !== "push" /* push */) {
                return;
            }
            const container = this.container;
            const options = container.actualOptions;
            const pushNb = options.interactivity.modes.push.quantity;
            if (pushNb <= 0) {
                return;
            }
            const pushOptions = options.interactivity.modes.push;
            const group = itemFromArray([undefined, ...pushOptions.groups]);
            const groupOptions = group !== undefined ? container.actualOptions.particles.groups[group] : undefined;
            container.particles.push(pushNb, container.interactivity.mouse, groupOptions, group);
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
