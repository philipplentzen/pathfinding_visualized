import React, {forwardRef, useCallback, useImperativeHandle, useState} from "react";
import {Button, Divider, Popover, Select, Space, Typography} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";
import styled from "styled-components";
import {PathfindingAlgorithms} from "../types/PathfindingAlgorithms";
import {IHeaderRefs} from "../types/IRefs";

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

export const Header: React.ForwardRefExoticComponent<IHeaderProps & React.RefAttributes<IHeaderRefs>> = forwardRef(({onClickRunPathfinding}, refs) => {
    const [algorithm, setAlgorithm] = useState<PathfindingAlgorithms | undefined>(undefined);
    const [isBusy, setIsBusy] = useState(false);

    useImperativeHandle(refs, () => {
        return {
            setIsPageBusy
        }
    });

    const setIsPageBusy = useCallback((isBusy: boolean) => {
        setIsBusy(isBusy);
    }, []);

    const handleRunPathfinding = useCallback(() => {
        if (algorithm !== undefined && !isBusy) {
            onClickRunPathfinding(algorithm);
        }
    }, [algorithm, isBusy, onClickRunPathfinding]);

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
                            disabled={isBusy}
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
                        loading={isBusy}
                        disabled={algorithm === undefined}
                        onClick={() => handleRunPathfinding()}
                        style={{width: 100}}>Run!</Button>
            </Space>
        </HeaderContainer>
    );
})