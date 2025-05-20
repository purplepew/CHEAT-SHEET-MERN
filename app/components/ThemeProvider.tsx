'use client'
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material'
import { ReactNode } from 'react'

const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    }
})

type Props = { children: ReactNode }

function ThemeProvider({ children }: Props) {
    return (
        <MUIThemeProvider theme={darkTheme}>{children}</MUIThemeProvider>
    )
}

export default ThemeProvider