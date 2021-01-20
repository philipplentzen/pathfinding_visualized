import React from "react";
import {Button, Divider, Space} from "antd";
import {DragOutlined, DoubleRightOutlined, LoginOutlined, PlusSquareOutlined, CloseOutlined} from '@ant-design/icons';
import styled from "styled-components";

interface ISelectionBarProps {

}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    
    width: 100%;
    
    padding: 8px 64px;
    background-color: var(--background-dark);
`

export const SelectionBar: React.FC<ISelectionBarProps> = () => {
    return (
        <Container>
            <Space split={<Divider type="vertical" />}>
                <Button type="link"
                        size="small"
                        icon={<DragOutlined />}>
                    Drag
                </Button>
                <Button type="text"
                        size="small"
                        icon={<DoubleRightOutlined />}>
                    Start
                </Button>
                <Button type="text"
                        size="small"
                        icon={<LoginOutlined />}>
                    Target
                </Button>
                <Button type="text"
                        size="small"
                        icon={<PlusSquareOutlined />}>
                    Walls
                </Button>
            </Space>
            <Space>
                <Button type="text"
                        danger
                        size="small"
                        icon={<CloseOutlined />}>
                    Clear All
                </Button>
            </Space>
        </Container>
    )
}