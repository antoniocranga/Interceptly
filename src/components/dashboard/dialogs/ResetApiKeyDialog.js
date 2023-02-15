import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import theme from "../../../theme";

export default function ResetApiKeyDialog(props) {
    const { onClose, open, onReset } = props;

    const handleClose = () => {
        onClose();
    }

    const handleOnReset = () => {
        onReset();
    }
    return (<Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth={'sm'}>
        <DialogTitle>Reset API Key?</DialogTitle>
        <DialogContent>
            <DialogContentText>By resetting the API Key, the access with the previous API Key will be revoked and the requests made using it will not be considered.</DialogContentText>
            <Button onClick={handleOnReset} autoFocus sx={{
                mt: '2rem'
            }} variant="contained" disableElevation color="error" size="small">
                Reset api key
            </Button>
        </DialogContent>
    </Dialog>);
}