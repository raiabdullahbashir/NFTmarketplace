import type { Container } from "../../Core/Container";
import type { IParticle } from "../../Core/Interfaces/IParticle";
import type { IShapeDrawer } from "../../Core/Interfaces/IShapeDrawer";
export declare const validTypes: string[];
export declare class TextDrawer implements IShapeDrawer {
    getSidesCount(): number;
    init(container: Container): Promise<void>;
    draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number, opacity: number): void;
}
