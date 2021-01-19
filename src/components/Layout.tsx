import React from "react";
import styled from "styled-components";
import {Header} from "./Header";

interface ILayoutProps {

}

const Content = styled.main`
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
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