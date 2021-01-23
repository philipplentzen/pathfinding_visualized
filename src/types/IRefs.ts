import {EditMode} from "./EditMode";
import {PathfindingAlgorithms} from "./PathfindingAlgorithms";

export interface IGridRefs {
    runPathfinding: (algorithm: PathfindingAlgorithms) => void;
    clearGrid: () => void;
    changeEditMode: (editMode: EditMode) => void;
}

export interface ISettingsRefs {
    showSettings: () => void;
}

export interface ILegendRefs {
    toggleLegend: () => void;
}

export interface IAlgorithmPageRefs {
    runPathfinding: (algorithm: PathfindingAlgorithms) => void;
}

export interface ILayoutRefs {
    pathfindingFinished: () => void;
}

export interface IHeaderRefs {
    pathfindingFinished: () => void;
}