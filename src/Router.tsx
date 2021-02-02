import React, {useCallback, useRef, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import {AlgorithmPage} from "./pages/AlgorithmPage";
import {Layout} from "./components/Layout";
import {IAlgorithmPageRefs, ILayoutRefs} from "./types/IRefs";
import {PathfindingAlgorithms} from "./types/PathfindingAlgorithms";
import {ISettings} from "./types/ISettings";
import { SettingsContext } from './components/Context/SettingsContext';

interface IRouterProps {

}

export const Router: React.FC<IRouterProps> = () => {
    const [settings, setSettings] = useState<ISettings>({
        shown: false,
        pixelSize: 32,
    });
    const algorithmPageRef = useRef<IAlgorithmPageRefs>(null);
    const layoutRef = useRef<ILayoutRefs>(null);

    const handleRunPathfinding = useCallback((algorithm: PathfindingAlgorithms) => {
        algorithmPageRef.current?.runPathfinding(algorithm);
    }, []);

    const handleIsPageBusy = useCallback((isBusy: boolean) => {
        layoutRef.current?.setIsPageBusy(isBusy);
    }, []);

    return (
        <BrowserRouter>
            <SettingsContext.Provider value={{settings, setSettings}}>
                <Layout ref={layoutRef} handleRunPathfinding={handleRunPathfinding}>
                    <AlgorithmPage ref={algorithmPageRef} isPageBusy={handleIsPageBusy} />
                </Layout>
            </SettingsContext.Provider>
        </BrowserRouter>
    );
};
