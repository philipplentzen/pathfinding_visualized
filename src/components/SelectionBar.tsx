import React, {useContext, useState} from "react";
import {Button, Divider, Space} from "antd";
import {
    BuildOutlined,
    CloseOutlined,
    DoubleRightOutlined,
    DragOutlined,
    LoginOutlined,
    PlusSquareOutlined,
    RiseOutlined,
    SettingOutlined
} from "@ant-design/icons";
import styled from "styled-components";
import {EditMode} from "../types/EditMode";
import {SettingsContext} from "./Context/SettingsContext";
import produce from "immer";
import {AlgorithmContext} from "./Context/AlgoirthmContext";
import {EditModeContext} from "./Context/EditModeContext";

interface ISelectionBarProps {
    onClickClearAll: () => void;
    onClickClearPath: () => void;
    onClickCreateMaze: () => void;
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    
    width: 100%;
    
    padding: 8px 64px;
    background-color: var(--background-dark);
    border-bottom: var(--border);
`

export const SelectionBar: React.FunctionComponent<ISelectionBarProps> = ({onClickClearAll, onClickClearPath, onClickCreateMaze}) => {
    const {setSettings} = useContext(SettingsContext);
    const {isRunning} = useContext(AlgorithmContext);
    const {editMode, setEditMode} = useContext(EditModeContext);

    return (
        <Container>
            <Space split={<Divider type="vertical" />}>
                <Space>
                    <Button type={editMode === EditMode.DRAG ? "link" : "text"}
                            size="small"
                            onClick={() => setEditMode(EditMode.DRAG)}
                            icon={<DragOutlined />}>
                        Drag
                    </Button>
                    <Button type={editMode === EditMode.START ? "link" : "text"}
                            size="small"
                            disabled={isRunning}
                            onClick={() => setEditMode(EditMode.START)}
                            icon={<DoubleRightOutlined />}>
                        Start
                    </Button>
                    <Button type={editMode === EditMode.TARGET ? "link" : "text"}
                            size="small"
                            disabled={isRunning}
                            onClick={() => setEditMode(EditMode.TARGET)}
                            icon={<LoginOutlined />}>
                        Target
                    </Button>
                    <Button type={editMode === EditMode.WALLS ? "link" : "text"}
                            size="small"
                            disabled={isRunning}
                            onClick={() => setEditMode(EditMode.WALLS)}
                            icon={<PlusSquareOutlined />}>
                        Walls
                    </Button>
                </Space>
                <Space>
                    <Button type="text"
                            size="small"
                            disabled={isRunning}
                            onClick={onClickCreateMaze}
                            icon={<BuildOutlined />}>
                        Random Maze
                    </Button>
                </Space>
            </Space>
            <Space split={<Divider type="vertical" />}>
                <Button type="text"
                        size="small"
                        disabled={isRunning}
                        onClick={onClickClearPath}
                        icon={<RiseOutlined />}>
                    Clear Path
                </Button>
                <Button type="text"
                        danger
                        size="small"
                        disabled={isRunning}
                        onClick={onClickClearAll}
                        icon={<CloseOutlined />}>
                    Clear All
                </Button>
                <Button type="text"
                        size="small"
                        disabled={isRunning}
                        onClick={() => setSettings((oldSettings) => produce(oldSettings, (newSettings) => {newSettings.shown = true}))}
                        icon={<SettingOutlined />} />
            </Space>
        </Container>
    )
}