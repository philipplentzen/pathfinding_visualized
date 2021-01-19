import React from "react";
import {PageHeader, Tag} from "antd";

interface IHeaderProps {

}

export const Header: React.FC<IHeaderProps> = () => {
    return (
        <PageHeader title="Pathfinding Visualized"
                    tags={<Tag color="cyan">ALPHA</Tag>}
                    ghost={false}/>
    );
}