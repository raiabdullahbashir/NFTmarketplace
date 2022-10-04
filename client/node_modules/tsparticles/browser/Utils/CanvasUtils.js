import { colorMix, colorToRgb, getStyleFromHsl, getStyleFromRgb } from "./ColorUtils";
import { getDistance, getDistances } from "./NumberUtils";
/**
 * Draws a line between two points using canvas API in the given context.
 * @hidden
 * @param context - The canvas context to draw on.
 * @param begin - The begin point of the line.
 * @param end - The end point of the line.
 */
function drawLine(context, begin, end) {
    context.beginPath();
    context.moveTo(begin.x, begin.y);
    context.lineTo(end.x, end.y);
    context.closePath();
}
/**
 * Draws a triangle with three points using canvas API in the given context.
 * @param context - The canvas context to draw on.
 * @param p1 - The first point of the triangle.
 * @param p2 - The second point of the triangle.
 * @param p3 - The third point of the triangle.
 */
function drawTriangle(context, p1, p2, p3) {
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.lineTo(p3.x, p3.y);
    context.closePath();
}
/**
 * Fills a rectangle with the given color for the whole canvas.
 * @param context - The canvas context to draw on.
 * @param dimension - The dimension of the rectangle.
 * @param baseColor - The base color of the rectangle, if not specified a transparent color will be used.
 */
export function paintBase(context, dimension, baseColor) {
    context.save();
    context.fillStyle = baseColor !== null && baseColor !== void 0 ? baseColor : "rgba(0,0,0,0)";
    context.fillRect(0, 0, dimension.width, dimension.height);
    context.restore();
}
/**
 * Clears the canvas.
 * @param context - The canvas context to clear.
 * @param dimension - The dimension of the canvas.
 */
export function clear(context, dimension) {
    context.clearRect(0, 0, dimension.width, dimension.height);
}
/**
 * Draws a line between two particles using canvas API in the given context.
 * @param context - The canvas context to draw on.
 * @param width - The width of the line.
 * @param begin - The begin point of the line.
 * @param end - The end point of the line.
 * @param maxDistance - The maximum distance of the line.
 * @param canvasSize - The dimension of the canvas.
 * @param warp - If enabled, the line will be warped.
 * @param backgroundMask - If enabled, the composite value will be used for blending the line in the canvas.
 * @param composite - The composite value to use for blending the line in the canvas.
 * @param colorLine - The color of the line.
 * @param opacity - The opacity of the line.
 * @param shadow - The shadow of the line.
 */
export function drawLinkLine(context, width, begin, end, maxDistance, canvasSize, warp, backgroundMask, composite, colorLine, opacity, shadow) {
    // this.ctx.lineCap = "round"; /* performance issue */
    /* path */
    let drawn = false;
    if (getDistance(begin, end) <= maxDistance) {
        drawLine(context, begin, end);
        drawn = true;
    }
    else if (warp) {
        let pi1, pi2;
        const endNE = {
            x: end.x - canvasSize.width,
            y: end.y,
        }, d1 = getDistances(begin, endNE);
        if (d1.distance <= maxDistance) {
            const yi = begin.y - (d1.dy / d1.dx) * begin.x;
            pi1 = { x: 0, y: yi };
            pi2 = { x: canvasSize.width, y: yi };
        }
        else {
            const endSW = {
                x: end.x,
                y: end.y - canvasSize.height,
            }, d2 = getDistances(begin, endSW);
            if (d2.distance <= maxDistance) {
                const yi = begin.y - (d2.dy / d2.dx) * begin.x, xi = -yi / (d2.dy / d2.dx);
                pi1 = { x: xi, y: 0 };
                pi2 = { x: xi, y: canvasSize.height };
            }
            else {
                const endSE = {
                    x: end.x - canvasSize.width,
                    y: end.y - canvasSize.height,
                }, d3 = getDistances(begin, endSE);
                if (d3.distance <= maxDistance) {
                    const yi = begin.y - (d3.dy / d3.dx) * begin.x, xi = -yi / (d3.dy / d3.dx);
                    pi1 = { x: xi, y: yi };
                    pi2 = { x: pi1.x + canvasSize.width, y: pi1.y + canvasSize.height };
                }
            }
        }
        if (pi1 && pi2) {
            drawLine(context, begin, pi1);
            drawLine(context, end, pi2);
            drawn = true;
        }
    }
    if (!drawn) {
        return;
    }
    context.lineWidth = width;
    if (backgroundMask) {
        context.globalCompositeOperation = composite;
    }
    context.strokeStyle = getStyleFromRgb(colorLine, opacity);
    if (shadow.enable) {
        const shadowColor = colorToRgb(shadow.color);
        if (shadowColor) {
            context.shadowBlur = shadow.blur;
            context.shadowColor = getStyleFromRgb(shadowColor);
        }
    }
    context.stroke();
}
/**
 * Draws a triangle between three particles using canvas API in the given context.
 * @param context - The canvas context to draw on.
 * @param pos1 - The first position of the triangle.
 * @param pos2 - The second position of the triangle.
 * @param pos3 - The third position of the triangle.
 * @param backgroundMask - If enabled, the composite value will be used for blending the triangle in the canvas.
 * @param composite - The composite value to use for blending the triangle in the canvas.
 * @param colorTriangle - The color of the triangle.
 * @param opacityTriangle - The opacity of the triangle.
 */
export function drawLinkTriangle(context, pos1, pos2, pos3, backgroundMask, composite, colorTriangle, opacityTriangle) {
    // this.ctx.lineCap = "round"; /* performance issue */
    /* path */
    drawTriangle(context, pos1, pos2, pos3);
    if (backgroundMask) {
        context.globalCompositeOperation = composite;
    }
    context.fillStyle = getStyleFromRgb(colorTriangle, opacityTriangle);
    context.fill();
}
/**
 * Draws a line connecting two points using canvas API in the given context.
 * @param context - The canvas context to draw on.
 * @param width - The width of the line.
 * @param lineStyle - The style of the line.
 * @param begin - The first position of the line.
 * @param end - The second position of the line.
 */
export function drawConnectLine(context, width, lineStyle, begin, end) {
    context.save();
    drawLine(context, begin, end);
    context.lineWidth = width;
    context.strokeStyle = lineStyle;
    context.stroke();
    context.restore();
}
/**
 * Creates a gradient using two particles colors and opacity.
 * @param context - The canvas context to draw on.
 * @param p1 - The first particle.
 * @param p2 - The second particle.
 * @param opacity - The opacity of the gradient.
 */
export function gradient(context, p1, p2, opacity) {
    const gradStop = Math.floor(p2.getRadius() / p1.getRadius()), color1 = p1.getFillColor(), color2 = p2.getFillColor();
    if (!color1 || !color2) {
        return;
    }
    const sourcePos = p1.getPosition(), destPos = p2.getPosition(), midRgb = colorMix(color1, color2, p1.getRadius(), p2.getRadius()), grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);
    grad.addColorStop(0, getStyleFromHsl(color1, opacity));
    grad.addColorStop(gradStop > 1 ? 1 : gradStop, getStyleFromRgb(midRgb, opacity));
    grad.addColorStop(1, getStyleFromHsl(color2, opacity));
    return grad;
}
/**
 * Draws a grab line between two points using canvas API in the given context.
 * @param context - The canvas context to draw on.
 * @param width - The width of the line.
 * @param begin - The first position of the line.
 * @param end - The second position of the line.
 * @param colorLine - The color of the line.
 * @param opacity - The opacity of the line.
 */
export function drawGrabLine(context, width, begin, end, colorLine, opacity) {
    context.save();
    drawLine(context, begin, end);
    context.strokeStyle = getStyleFromRgb(colorLine, opacity);
    context.lineWidth = width;
    context.stroke();
    context.restore();
}
/**
 * Draws the particle using canvas API in the given context.
 * @param container - The container of the particle.
 * @param context - The canvas context to draw on.
 * @param particle - The particle to draw.
 * @param delta this variable contains the delta between the current frame and the previous frame
 * @param colorStyles - The color styles value.
 * @param backgroundMask - If enabled, the composite value will be used for blending the particle in the canvas.
 * @param composite - The composite value to use for blending the particle in the canvas.
 * @param radius - The radius of the particle.
 * @param opacity - The opacity of the particle.
 * @param shadow - The shadow of the particle.
 */
export function drawParticle(container, context, particle, delta, colorStyles, backgroundMask, composite, radius, opacity, shadow) {
    var _a, _b, _c, _d;
    const pos = particle.getPosition(), tiltOptions = particle.options.tilt, rollOptions = particle.options.roll;
    context.save();
    if (tiltOptions.enable || rollOptions.enable) {
        const roll = rollOptions.enable && particle.roll, tilt = tiltOptions.enable && particle.tilt, rollHorizontal = roll && (rollOptions.mode === "horizontal" /* horizontal */ || rollOptions.mode === "both" /* both */), rollVertical = roll && (rollOptions.mode === "vertical" /* vertical */ || rollOptions.mode === "both" /* both */);
        context.setTransform(rollHorizontal ? Math.cos(particle.roll.angle) : 1, tilt ? Math.cos(particle.tilt.value) * particle.tilt.cosDirection : 0, tilt ? Math.sin(particle.tilt.value) * particle.tilt.sinDirection : 0, rollVertical ? Math.sin(particle.roll.angle) : 1, pos.x, pos.y);
    }
    else {
        context.translate(pos.x, pos.y);
    }
    context.beginPath();
    const angle = ((_b = (_a = particle.rotate) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 0) + (particle.options.rotate.path ? particle.velocity.angle : 0);
    if (angle !== 0) {
        context.rotate(angle);
    }
    if (backgroundMask) {
        context.globalCompositeOperation = composite;
    }
    const shadowColor = particle.shadowColor;
    if (shadow.enable && shadowColor) {
        context.shadowBlur = shadow.blur;
        context.shadowColor = getStyleFromRgb(shadowColor);
        context.shadowOffsetX = shadow.offset.x;
        context.shadowOffsetY = shadow.offset.y;
    }
    if (colorStyles.fill) {
        context.fillStyle = colorStyles.fill;
    }
    const stroke = particle.stroke;
    context.lineWidth = (_c = particle.strokeWidth) !== null && _c !== void 0 ? _c : 0;
    if (colorStyles.stroke) {
        context.strokeStyle = colorStyles.stroke;
    }
    drawShape(container, context, particle, radius, opacity, delta);
    if (((_d = stroke === null || stroke === void 0 ? void 0 : stroke.width) !== null && _d !== void 0 ? _d : 0) > 0) {
        context.stroke();
    }
    if (particle.close) {
        context.closePath();
    }
    if (particle.fill) {
        context.fill();
    }
    context.restore();
    context.save();
    if (tiltOptions.enable && particle.tilt) {
        context.setTransform(1, Math.cos(particle.tilt.value) * particle.tilt.cosDirection, Math.sin(particle.tilt.value) * particle.tilt.sinDirection, 1, pos.x, pos.y);
    }
    else {
        context.translate(pos.x, pos.y);
    }
    if (angle !== 0) {
        context.rotate(angle);
    }
    if (backgroundMask) {
        context.globalCompositeOperation = composite;
    }
    drawShapeAfterEffect(container, context, particle, radius, opacity, delta);
    context.restore();
}
/**
 * Draws the particle shape using the plugin's shape renderer.
 * @param container The container of the particle.
 * @param context The canvas context.
 * @param particle The particle to draw.
 * @param radius The radius of the particle.
 * @param opacity The opacity of the particle.
 * @param delta this variable contains the delta between the current frame and the previous frame
 */
export function drawShape(container, context, particle, radius, opacity, delta) {
    if (!particle.shape) {
        return;
    }
    const drawer = container.drawers.get(particle.shape);
    if (!drawer) {
        return;
    }
    drawer.draw(context, particle, radius, opacity, delta, container.retina.pixelRatio);
}
/**
 * Draws the particle effect after the plugin's shape renderer.
 * @param container The container of the particle.
 * @param context The canvas context.
 * @param particle The particle to draw.
 * @param radius The radius of the particle.
 * @param opacity The opacity of the particle.
 * @param delta this variable contains the delta between the current frame and the previous frame
 */
export function drawShapeAfterEffect(container, context, particle, radius, opacity, delta) {
    if (!particle.shape) {
        return;
    }
    const drawer = container.drawers.get(particle.shape);
    if (!(drawer === null || drawer === void 0 ? void 0 : drawer.afterEffect)) {
        return;
    }
    drawer.afterEffect(context, particle, radius, opacity, delta, container.retina.pixelRatio);
}
/**
 * Draws the given plugin in the canvas.
 * @param context The canvas context.
 * @param plugin The plugin to draw.
 * @param delta this variable contains the delta between the current frame and the previous frame
 */
export function drawPlugin(context, plugin, delta) {
    if (!plugin.draw) {
        return;
    }
    context.save();
    plugin.draw(context, delta);
    context.restore();
}
/**
 * Draws the given particle plugin in the canvas.
 * @param context The canvas context.
 * @param plugin The particle plugin to draw.
 * @param particle The particle to draw.
 * @param delta this variable contains the delta between the current frame and the previous frame
 */
export function drawParticlePlugin(context, plugin, particle, delta) {
    if (!plugin.drawParticle) {
        return;
    }
    context.save();
    plugin.drawParticle(context, particle, delta);
    context.restore();
}
/**
 * Draws an ellipse for the given particle.
 * @param context The canvas context.
 * @param particle The particle to draw.
 * @param fillColorValue The particle fill color.
 * @param radius The radius of the particle.
 * @param opacity The opacity of the particle.
 * @param width The width of the particle.
 * @param rotation The rotation of the particle.
 * @param start The start angle of the particle.
 * @param end The end angle of the particle.
 */
export function drawEllipse(context, particle, fillColorValue, radius, opacity, width, rotation, start, end) {
    if (width <= 0) {
        return;
    }
    const pos = particle.getPosition();
    if (fillColorValue) {
        context.strokeStyle = getStyleFromHsl(fillColorValue, opacity);
    }
    context.lineWidth = width;
    const rotationRadian = (rotation * Math.PI) / 180;
    context.beginPath();
    context.ellipse(pos.x, pos.y, radius / 2, radius * 2, rotationRadian, start, end);
    context.stroke();
}
/**
 * Alters HSL values for enlighten or darken the given color.
 * @param color The color to enlighten or darken.
 * @param type The type of alteration.
 * @param value The value of the alteration.
 */
export function alterHsl(color, type, value) {
    return {
        h: color.h,
        s: color.s,
        l: color.l + (type === "darken" /* darken */ ? -1 : 1) * value,
    };
}
