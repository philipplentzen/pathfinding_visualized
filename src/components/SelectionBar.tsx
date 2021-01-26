import React, {forwardRef, useImperativeHandle, useState} from "react";
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
import {ISelectionBarRefs} from "../types/IRefs";

interface ISelectionBarProps {
    onClickClearAll: () => void;
    onClickClearPath: () => void;
    onShowSettings: () => void;
    onChangeEditMode: (editMode: EditMode) => void;
    onClickCreateMaze: () => void;
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    
    width: 100%;
    
    padding: 8px 64px;
    background-color: var(--background-dark);
`

export const SelectionBar: React.ForwardRefExoticComponent<ISelectionBarProps & React.RefAttributes<ISelectionBarRefs>> = forwardRef(({onClickClearAll, onClickClearPath, onShowSettings, onChangeEditMode, onClickCreateMaze}, refs) => {
    const [isEditable, setIsEditable] = useState(true);
    const [editMode, setEditMode] = useState<EditMode>(EditMode.DRAG);

    useImperativeHandle(refs, () => {
        return {
            setIsEditable: (isEditable => {
                handleEditModeChange(EditMode.DRAG);
                setIsEditable(isEditable);
            }),
        }
    });

    const handleEditModeChange = (editMode: EditMode) => {
        onChangeEditMode(editMode);
        setEditMode(editMode);
    }

    return (
        <Container>
            <Space split={<Divider type="vertical" />}>
                <Space>
                    <Button type={editMode === EditMode.DRAG ? "link" : "text"}
                            size="small"
                            onClick={() => handleEditModeChange(EditMode.DRAG)}
                            icon={<DragOutlined />}>
                        Drag
                    </Button>
                    <Button type={editMode === EditMode.START ? "link" : "text"}
                            size="small"
                            disabled={!isEditable}
                            onClick={() => handleEditModeChange(EditMode.START)}
                            icon={<DoubleRightOutlined />}>
                        Start
                    </Button>
                    <Button type={editMode === EditMode.TARGET ? "link" : "text"}
                            size="small"
                            disabled={!isEditable}
                            onClick={() => handleEditModeChange(EditMode.TARGET)}
                            icon={<LoginOutlined />}>
                        Target
                    </Button>
                    <Button type={editMode === EditMode.WALLS ? "link" : "text"}
                            size="small"
                            disabled={!isEditable}
                            onClick={() => handleEditModeChange(EditMode.WALLS)}
                            icon={<PlusSquareOutlined />}>
                        Walls
                    </Button>
                </Space>
                <Space>
                    <Button type="text"
                            size="small"
                            disabled={!isEditable}
                            onClick={onClickCreateMaze}
                            icon={<BuildOutlined />}>
                        Random Maze
                    </Button>
                </Space>
            </Space>
            <Space split={<Divider type="vertical" />}>
                <Button type="text"
                        size="small"
                        disabled={!isEditable}
                        onClick={onClickClearPath}
                        icon={<RiseOutlined />}>
                    Clear Path
                </Button>
                <Button type="text"
                        danger
                        size="small"
                        disabled={!isEditable}
                        onClick={onClickClearAll}
                        icon={<CloseOutlined />}>
                    Clear All
                </Button>
                <Button type="text"
                        size="small"
                        disabled={!isEditable}
                        onClick={onShowSettings}
                        icon={<SettingOutlined />} />
            </Space>
        </Container>
    )
})