import {PathfindingAlgorithms} from "./PathfindingAlgorithms";
import {MazeAlgorithms} from "./MazeAlgorithms";

export interface IGridRefs {
    runAlgorithm: (algorithm: PathfindingAlgorithms | MazeAlgorithms) => void;
    clearAll: () => void;
    clearPath: () => void;
}