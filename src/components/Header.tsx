import React, {useCallback, useContext, useState} from "react";
import {Button, Divider, Select, Space, Tag, Typography} from "antd";
import {GithubOutlined, InfoCircleOutlined} from "@ant-design/icons";
import styled from "styled-components";
import {PathfindingAlgorithms} from "../types/PathfindingAlgorithms";
import {AlgorithmContext} from "./Context/AlgoirthmContext";
import {Algorithm} from "../classes/algorithm/Algorithm";

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

const GithubLink = styled.a`
  font-size: 24px;
`

export const Header: React.FunctionComponent<IHeaderProps> = ({onClickRunPathfinding}) => {
    const [algorithm, setAlgorithm] = useState<PathfindingAlgorithms | undefined>(undefined);
    const {isRunnable, isRunning} = useContext(AlgorithmContext);

    const handleRunPathfinding = useCallback(() => {
        if (isRunning) {
            Algorithm.isStopped = true;
        }
        if (algorithm !== undefined && !isRunning) {
            onClickRunPathfinding(algorithm);
        }
    }, [algorithm, isRunning, onClickRunPathfinding]);

    return (
        <HeaderContainer>
            <Space split={<Divider type="vertical" />}>
                <Typography.Title level={3} style={{marginBottom: 0}}>
                    Pathfinding Visualized
                </Typography.Title>
                <GithubLink href="https://github.com/philipplentzen/pathfinding_visualized" target="_blank">
                    <GithubOutlined />
                </GithubLink>
            </Space>
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
                        danger={isRunning}
                        disabled={(algorithm === undefined || !isRunnable) && !isRunning}
                        onClick={() => handleRunPathfinding()}
                        style={{width: 100}}>
                    {isRunning ? "Stop!" : "Run!"}
                </Button>
            </Space>
        </HeaderContainer>
    );
}