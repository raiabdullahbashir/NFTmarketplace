import { PolygonMaskInlineArrangement, PolygonMaskInlineArrangementAlt } from "../../Enums/PolygonMaskInlineArrangement";
import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";
import type { IPolygonMaskInline } from "../Interfaces/IPolygonMaskInline";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class PolygonMaskInline implements IPolygonMaskInline, IOptionLoader<IPolygonMaskInline> {
    arrangement: PolygonMaskInlineArrangement | keyof typeof PolygonMaskInlineArrangement | PolygonMaskInlineArrangementAlt;
    constructor();
    load(data?: RecursivePartial<IPolygonMaskInline>): void;
}
