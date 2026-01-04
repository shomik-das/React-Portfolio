/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { themeColors } from "../theme/colors";
import { fontFamilies } from "../theme/fonts";
import type { AppSettingsContextType } from "../types/types";

const AppSettingsContext = createContext<AppSettingsContextType | undefined>(undefined);

export const AppSettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState(themeColors.midnightBlue);
    const [font, setFont] = useState(fontFamilies.inter);
    const [borderRadius, setBorderRadius] = useState(7);

    // Load settings from localStorage jb ek bar mout ho.
    useEffect(() => {
        const saved = localStorage.getItem("settings");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.themeColour) setTheme(parsed.themeColour);
                if (parsed.fontFamily) setFont(parsed.fontFamily);
                if (parsed.borderR !== undefined) setBorderRadius(parsed.borderR);
            } catch (err) {
                console.error("Failed to parse settings:", err);
            }
        }
    }, []);

    // save settings to local storage agar koi bhi settings change ho.
    useEffect(() => {
        const newSettings = {
            themeColour: theme,
            fontFamily: font,
            borderR: borderRadius,
        };
        localStorage.setItem("settings", JSON.stringify(newSettings));
    }, [theme, font, borderRadius]);

    const resetAll = () => { // jb user reset button pe click kre toh settings reset ho jaye.
        setTheme(themeColors.midnightBlue)
        setFont(fontFamilies.inter)
        setBorderRadius(7)
    }

    return (
        <AppSettingsContext.Provider value={{ theme, setTheme, font, setFont, borderRadius, setBorderRadius, resetAll }}>
            {children}
        </AppSettingsContext.Provider>
    );
};

export const useAppSettings = () => {
    const context = useContext(AppSettingsContext);
    if (!context) throw new Error("useAppSettings must be used within AppSettingsProvider");
    return context;
};
