import React, {forwardRef, useCallback, useImperativeHandle, useRef, useState} from "react";
import {Col, Modal, Row, Slider} from "antd";
import {ISettingsRefs} from "../types/IRefs";
import {ISettings} from "../types/ISettings";

interface ISettingsProps {
    onChangeSettings: (settings: ISettings) => void;
}

export const Settings: React.ForwardRefExoticComponent<ISettingsProps & React.RefAttributes<ISettingsRefs>> = forwardRef(({onChangeSettings}, refs) => {
    const [isShown, setIsShown] = useState(false);
    const settings = useRef<ISettings>({});

    useImperativeHandle(refs, () => {
        return {
            showSettings,
        }
    });

    const showSettings = useCallback(() => {
        setIsShown(true);
    }, []);

    const handleOkClick = useCallback(() => {
        setIsShown(false);
        onChangeSettings(settings.current);
        settings.current = {};
    }, [onChangeSettings]);

    const handleGridSizeSliderChange = useCallback((value: number) => {
        if (value < 1 || value > 5) return;
        settings.current.pixelSize = 12 + 4 * value;
    }, []);

    return (
        <Modal title="Settings"
               visible={isShown}
               onOk={handleOkClick}
               onCancel={() => setIsShown(false)}>
            <Row gutter={8}>
                <Col span={6}>Grid Size</Col>
                <Col span={18}>
                    <Slider defaultValue={5}
                            min={1}
                            max={5}
                            step={1}
                            onChange={handleGridSizeSliderChange} />
                </Col>
            </Row>
        </Modal>
    )
})