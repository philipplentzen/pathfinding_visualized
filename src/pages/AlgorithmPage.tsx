import React, {useRef} from "react";
import {Grid} from "../components/Grid/Grid";
import {SelectionBar} from "../components/SelectionBar";
import {Legend} from "../components/Legend";
import {Settings} from "../components/Settings";
import {IGridRefs, ILegendRefs, ISettingsRefs} from "../types/IRefs";

interface IAlgorithmPageProps {

}

export const AlgorithmPage: React.FC<IAlgorithmPageProps> = () => {
    const gridRef = useRef<IGridRefs>(null);
    const settingsRef = useRef<ISettingsRefs>(null);
    const legendRef = useRef<ILegendRefs>(null)

    const handleOnClear = () => {
        gridRef.current?.clearGrid();
    }

    const handleOpenSettings = () => {
        settingsRef.current?.showSettings();
    }

    const handleToggleLegend = () => {
        legendRef.current?.toggleLegend();
    }

    return (
        <>
            <SelectionBar onClear={handleOnClear} onShowSettings={handleOpenSettings} />
            <Grid ref={gridRef} />
            <Legend ref={legendRef} />
            <Settings ref={settingsRef} onShowLegend={handleToggleLegend} />
        </>
    )
}