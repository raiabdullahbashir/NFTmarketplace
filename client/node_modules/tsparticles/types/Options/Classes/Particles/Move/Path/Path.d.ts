import type { IOptionLoader } from "../../../../Interfaces/IOptionLoader";
import type { IPath } from "../../../../Interfaces/Particles/Move/Path/IPath";
import { PathDelay } from "./PathDelay";
import { PathOptions } from "../../../../../Types/PathOptions";
import { RecursivePartial } from "../../../../../Types/RecursivePartial";
export declare class Path implements IPath, IOptionLoader<IPath> {
    clamp: boolean;
    delay: PathDelay;
    enable: boolean;
    options: PathOptions;
    generator?: string;
    constructor();
    load(data?: RecursivePartial<IPath>): void;
}
