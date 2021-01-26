import {EditMode} from "./EditMode";
import {PathfindingAlgorithms} from "./PathfindingAlgorithms";
import {ISettings} from "./ISettings";

export interface IGridRefs {
    runPathfinding: (algorithm: PathfindingAlgorithms) => void;
    clearAll: () => void;
    clearPath: () => void;
    changeEditMode: (editMode: EditMode) => void;
    changeSettings: (settings: ISettings) => void;
    createMaze: () => void;
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
    setIsPageBusy: (isBusy: boolean) => void;
}

export interface IHeaderRefs {
    setIsPageBusy: (isBusy: boolean) => void;
}

export interface ISelectionBarRefs {
    setIsEditable: (isEditable: boolean) => void;
}