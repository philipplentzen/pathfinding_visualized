import React, {useRef} from "react";
import {Grid} from "../components/Grid/Grid";
import {SelectionBar} from "../components/SelectionBar";
import {Legend} from "../components/Legend";
import {Settings} from "../components/Settings";
import {IGridRefs, ISettingsRefs} from "../types/IRefs";

interface IAlgorithmPageProps {

}

export const AlgorithmPage: React.FC<IAlgorithmPageProps> = () => {
    const gridRef = useRef<IGridRefs>(null);
    const settingsRef = useRef<ISettingsRefs>(null);

    const handleOnClear = () => {
        gridRef.current?.clearGrid();
    }

    const handleOpenSettings = () => {
        settingsRef.current?.openSettings();
    }

    return (
        <>
            <SelectionBar onClear={handleOnClear} onOpenSettings={handleOpenSettings} />
            <Grid ref={gridRef} />
            <Legend />
            <Settings ref={settingsRef} />
        </>
    )
}