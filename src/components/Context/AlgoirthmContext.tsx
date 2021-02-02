import React from "react";

interface IAlgorithmContext {
    isRunning: boolean;
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AlgorithmContext = React.createContext<IAlgorithmContext>({
    isRunning: false,
    setIsRunning: (isRunning) => {},
});