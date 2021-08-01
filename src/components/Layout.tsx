import React from "react";
import styled from "styled-components";
import {Header} from "./Header";
import {PathfindingAlgorithms} from "../types/PathfindingAlgorithms";

interface ILayoutProps extends React.ComponentPropsWithoutRef<any> {
    handleRunPathfinding: (algorithm: PathfindingAlgorithms) => void;
}

const Content = styled.main`
    position: relative;
    height: calc(100% - 73px);
`

export const Layout: React.FunctionComponent<ILayoutProps> = ({handleRunPathfinding, children}) => {
    return (
        <>
            <Header onClickRunPathfinding={handleRunPathfinding}/>
            <Content>
                {children}
            </Content>
        </>
    )
}