import React, {forwardRef, useCallback, useImperativeHandle, useRef} from "react";
import {Grid} from "../components/Grid/Grid";
import {SelectionBar} from "../components/SelectionBar";
import {Legend} from "../components/Legend";
import {Settings} from "../components/Settings";
import {IAlgorithmPageRefs, IGridRefs, ILegendRefs, ISelectionBarRefs, ISettingsRefs} from "../types/IRefs";
import {EditMode} from "../types/EditMode";
import {PathfindingAlgorithms} from "../types/PathfindingAlgorithms";
import {ISettings} from "../types/ISettings";

interface IAlgorithmPageProps {
    onPathfindingFinished: () => void;
}

export const AlgorithmPage: React.ForwardRefExoticComponent<IAlgorithmPageProps & React.RefAttributes<IAlgorithmPageRefs>> = forwardRef(({onPathfindingFinished}, refs) => {
    const selectionBarRef = useRef<ISelectionBarRefs>(null);
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
        selectionBarRef.current?.setIsEditable(false);
    }, []);

    const handleClearAll = useCallback(() => {
        gridRef.current?.clearAll();
    }, []);

    const handleClearPath = useCallback(() => {
        gridRef.current?.clearPath();
    }, []);

    const handleChangeEditMode = useCallback((editMode: EditMode) => {
        gridRef.current?.changeEditMode(editMode);
    }, []);

    const handleChangeSettings = useCallback((settings: ISettings) => {
        gridRef.current?.changeSettings(settings);
    }, []);

    const handleOpenSettings = useCallback(() => {
        settingsRef.current?.showSettings();
    }, []);

    const handleToggleLegend = useCallback(() => {
        legendRef.current?.toggleLegend();
    }, []);

    const handlePathfindingFinished = useCallback(() => {
        selectionBarRef.current?.setIsEditable(true);
        onPathfindingFinished();
    }, [onPathfindingFinished]);

    return (
        <>
            <SelectionBar ref={selectionBarRef}
                          onClickClearAll={handleClearAll}
                          onClickClearPath={handleClearPath}
                          onShowSettings={handleOpenSettings}
                          onChangeEditMode={handleChangeEditMode} />
            <Grid ref={gridRef} onPathfindingFinished={handlePathfindingFinished} />
            <Legend ref={legendRef} />
            <Settings ref={settingsRef} onChangeSettings={handleChangeSettings} />
        </>
    )
})