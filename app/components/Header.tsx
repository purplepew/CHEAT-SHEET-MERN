import AppBar  from "@mui/material/AppBar"
import Toolbar  from "@mui/material/Toolbar"
import Button  from "@mui/material/Button"
import Typography  from "@mui/material/Typography"

export default function Header() {
  return (
    <AppBar position='static'>
        <Toolbar>
            <Typography>Logo</Typography>
            <Button variant='contained' sx={{ml: 'auto'}}>Contact Us</Button>
        </Toolbar>
    </AppBar>
  )
}
