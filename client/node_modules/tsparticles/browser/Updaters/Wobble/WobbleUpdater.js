import { getRangeValue } from "../../Utils/NumberUtils";
/**
 * Updates particle wobbling values
 * @param particle the particle to update
 * @param delta this variable contains the delta between the current frame and the previous frame
 */
function updateWobble(particle, delta) {
    var _a;
    const wobble = particle.options.wobble;
    if (!wobble.enable || !particle.wobble) {
        return;
    }
    const speed = particle.wobble.speed * delta.factor;
    const distance = (((_a = particle.retina.wobbleDistance) !== null && _a !== void 0 ? _a : 0) * delta.factor) / (1000 / 60);
    const max = 2 * Math.PI;
    particle.wobble.angle += speed;
    if (particle.wobble.angle > max) {
        particle.wobble.angle -= max;
    }
    particle.position.x += distance * Math.cos(particle.wobble.angle);
    particle.position.y += distance * Math.abs(Math.sin(particle.wobble.angle));
}
/**
 * The Wobble updater plugin
 */
export class WobbleUpdater {
    /**
     * The Wobble updater plugin constructor, assigns the container using the plugin
     * @param container the container using the plugin
     */
    constructor(container) {
        this.container = container;
    }
    /**
     * Initializing the particle for wobble animation
     * @param particle the particle to init
     */
    init(particle) {
        const wobbleOpt = particle.options.wobble;
        if (wobbleOpt.enable) {
            particle.wobble = {
                angle: Math.random() * Math.PI * 2,
                speed: getRangeValue(wobbleOpt.speed) / 360,
            };
        }
        else {
            particle.wobble = {
                angle: 0,
                speed: 0,
            };
        }
        particle.retina.wobbleDistance = getRangeValue(wobbleOpt.distance) * this.container.retina.pixelRatio;
    }
    /**
     * Checks if the given particle needs the wobble animation
     * @param particle
     */
    isEnabled(particle) {
        return !particle.destroyed && !particle.spawning && particle.options.wobble.enable;
    }
    /**
     * Updates the particle wobble animation
     * @param particle the particle to update
     * @param delta this variable contains the delta between the current frame and the previous frame
     */
    update(particle, delta) {
        if (!this.isEnabled(particle)) {
            return;
        }
        updateWobble(particle, delta);
    }
}
