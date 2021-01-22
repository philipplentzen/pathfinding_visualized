import React, {forwardRef, useCallback, useImperativeHandle, useState} from "react";
import styled from "styled-components";
import {Card, Space, Typography} from "antd";
import {DoubleRightOutlined, LoginOutlined, PlusSquareOutlined} from "@ant-design/icons";
import {ILegendRefs} from "../types/IRefs";

interface ILegendProps {

}

const Container = styled.div`
  position: absolute;
  width: 175px;
  left: 36px;
  bottom: 36px;
  box-shadow: var(--shadow);
  
  &.hide {
    display: none;
  }
`

const Wall = styled.div`
  width: 14px;
  height: 14px;
  display: inline-block;
  background-color: rgba(0, 0, 0, 0.85);
  transform: translateY(3px);
`

export const Legend: React.ForwardRefExoticComponent<ILegendProps & React.RefAttributes<ILegendRefs>> = forwardRef((props, refs) => {
    const [isShown, setIsShown] = useState(true);

    useImperativeHandle(refs, () => {
       return {
           toggleLegend,
       }
    });

    const toggleLegend = useCallback(() => {
        setIsShown((isShown) => !isShown);
    }, []);

    return (
        <Container className={isShown ? "" : "hide"}>
            <Card title="Legend" size="small" extra={<Typography.Link onClick={() => setIsShown(false)}>Hide</Typography.Link>}>
                <Space direction="vertical">
                    <Typography.Text><DoubleRightOutlined /> : Start Node</Typography.Text>
                    <Typography.Text><LoginOutlined /> : Target Node</Typography.Text>
                    <Typography.Text><Wall /> : Wall Node</Typography.Text>
                    <Typography.Text><PlusSquareOutlined /> : Shortest Path</Typography.Text>
                </Space>
            </Card>
        </Container>
    );
})