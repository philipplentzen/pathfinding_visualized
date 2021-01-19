import React from "react";
import {PageHeader, Tag} from "antd";
import styled from "styled-components";

interface IHeaderProps {

}

const HeaderContainer = styled.header`
    box-shadow: var(--shadow);
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