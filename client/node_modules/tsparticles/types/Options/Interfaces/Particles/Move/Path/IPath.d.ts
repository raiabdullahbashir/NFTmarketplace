import type { IValueWithRandom } from "../../../IValueWithRandom";
import type { PathOptions } from "../../../../../Types/PathOptions";
export interface IPath {
    clamp: boolean;
    delay: IValueWithRandom;
    enable: boolean;
    options: PathOptions;
    generator?: string;
}
