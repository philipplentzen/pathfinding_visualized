import {PathfindingAlgorithms} from "./PathfindingAlgorithms";

export interface IGridRefs {
    runPathfinding: (algorithm: PathfindingAlgorithms) => void;
    clearAll: () => void;
    clearPath: () => void;
    createMaze: () => void;
}

export interface ISelectionBarRefs {
    setIsEditable: (isEditable: boolean) => void;
}