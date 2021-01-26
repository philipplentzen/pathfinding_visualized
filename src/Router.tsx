import React, {useCallback, useRef} from 'react';
import {BrowserRouter} from "react-router-dom";
import {AlgorithmPage} from "./pages/AlgorithmPage";
import {Layout} from "./components/Layout";
import {IAlgorithmPageRefs, ILayoutRefs} from "./types/IRefs";
import {PathfindingAlgorithms} from "./types/PathfindingAlgorithms";

interface IRouterProps {

}

export const Router: React.FC<IRouterProps> = () => {
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
            <Layout ref={layoutRef} handleRunPathfinding={handleRunPathfinding}>
                <AlgorithmPage ref={algorithmPageRef} isPageBusy={handleIsPageBusy} />
            </Layout>
        </BrowserRouter>
    );
};
