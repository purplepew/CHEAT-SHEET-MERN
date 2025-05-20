'use client'
import { ReactNode, useCallback, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { createTheme, ThemeProvider as MUIThemeProvider, ThemeOptions } from '@mui/material'
import { darkTheme, lightTheme } from '../features/theme/muiTheme'
import { selectCurrentTheme } from '../features/theme/themeSlice'

type Props = { children: ReactNode }

const theme = createTheme({ ...darkTheme })

function ThemeProvider({ children }: Props) {
    const stateTheme = useSelector(selectCurrentTheme)

    const themeRef = useRef<ThemeOptions>(theme)

    useEffect(() => {
        if (stateTheme == 'light') {
            themeRef.current = createTheme({ ...lightTheme })
        } else {
            themeRef.current = createTheme({ ...darkTheme })
        }
    }, [stateTheme])

    return (
        <MUIThemeProvider theme={themeRef.current}>{children}</MUIThemeProvider>
    )
}

export default ThemeProvider