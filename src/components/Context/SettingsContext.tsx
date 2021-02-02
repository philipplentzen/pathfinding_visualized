import React from "react";
import {ISettings} from "../../types/ISettings";

interface ISettingsContext {
    settings: ISettings;
    setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
}

export const SettingsContext = React.createContext<ISettingsContext>({
    settings: {
        shown: false,
        pixelSize: 32,
    },
    setSettings: () => {}
})