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
        onChangeSettings({pixelSize: 32});
        settings.current = {};
    }, [onChangeSettings]);

    return (
        <Modal title="Settings"
               visible={isShown}
               onOk={handleOkClick}
               onCancel={() => setIsShown(false)}>
            <Row gutter={8}>
                <Col span={6}>Zoom</Col>
                <Col span={18}>
                    <Slider defaultValue={1}
                            min={1}
                            max={5}
                            step={1} />
                </Col>
            </Row>
        </Modal>
    )
})