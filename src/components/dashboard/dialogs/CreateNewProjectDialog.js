import { InfoOutlined } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle, TextField, Tooltip, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import axios from 'axios';
import { useState } from 'react';
import Circle from 'react-color/lib/components/circle/Circle';
import Endpoints from '../../../api/endpoints';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
export default function CreateNewProjectDialog(props) {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const { onClose, open } = props;

    const [controller, setController] = useState({
        title: '',
        description: ''
    });

    const [color, setColor] = useState('#2196f3');

    const handleChangeColor = (newColor) => {
        if (!loading) {
            setColor(newColor.hex);
        }
    };

    const handleOnClose = () => {
        if (!loading) {
            setLoading(false);
            setController({ ...controller, title: '', description: '' });
            onClose();
        }
    };

    const handleChange = (name) => (event) => {
        setController({ ...controller, [name]: event.target.value });
    };

    const [loading, setLoading] = useState(false);

    const createProject = () => {
        if (controller.title.length < 5) {
            enqueueSnackbar('The length of the title should be greater than 5.', { variant: 'warning' });
            return;
        }
        setLoading(true);
        axios
            .post(Endpoints.projects, {
                title: controller.title,
                description: controller.description,
                color: color
            })
            .then((res) => {
                handleOnClose();
                router.reload(router.pathname);
            })
            .catch((err) => {
                setLoading(false);
                enqueueSnackbar('Please try again', { variant: 'error' });
            });
    };

    return (
        <Dialog onClose={handleOnClose} open={open} fullWidth={true} maxWidth={'sm'} sx={{}}>
            <DialogTitle>Create a new project</DialogTitle>
            <DialogContent>
                <Typography variant="body1" sx={{ mt: '1rem' }}>
                    Project title*
                </Typography>
                <TextField
                    fullWidth
                    required
                    id="title"
                    size="small"
                    type="text"
                    inputProps={{
                        maxLength: 50
                    }}
                    disabled={loading}
                    value={controller.title}
                    helperText={`${controller.title.length}/50`}
                    onChange={handleChange('title')}
                ></TextField>
                <Stack
                    direction={'row'}
                    sx={{
                        alignContent: 'center',
                        alignItems: 'center',
                        mt: '1rem'
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            mr: '0.5rem'
                        }}
                    >
                        Project description*
                    </Typography>
                    <Tooltip arrow placement="top" title="Short description about your project.">
                        <InfoOutlined fontSize="small" color="action"></InfoOutlined>
                    </Tooltip>
                </Stack>
                <TextField
                    fullWidth
                    required
                    id="description"
                    size="small"
                    type="text"
                    multiline
                    sx={{
                        mb: '1rem'
                    }}
                    disabled={loading}
                    value={controller.description}
                    helperText={`${controller.description.length}/150`}
                    onChange={handleChange('description')}
                    inputProps={{
                        maxLength: 150
                    }}
                ></TextField>
                <Circle width="100%" onChangeComplete={handleChangeColor} color={color} />
                <LoadingButton
                    loading={loading}
                    sx={{
                        mt: '2rem',
                        // color: color,
                        borderColor: color,
                        backgroundColor: color,
                        ':hover': {
                            borderColor: color,
                            backgroundColor: `${color}50`
                        }
                    }}
                    onClick={createProject}
                    disableElevation
                    variant="contained"
                >
                    Create Project
                </LoadingButton>
            </DialogContent>
        </Dialog>
    );
}
