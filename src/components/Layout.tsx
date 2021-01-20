import React from "react";
import styled from "styled-components";
import {Header} from "./Header";

interface ILayoutProps {

}

const Content = styled.main`
    position: relative;
    height: calc(100% - 73px);
`

export const Layout: React.FC<ILayoutProps> = ({children}) => {
    return (
        <>
            <Header />
            <Content>
                {children}
            </Content>
        </>
    )
}