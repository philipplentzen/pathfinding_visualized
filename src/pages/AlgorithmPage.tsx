import React from "react";
import {Grid} from "../components/Grid/Grid";
import {SelectionBar} from "../components/SelectionBar";

interface IAlgorithmPageProps {

}

export const AlgorithmPage: React.FC<IAlgorithmPageProps> = () => {
    return (
        <>
            <SelectionBar />
            <Grid />
        </>
    )
}