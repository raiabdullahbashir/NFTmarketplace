import type { IDimension } from "../../../../Core/Interfaces/IDimension";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
export interface IPolygonMaskLocalSvg {
    path: SingleOrMultiple<string>;
    size: IDimension;
}
