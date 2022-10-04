(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../Utils/ColorUtils", "../../Utils/NumberUtils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TwinkleUpdater = void 0;
    const ColorUtils_1 = require("../../Utils/ColorUtils");
    const NumberUtils_1 = require("../../Utils/NumberUtils");
    class TwinkleUpdater {
        getColorStyles(particle, context, radius, opacity) {
            const pOptions = particle.options, twinkle = pOptions.twinkle.particles, twinkling = twinkle.enable && Math.random() < twinkle.frequency, zIndexOptions = particle.options.zIndex, zOpacityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.opacityRate, twinklingOpacity = twinkling ? (0, NumberUtils_1.getRangeValue)(twinkle.opacity) * zOpacityFactor : opacity, twinkleRgb = (0, ColorUtils_1.colorToHsl)(twinkle.color), twinkleStyle = twinkleRgb ? (0, ColorUtils_1.getStyleFromHsl)(twinkleRgb, twinklingOpacity) : undefined, res = {}, needsTwinkle = twinkling && twinkleStyle;
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
    exports.TwinkleUpdater = TwinkleUpdater;
});
