'use client'
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useDispatch } from 'react-redux'
import { changeTheme } from '../features/theme/themeSlice'

export default function Header() {
    const dispatch = useDispatch()

    const handleChangeTheme = () => {
        dispatch(changeTheme())
    }

    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography>Logo</Typography>
                <Button variant='contained' sx={{ ml: 'auto' }} onClick={handleChangeTheme}>Change Theme</Button>
            </Toolbar>
        </AppBar>
    )
}
