import React, { createContext, useState } from 'react'
import { ContextProps, ThemeContextProps } from '../interface'

export const ThemeContext = createContext<ThemeContextProps>({

    darkMode: false,
    isDarkMode: () => { }
})

export const ThemeProvider: React.FC<ContextProps> = ({ children }) => {

    const storedDarkMode = localStorage.getItem('theme')
    
    const [darkMode, isDarkMode] = useState<boolean>(storedDarkMode != 'dark');

    return (
        <ThemeContext.Provider
            value={{
                darkMode, isDarkMode,
            }}>
            {children}
        </ThemeContext.Provider>
    )
}