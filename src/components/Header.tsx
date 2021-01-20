import React from "react";
import {Typography} from "antd";
import styled from "styled-components";

interface IHeaderProps {

}

const HeaderContainer = styled.header`
    z-index: 99;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  
    width: 100%;
    height: 72px;
  
    padding: 16px 64px;
  
    background-color: var(--background);
    border-bottom: var(--border);
`

export const Header: React.FC<IHeaderProps> = () => {
    return (
        <HeaderContainer>
            <Typography.Title level={3} style={{marginBottom: 0}}>Pathfinding Visualized</Typography.Title>
        </HeaderContainer>
    );
}