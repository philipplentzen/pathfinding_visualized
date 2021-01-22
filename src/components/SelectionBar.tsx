import React, {useState} from "react";
import {Button, Divider, Space} from "antd";
import {CloseOutlined, DoubleRightOutlined, DragOutlined, LoginOutlined, PlusSquareOutlined, SettingOutlined} from '@ant-design/icons';
import styled from "styled-components";
import {EditMode} from "../types/EditMode";
import {EditModeHandler} from "../classes/EditModeHandler";

interface ISelectionBarProps {
    onClear: () => void;
    onShowSettings: () => void;
    onChangeEditMode: (editMode: EditMode) => void;
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    
    width: 100%;
    
    padding: 8px 64px;
    background-color: var(--background-dark);
`

export const SelectionBar: React.FC<ISelectionBarProps> = ({onClear, onShowSettings, onChangeEditMode}) => {
    const [editMode, setEditMode] = useState<EditMode>(EditModeHandler.editMode);

    const handleEditModeChange = (editMode: EditMode) => {
        onChangeEditMode(editMode);
        setEditMode(editMode);
    }

    return (
        <Container>
            <Space split={<Divider type="vertical" />}>
                <Button type={editMode === EditMode.DRAG ? "link" : "text"}
                        size="small"
                        onClick={() => handleEditModeChange(EditMode.DRAG)}
                        icon={<DragOutlined />}>
                    Drag
                </Button>
                <Button type={editMode === EditMode.START ? "link" : "text"}
                        size="small"
                        onClick={() => handleEditModeChange(EditMode.START)}
                        icon={<DoubleRightOutlined />}>
                    Start
                </Button>
                <Button type={editMode === EditMode.TARGET ? "link" : "text"}
                        size="small"
                        onClick={() => handleEditModeChange(EditMode.TARGET)}
                        icon={<LoginOutlined />}>
                    Target
                </Button>
                <Button type={editMode === EditMode.WALLS ? "link" : "text"}
                        size="small"
                        onClick={() => handleEditModeChange(EditMode.WALLS)}
                        icon={<PlusSquareOutlined />}>
                    Walls
                </Button>
            </Space>
            <Space split={<Divider type="vertical" />}>
                <Button type="text"
                        danger
                        size="small"
                        onClick={onClear}
                        icon={<CloseOutlined />}>
                    Clear All
                </Button>
                <Button type="text"
                        size="small"
                        onClick={onShowSettings}
                        icon={<SettingOutlined />} />
            </Space>
        </Container>
    )
}