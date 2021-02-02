import React, {useCallback, useContext, useState} from "react";
import {Col, Modal, Row, Slider} from "antd";
import {SettingsContext} from "./Context/SettingsContext";
import produce from "immer";

interface ISettingsProps {

}

export const Settings: React.FunctionComponent<ISettingsProps> = () => {
    const {settings, setSettings} = useContext(SettingsContext);
    const [pixelSize, setPixelSize] = useState(settings.pixelSize);

    const handleOkClick = useCallback(() => {
        setSettings(produce(settings, (newSettings) => {
            newSettings.pixelSize = pixelSize;
        }));
    }, [settings, setSettings, pixelSize]);

    return (
        <Modal title="Settings"
               visible={settings.shown}
               onOk={handleOkClick}
               onCancel={() => setSettings((oldSettings) => produce(oldSettings, (newSettings) => {newSettings.shown = false}))}>
            <Row gutter={8}>
                <Col span={6}>Grid Size</Col>
                <Col span={18}>
                    <Slider defaultValue={(pixelSize - 12) / 4}
                            min={1}
                            max={5}
                            step={1}
                            onChange={(value: number) => setPixelSize(12 + 4 * value)} />
                </Col>
            </Row>
        </Modal>
    )
}