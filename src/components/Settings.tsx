import React, {useCallback, useContext, useState} from "react";
import {Checkbox, Col, Modal, Row, Slider} from "antd";
import {SettingsContext} from "./Context/SettingsContext";
import produce from "immer";

interface ISettingsProps {

}

export const Settings: React.FunctionComponent<ISettingsProps> = () => {
    const {settings, setSettings} = useContext(SettingsContext);
    const [pixelSize, setPixelSize] = useState(settings.pixelSize);
    
    const handleCancelClick = useCallback(() => {
        setSettings((oldSettings) => produce(oldSettings, (newSettings) => {
            newSettings.shown = false;
        }))
    }, [setSettings]);

    const handleOkClick = useCallback(() => {
        setSettings(produce(settings, (newSettings) => {
            newSettings.shown = false;
            newSettings.pixelSize = pixelSize;
        }));
    }, [settings, setSettings, pixelSize]);

    return (
        <Modal title="Settings"
               visible={settings.shown}
               onCancel={handleCancelClick}
               onOk={handleOkClick}>
            <Row gutter={8}>
                <Col span={6}>Grid Size</Col>
                <Col span={18}>
                    <Slider defaultValue={(pixelSize - 12) / 4}
                            min={1}
                            max={10}
                            step={1}
                            onChange={(size: number) => {
                                setPixelSize(12 + 4 * size);
                            }} />
                </Col>
            </Row>
            <Row gutter={8}>
                <Col span={6}>Speed (MS)</Col>
                <Col span={18}>
                    <Slider defaultValue={settings.speed}
                            min={0}
                            max={1000}
                            step={100}
                            onChange={(speed: number) => setSettings((oldSettings) => produce(oldSettings, (newSettings) => {
                                newSettings.speed = speed;
                            }))} />
                </Col>
            </Row>
            <Row gutter={8}>
                <Col span={6}>Show legend</Col>
                <Col span={18}>
                    <Checkbox checked={settings.legendShown}
                              onChange={() => setSettings((oldSettings) => produce(oldSettings, (newSettings) => {
                                  newSettings.legendShown = !oldSettings.legendShown;
                              }))} />
                </Col>
            </Row>
        </Modal>
    )
}