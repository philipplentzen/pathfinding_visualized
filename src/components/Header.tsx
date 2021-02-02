import React, {useCallback, useContext, useState} from "react";
import {Button, Divider, Select, Space, Typography} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";
import styled from "styled-components";
import {PathfindingAlgorithms} from "../types/PathfindingAlgorithms";
import {AlgorithmContext} from "./Context/AlgoirthmContext";

interface IHeaderProps {
    onClickRunPathfinding: (algorithm: PathfindingAlgorithms) => void;
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

export const Header: React.FunctionComponent<IHeaderProps> = ({onClickRunPathfinding}) => {
    const [algorithm, setAlgorithm] = useState<PathfindingAlgorithms | undefined>(undefined);
    const {isRunning} = useContext(AlgorithmContext);

    const handleRunPathfinding = useCallback(() => {
        if (algorithm !== undefined && !isRunning) {
            onClickRunPathfinding(algorithm);
        }
    }, [algorithm, isRunning, onClickRunPathfinding]);

    return (
        <HeaderContainer>
            <Typography.Title level={3} style={{marginBottom: 0}}>Pathfinding Visualized</Typography.Title>
            <Space split={<Divider type="vertical" />}>
                <div>
                    <Button type="text"
                            size="large"
                            disabled={algorithm === undefined}
                            icon={<InfoCircleOutlined />}
                            style={{display: algorithm === undefined ? "none" : ""}}/>
                    <Select placeholder="Select algorithm"
                            value={algorithm}
                            disabled={isRunning}
                            size="large"
                            onSelect={(value) => setAlgorithm(value)}
                            style={{width: 200}}>
                        {Object.entries(PathfindingAlgorithms).map(([key, algorithm]) => (
                            <Select.Option value={algorithm} key={key}>{algorithm}</Select.Option>
                        ))}
                    </Select>
                </div>
                <Button type="primary"
                        size="large"
                        loading={isRunning}
                        disabled={algorithm === undefined}
                        onClick={() => handleRunPathfinding()}
                        style={{width: 100}}>Run!</Button>
            </Space>
        </HeaderContainer>
    );
}