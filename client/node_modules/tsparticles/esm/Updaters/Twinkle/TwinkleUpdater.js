import { colorToHsl, getStyleFromHsl } from "../../Utils/ColorUtils";
import { getRangeValue } from "../../Utils/NumberUtils";
export class TwinkleUpdater {
    getColorStyles(particle, context, radius, opacity) {
        const pOptions = particle.options, twinkle = pOptions.twinkle.particles, twinkling = twinkle.enable && Math.random() < twinkle.frequency, zIndexOptions = particle.options.zIndex, zOpacityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.opacityRate, twinklingOpacity = twinkling ? getRangeValue(twinkle.opacity) * zOpacityFactor : opacity, twinkleRgb = colorToHsl(twinkle.color), twinkleStyle = twinkleRgb ? getStyleFromHsl(twinkleRgb, twinklingOpacity) : undefined, res = {}, needsTwinkle = twinkling && twinkleStyle;
        res.fill = needsTwinkle ? twinkleStyle : undefined;
        res.stroke = needsTwinkle ? twinkleStyle : undefined;
        return res;
    }
    init() {
    }
    isEnabled(particle) {
        return particle.options.twinkle.particles.enable;
    }
    update() {
    }
}
