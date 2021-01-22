import React, {forwardRef, useCallback, useImperativeHandle, useState} from "react";
import {Button, Modal} from "antd";
import {ISettingsRefs} from "../types/IRefs";

interface ISettingsProps {

}

export const Settings: React.ForwardRefExoticComponent<ISettingsProps & React.RefAttributes<ISettingsRefs>> = forwardRef((props, refs) => {
    const [isShown, setIsShown] = useState(false);

    useImperativeHandle(refs, () => {
        return {
            openSettings,
        }
    });

    const openSettings = useCallback(() => {
        setIsShown(true);
    }, []);

    return (
        <Modal title="Settings"
               visible={isShown}
               onCancel={() => setIsShown(false)}
               footer={<Button type="primary" onClick={() => setIsShown(false)}>Done!</Button>}>
        </Modal>
    )
})