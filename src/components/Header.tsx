import React from "react";
import {PageHeader, Tag} from "antd";
import styled from "styled-components";

interface IHeaderProps {

}

const HeaderContainer = styled.header`
    box-shadow: 0 6px 16px -8px rgba(0,0,0,.08), 0 9px 28px 0 rgba(0,0,0,.05), 0 12px 48px 16px rgba(0,0,0,.03);
`

export const Header: React.FC<IHeaderProps> = () => {
    return (
        <HeaderContainer>
            <PageHeader title="Pathfinding Visualized"
                        tags={<Tag color="cyan">ALPHA</Tag>}
                        ghost={false} />
        </HeaderContainer>
    );
}