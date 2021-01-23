import React, {forwardRef, useCallback, useImperativeHandle, useRef} from "react";
import styled from "styled-components";
import {Header} from "./Header";
import {PathfindingAlgorithms} from "../types/PathfindingAlgorithms";
import {IHeaderRefs, ILayoutRefs} from "../types/IRefs";

interface ILayoutProps extends React.ComponentPropsWithoutRef<any> {
    handleRunPathfinding: (algorithm: PathfindingAlgorithms) => void;
}

const Content = styled.main`
    position: relative;
    height: calc(100% - 73px);
`

export const Layout: React.ForwardRefExoticComponent<ILayoutProps & React.RefAttributes<ILayoutRefs>> = forwardRef(({handleRunPathfinding, children}, refs) => {
    const headerRef = useRef<IHeaderRefs>(null)

    useImperativeHandle(refs, () => {
        return {
            pathfindingFinished,
        }
    });

    const pathfindingFinished = useCallback(() => {
        headerRef.current?.pathfindingFinished();
    }, []);

    return (
        <>
            <Header ref={headerRef} onClickRunPathfinding={handleRunPathfinding}/>
            <Content>
                {children}
            </Content>
        </>
    )
})