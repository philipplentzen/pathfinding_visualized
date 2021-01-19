import React from "react";
import {Button, Space} from "antd";
import {DragOutlined, DoubleRightOutlined, LoginOutlined, PlusSquareOutlined, CloseOutlined} from '@ant-design/icons';
import styled from "styled-components";

interface ISelectionBarProps {

}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
        
  position: absolute;
  top: 36px;
  left: 36px;
  right: 36px;
  
  padding: 12px;
  
  box-shadow: var(--shadow);
  background-color: #FFF;
`

export const SelectionBar: React.FC<ISelectionBarProps> = () => {
    return (
        <Container>
            <Space size="middle">
                <Button type="primary"
                        size="large"
                        icon={<DragOutlined />}>
                    Drag
                </Button>
                <Button type="default"
                        size="large"
                        icon={<DoubleRightOutlined />}>
                    Start
                </Button>
                <Button type="default"
                        size="large"
                        icon={<LoginOutlined />}>
                    Target
                </Button>
                <Button type="default"
                        size="large"
                        icon={<PlusSquareOutlined />}>
                    Walls
                </Button>
            </Space>
            <Space>
                <Button type="primary"
                        danger
                        size="large"
                        icon={<CloseOutlined />}>
                    Clear All
                </Button>
            </Space>
        </Container>
    )
}