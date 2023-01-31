import { CircularProgress } from "@mui/material";
import { Container } from "@mui/system";

export default function Loading(){
    return (<Container sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed"
    }}>
        <CircularProgress>
            
        </CircularProgress>
    </Container>);
}