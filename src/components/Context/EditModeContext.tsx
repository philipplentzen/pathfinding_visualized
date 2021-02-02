import React from "react";
import {EditMode} from "../../types/EditMode";

interface IEditModeContext {
    editMode: EditMode;
    setEditMode: React.Dispatch<React.SetStateAction<EditMode>>;
}

export const EditModeContext = React.createContext<IEditModeContext>({
    editMode: EditMode.DRAG,
    setEditMode: () => {},
});