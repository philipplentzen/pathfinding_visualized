import {EditMode} from "./EditMode";

export interface IGridRefs {
    clearGrid: () => void;
    changeEditMode: (editMode: EditMode) => void;
}

export interface ISettingsRefs {
    showSettings: () => void;
}

export interface ILegendRefs {
    toggleLegend: () => void;
}