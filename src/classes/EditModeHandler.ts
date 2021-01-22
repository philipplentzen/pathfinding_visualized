import {EditMode} from "../types/EditMode";

export class EditModeHandler {
    public static editMode: EditMode = EditMode.DRAG;
    public static clearGrid: () => void = () => null;
}