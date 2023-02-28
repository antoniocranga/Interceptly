import { InfoOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import { Stack } from '@mui/system';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Endpoints from '../../../api/endpoints';

export default function TeamMemberDialog(props) {
    const router = useRouter();
    const { projectId } = router.query;
    const { onClose, open, user } = props;
    const [controller, setController] = useState('');
    const [loading, setLoading] = useState(false);
    const [permission, setPermission] = useState(null);
    const permissions = [
        {
            label: 'VIEW',
            permission: 0
        },
        {
            label: 'DEVELOPER',
            permission: 1
        },
        {
            label: 'ADMIN',
            permission: 2
        }
    ];
    const changePermission = (event) => {
        setPermission(event.target.value);
    };
    useEffect(() => {
        if (user) {
            setController(user.email);
            setPermission(permissions.find((value) => value.label == user.permission).permission);
        } else {
            setController('');
            setPermission(0);
        }
    }, [user]);
    const handleOnClose = () => {
        // if (!loading) {
        //     setLoading(false);
        //     // setController('');
        //     onClose();
        // }
        onClose();
    };
    const addMember = () => {
        axios
            .post(`${Endpoints.projects}/permissions`, {
                email: controller,
                projectId: projectId,
                permission: permission
            })
            .then((data) => {
                onClose();
                router.reload();
            })
            .catch((err) => {
                onClose();
                router.reload();
            });
    };
    const removeMember = () => {
        axios
            .delete(`${Endpoints.projects}/permissions`, {
                data: {
                    userId: user.id,
                    projectId: projectId
                }
            })
            .then((data) => {
                onClose();
                router.reload();
            })
            .catch((err) => {
                onClose();
                router.reload();
            });
    };
    return (
        <Dialog onClose={handleOnClose} open={open} fullWidth={true} maxWidth={'sm'} sx={{}}>
            <DialogTitle>{user ? 'Manage team member' : 'Add a new team member'}</DialogTitle>
            <DialogContent>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        mt: '0.5rem'
                    }}
                >
                    <Grid item xs={12} sm={8}>
                        <TextField
                            fullWidth
                            required
                            id="email"
                            size="small"
                            type="email"
                            disabled={loading || user}
                            value={controller}
                            label="Email"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl
                            size="small"
                            fullWidth
                            sx={{
                                minWidth: 125,
                                backgroundColor: 'white',
                                borderRadius: '8px'
                            }}
                        >
                            <InputLabel id="permission-input-label">Permission</InputLabel>

                            <Select
                                defaultValue={0}
                                labelId="permission-input-label"
                                id="permission-select"
                                label={'Permission'}
                                value={permission}
                                onChange={changePermission}
                                name={'permission'}
                            >
                                {permissions.map((option) => (
                                    <MenuItem key={option.label} value={option.permission}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent={'end'}>
                        {user && (
                            <Button variant="text" color="error" onClick={removeMember}>
                                Remove member
                            </Button>
                        )}
                    </Grid>
                </Grid>
                <LoadingButton
                    loading={loading}
                    sx={{
                        mt: '2rem'
                    }}
                    onClick={addMember}
                    disableElevation
                    variant="contained"
                >
                    Confirm
                </LoadingButton>
                <LoadingButton
                    loading={loading}
                    sx={{
                        mt: '2rem',
                        ml: '1rem'
                    }}
                    onClick={handleOnClose}
                    disableElevation
                    variant="text"
                >
                    cancel
                </LoadingButton>
            </DialogContent>
        </Dialog>
    );
}
