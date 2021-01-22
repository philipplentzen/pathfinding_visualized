import React from "react";
import {Button, Divider, Select, Space, Typography} from "antd";
import styled from "styled-components";
import {PathfindingAlgorithms} from "../types/PathfindingAlgorithms";

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
            <Space split={<Divider type="vertical" />}>
                <Select placeholder="Select algorithm" style={{width: 200}} size="large">
                    {Object.entries(PathfindingAlgorithms).map(([key, algorithm]) => (
                        <Select.Option value={key} key={key}>{algorithm}</Select.Option>
                    ))}
                </Select>
                <Button type="primary" size="large" style={{width: 100}}>Run!</Button>
            </Space>
        </HeaderContainer>
    );
}