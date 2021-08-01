import React from "react";

interface IAlgorithmContext {
    isRunnable: boolean;
    isRunning: boolean;
    hasChanges: boolean
    hasPath: boolean;
    setIsRunnable: React.Dispatch<React.SetStateAction<boolean>>;
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
    setHasChanges: React.Dispatch<React.SetStateAction<boolean>>;
    setHasPath: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AlgorithmContext = React.createContext<IAlgorithmContext>({
    isRunnable: false,
    isRunning: false,
    hasChanges: false,
    hasPath: false,
    setIsRunnable: () => null,
    setIsRunning: () => null,
    setHasChanges: () => null,
    setHasPath: () => null,
});