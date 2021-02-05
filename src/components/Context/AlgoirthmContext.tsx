import React from "react";

interface IAlgorithmContext {
    isRunnable: boolean;
    isRunning: boolean;
    setIsRunnable: React.Dispatch<React.SetStateAction<boolean>>;
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AlgorithmContext = React.createContext<IAlgorithmContext>({
    isRunnable: false,
    isRunning: false,
    setIsRunnable: (isRunning) => {},
    setIsRunning: (isRunning) => {},
});