import { AddOutlined } from '@mui/icons-material';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useRouter } from 'next/router';
import { useState } from 'react';
import theme from '../../theme';
import CreateNewProjectDialog from './dialogs/CreateNewProjectDialog';
export default function NewProjectCard({}) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const handleOnClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Card
                variant="outlined"
                sx={{
                    ':hover': {
                        boxShadow: theme.custom.customBoxShadow,
                        borderColor: theme.palette.primary.main
                    },
                    border: '1px solid',
                    borderColor: theme.palette.primary.main,
                    borderStyle: 'dashed'
                }}
                onClick={handleOnClick}
            >
                <CardContent
                    sx={{
                        textAlign: 'center',
                        transition: '500ms color',
                        ':hover': {
                            color: theme.palette.primary.main,
                            transitionDuration: '500ms'
                        }
                    }}
                >
                    <AddOutlined />
                    <Typography variant="h6">Create a new project</Typography>
                </CardContent>
            </Card>
            <CreateNewProjectDialog onClose={handleClose} open={open}></CreateNewProjectDialog>
        </div>
    );
}
