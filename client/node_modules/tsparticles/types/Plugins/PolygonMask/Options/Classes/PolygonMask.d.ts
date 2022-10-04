import { PolygonMaskInlineArrangement, PolygonMaskInlineArrangementAlt } from "../../Enums/PolygonMaskInlineArrangement";
import type { ICoordinates } from "../../../../Core/Interfaces/ICoordinates";
import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";
import type { IPolygonMask } from "../Interfaces/IPolygonMask";
import { PolygonMaskDraw } from "./PolygonMaskDraw";
import { PolygonMaskInline } from "./PolygonMaskInline";
import { PolygonMaskLocalSvg } from "./PolygonMaskLocalSvg";
import { PolygonMaskMove } from "./PolygonMaskMove";
import { PolygonMaskType } from "../../Enums/PolygonMaskType";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class PolygonMask implements IPolygonMask, IOptionLoader<IPolygonMask> {
    get inlineArrangement(): PolygonMaskInlineArrangement | keyof typeof PolygonMaskInlineArrangement | PolygonMaskInlineArrangementAlt;
    set inlineArrangement(value: PolygonMaskInlineArrangement | keyof typeof PolygonMaskInlineArrangement | PolygonMaskInlineArrangementAlt);
    draw: PolygonMaskDraw;
    enable: boolean;
    inline: PolygonMaskInline;
    move: PolygonMaskMove;
    position?: ICoordinates;
    scale: number;
    type: PolygonMaskType;
    url?: string;
    data?: string | PolygonMaskLocalSvg;
    constructor();
    load(data?: RecursivePartial<IPolygonMask>): void;
}
