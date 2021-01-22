import React, {useCallback, useRef} from "react";
import {Grid} from "../components/Grid/Grid";
import {SelectionBar} from "../components/SelectionBar";
import {Legend} from "../components/Legend";
import {Settings} from "../components/Settings";
import {IGridRefs, ILegendRefs, ISettingsRefs} from "../types/IRefs";
import {EditMode} from "../types/EditMode";

interface IAlgorithmPageProps {

}

export const AlgorithmPage: React.FC<IAlgorithmPageProps> = () => {
    const gridRef = useRef<IGridRefs>(null);
    const settingsRef = useRef<ISettingsRefs>(null);
    const legendRef = useRef<ILegendRefs>(null)

    const handleClear = useCallback(() => {
        gridRef.current?.clearGrid();
    }, []);

    const handleChangeEditMode = useCallback((editMode: EditMode) => {
        gridRef.current?.changeEditMode(editMode);
    }, []);

    const handleOpenSettings = useCallback(() => {
        settingsRef.current?.showSettings();
    }, []);

    const handleToggleLegend = useCallback(() => {
        legendRef.current?.toggleLegend();
    }, []);

    return (
        <>
            <SelectionBar onClear={handleClear}
                          onShowSettings={handleOpenSettings}
                          onChangeEditMode={handleChangeEditMode} />
            <Grid ref={gridRef} />
            <Legend ref={legendRef} />
            <Settings ref={settingsRef} onShowLegend={handleToggleLegend} />
        </>
    )
}