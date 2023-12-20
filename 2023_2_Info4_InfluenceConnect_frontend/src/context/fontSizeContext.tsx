import React, { createContext, useState } from 'react'
import { ContextProps, FontSizeContextProps } from '../interface'

export const FontSizeContext = createContext<FontSizeContextProps>({

    megaSize: 0,
    setMegaSize: () => {},

    titleSize: 0,
    setTitleSize: () => {},

    subTitleSize: 0,
    setSubTitleSize: () => {},

    paragrafoSize: 0,
    setParagrafoSize: () => {}
})

export const FontSizeProvider: React.FC<ContextProps> = ({ children }) => {

    const [megaSize, setMegaSize] = useState<number>(6)
    const [titleSize, setTitleSize] = useState<number>(2.5)
    const [subTitleSize, setSubTitleSize] = useState<number>(2)
    const [paragrafoSize, setParagrafoSize] = useState<number>(1)

    return (
        <FontSizeContext.Provider
            value={{
                megaSize, setMegaSize,
                titleSize, setTitleSize,
                subTitleSize, setSubTitleSize,
                paragrafoSize, setParagrafoSize
            }}>
            {children}
        </FontSizeContext.Provider>
    )
}