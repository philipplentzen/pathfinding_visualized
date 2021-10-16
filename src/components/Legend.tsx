import React, {useContext} from "react";
import styled from "styled-components";
import {Card, Space, Typography} from "antd";
import {DoubleRightOutlined, LoginOutlined} from "@ant-design/icons";
import {SettingsContext} from "./Context/SettingsContext";
import produce from "immer";

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
  background-color: #262626;
  transform: translateY(3px);
`

const Shortest = styled.div`
  width: 14px;
  height: 14px;
  display: inline-block;
  background-color: #ff4d4f;
  transform: translateY(3px);
`

export const Legend: React.FunctionComponent<ILegendProps> = () => {
    const {settings, setSettings} = useContext(SettingsContext);

    return (
        <Container className={settings.legendShown ? "" : "hide"}>
            <Card title="Legend"
                  size="small"
                  extra={
                      <Typography.Link onClick={() => setSettings((oldSettings) => produce(oldSettings, (newSettings) => {newSettings.legendShown = false}))}>
                          Hide
                      </Typography.Link>
                  }>
                <Space direction="vertical">
                    <Typography.Text><DoubleRightOutlined /> : Start Node</Typography.Text>
                    <Typography.Text><LoginOutlined /> : Target Node</Typography.Text>
                    <Typography.Text><Wall /> : Wall Node</Typography.Text>
                    <Typography.Text><Shortest /> : Shortest Path</Typography.Text>
                </Space>
            </Card>
        </Container>
    );
}