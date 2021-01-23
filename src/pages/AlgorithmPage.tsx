import React, {forwardRef, useCallback, useImperativeHandle, useRef} from "react";
import {Grid} from "../components/Grid/Grid";
import {SelectionBar} from "../components/SelectionBar";
import {Legend} from "../components/Legend";
import {Settings} from "../components/Settings";
import {IAlgorithmPageRefs, IGridRefs, ILegendRefs, ISettingsRefs} from "../types/IRefs";
import {EditMode} from "../types/EditMode";
import {PathfindingAlgorithms} from "../types/PathfindingAlgorithms";

interface IAlgorithmPageProps {
    onPathfindingFinished: () => void;
}

export const AlgorithmPage: React.ForwardRefExoticComponent<IAlgorithmPageProps & React.RefAttributes<IAlgorithmPageRefs>> = forwardRef(({onPathfindingFinished}, refs) => {
    const gridRef = useRef<IGridRefs>(null);
    const settingsRef = useRef<ISettingsRefs>(null);
    const legendRef = useRef<ILegendRefs>(null);

    useImperativeHandle(refs, () => {
        return {
            runPathfinding
        }
    })

    const runPathfinding = useCallback((algorithm: PathfindingAlgorithms) => {
        gridRef.current?.runPathfinding(algorithm);
    }, []);

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
            <SelectionBar onClickClear={handleClear}
                          onShowSettings={handleOpenSettings}
                          onChangeEditMode={handleChangeEditMode} />
            <Grid ref={gridRef} onPathfindingFinished={onPathfindingFinished} />
            <Legend ref={legendRef} />
            <Settings ref={settingsRef} onShowLegend={handleToggleLegend} />
        </>
    )
})