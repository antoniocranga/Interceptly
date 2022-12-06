import { Button } from "@mui/material";
import { Google } from "@mui/icons-material";
import { red } from "@mui/material/colors";
export default function SocialAuthButton(){
    return <Button variant='outlined' color='error' sx={{
        mb: '0.5rem'
    }}>
        <Google/>
    </Button>
}