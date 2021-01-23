import React, {forwardRef, useCallback, useImperativeHandle, useState} from "react";
import {Button, Col, Modal, Row, Slider} from "antd";
import {ISettingsRefs} from "../types/IRefs";

interface ISettingsProps {
    onShowLegend: () => void;
}

export const Settings: React.ForwardRefExoticComponent<ISettingsProps & React.RefAttributes<ISettingsRefs>> = forwardRef(({onShowLegend}, refs) => {
    const [isShown, setIsShown] = useState(false);

    useImperativeHandle(refs, () => {
        return {
            showSettings,
        }
    });

    const showSettings = useCallback(() => {
        setIsShown(true);
    }, []);

    return (
        <Modal title="Settings"
               visible={isShown}
               onCancel={() => setIsShown(false)}
               footer={<Button type="primary" onClick={() => setIsShown(false)}>Done!</Button>}>
            <Row gutter={8}>
                <Col span={6}>Zoom</Col>
                <Col span={18}>
                    <Slider defaultValue={1}
                            min={1}
                            max={5}
                            step={1} />
                </Col>
            </Row>
            <Button onClick={onShowLegend}>Show Legend</Button>
        </Modal>
    )
})