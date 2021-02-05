import React, {useCallback, useRef, useState} from "react";
import {Grid} from "../components/Grid/Grid";
import {SelectionBar} from "../components/SelectionBar";
import {Legend} from "../components/Legend";
import {Settings} from "../components/Settings";
import {IGridRefs} from "../types/IRefs";
import {EditMode} from "../types/EditMode";
import {PathfindingAlgorithms} from "../types/PathfindingAlgorithms";
import {AlgorithmContext} from "../components/Context/AlgoirthmContext";
import {SettingsContext} from "../components/Context/SettingsContext";
import {Layout} from "../components/Layout";
import {ISettings} from "../types/ISettings";
import {EditModeContext} from "../components/Context/EditModeContext";
import {MazeAlgorithms} from "../types/MazeAlgorithms";

interface IAlgorithmPageProps {

}

export const AlgorithmPage: React.FunctionComponent<IAlgorithmPageProps> = () => {
    const [settings, setSettings] = useState<ISettings>({
        shown: false,
        pixelSize: 32,
        legendShown: false,
        speed: 0,
    });
    const [isRunnable, setIsRunnable] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [editMode, setEditMode] = useState(EditMode.DRAG);
    const gridRef = useRef<IGridRefs>(null);

    const handleRunAlgorithm = useCallback((algorithm: PathfindingAlgorithms | MazeAlgorithms) => {
        gridRef.current?.runAlgorithm(algorithm);
    }, []);

    const handleClearAll = useCallback(() => {
        gridRef.current?.clearAll();
    }, []);

    const handleClearPath = useCallback(() => {
        gridRef.current?.clearPath();
    }, []);

    return (
        <SettingsContext.Provider value={{settings, setSettings}}>
            <AlgorithmContext.Provider value={{isRunnable, isRunning, setIsRunnable, setIsRunning}}>
                <Layout handleRunPathfinding={handleRunAlgorithm}>
                    <EditModeContext.Provider value={{editMode, setEditMode}}>
                        <SelectionBar onClickClearAll={handleClearAll}
                                      onClickClearPath={handleClearPath}
                                      onClickCreateMaze={() => handleRunAlgorithm(MazeAlgorithms.RECURSIVE_MAZE)} />
                        <Grid ref={gridRef} />
                    </EditModeContext.Provider>
                    <Legend />
                    <Settings />
                </Layout>
            </AlgorithmContext.Provider>
        </SettingsContext.Provider>
    )
}