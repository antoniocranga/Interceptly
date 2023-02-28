import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import theme from "../../../theme";

export default function DeleteProjectDialog(props) {
    const { onClose, open, onReset } = props;

    const handleClose = () => {
        onClose();
    }

    const handleOnReset = () => {
        onReset();
    }
    return (<Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth={'sm'}>
        <DialogTitle>Delete the project?</DialogTitle>
        <DialogContent>
            <DialogContentText>By deleting the project, any information linked to it such as events, issues and permissions will be erased, and can not be recovered.</DialogContentText>
            <Button onClick={handleOnReset} autoFocus sx={{
                mt: '2rem'
            }} variant="contained" disableElevation color="error" size="small">
                Delete project
            </Button>
            <Button onClick={handleClose} sx={{
                ml: '1rem',
                mt: '2rem'
            }} variant="text" disableElevation color="info" size="small">
                Cancel
            </Button>
        </DialogContent>
    </Dialog>);
}