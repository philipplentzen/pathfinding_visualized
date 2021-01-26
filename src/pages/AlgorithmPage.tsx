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
    isPageBusy: (isBusy: boolean) => void;
}

export const AlgorithmPage: React.ForwardRefExoticComponent<IAlgorithmPageProps & React.RefAttributes<IAlgorithmPageRefs>> = forwardRef(({isPageBusy}, refs) => {
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
        isPageBusy(true);
        selectionBarRef.current?.setIsEditable(false);
    }, [isPageBusy]);

    const handlePathfindingFinished = useCallback(() => {
        isPageBusy(false);
        selectionBarRef.current?.setIsEditable(true);
    }, [isPageBusy]);

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

    const handleCreateMaze = useCallback(() => {
        gridRef.current?.createMaze();
        isPageBusy(true);
        selectionBarRef.current?.setIsEditable(false);
    }, [isPageBusy]);

    const handleMazeCreationFinished = useCallback(() => {
        isPageBusy(false);
        selectionBarRef.current?.setIsEditable(true);
    }, [isPageBusy]);

    return (
        <>
            <SelectionBar ref={selectionBarRef}
                          onClickClearAll={handleClearAll}
                          onClickClearPath={handleClearPath}
                          onShowSettings={handleOpenSettings}
                          onChangeEditMode={handleChangeEditMode}
                          onClickCreateMaze={handleCreateMaze} />
            <Grid ref={gridRef} pathfindingFinished={handlePathfindingFinished} mazeCreationFinished={handleMazeCreationFinished} />
            <Legend ref={legendRef} />
            <Settings ref={settingsRef} onChangeSettings={handleChangeSettings} />
        </>
    )
})