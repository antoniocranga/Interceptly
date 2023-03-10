import { AddOutlined, CheckOutlined, KeyboardArrowDownOutlined, SendOutlined } from '@mui/icons-material';
import { Box, Button, Grid, List, ListItem, Stack, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Container } from '@mui/system';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Endpoints from '../../../src/api/endpoints';
import CreateNewProjectDialog from '../../../src/components/dashboard/dialogs/CreateNewProjectDialog';
import TeamMemberDialog from '../../../src/components/dashboard/dialogs/TeamMemberDialog';
import TeamUserCardSkeleton from '../../../src/components/dashboard/skeletons/TeamUserCardSkeleton';
import NoTeamCard from '../../../src/components/dashboard/team/NoTeamCard';
import TeamUserCard from '../../../src/components/dashboard/team/TeamUserCard';

export default function Team() {
    const [team, setTeam] = useState([{}, {}, {}]);
    const [filteredTeam, setFilteredTeam] = useState(team);
    const router = useRouter();
    const { projectId } = router.query;
    const [isLoading, setIsLoading] = useState(true);
    const [controller, setController] = useState('');
    const handleChangeController = (event) => {
        filterTeam(event.target.value);
        setController(event.target.value);
    };
    const filterTeam = (value) => {
        setFilteredTeam(team.filter((user) => user.email.startsWith(value)));
    };
    const [selectedUser, setSelectedUser] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOnClick = (user) => () => {
        if (user && user.permission == 'OWNER') {
            return;
        }
        setSelectedUser(user);
        setOpen(true);
    };
   
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        if (projectId) {
            axios
                .get(`${Endpoints.projects}/${projectId}/permissions`)
                .then((data) => {
                    setTeam(data.data);
                    setFilteredTeam(data.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setFilteredTeam([]);
                    setIsLoading(false);
                });
        }
    }, [projectId]);

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleButtonDropdown = (event) => {
        if (isOpen) {
            setAnchorEl(null);
        } else {
            setAnchorEl(event.currentTarget);
        }
    };
    const close = () => {
        setAnchorEl(null);
    };
    return (
        <Box
            sx={{
                backgroundColor: grey[50],
                py: '1rem'
            }}
        >
            <Container>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 500,
                        mb: '1rem'
                    }}
                >
                    Your team
                </Typography>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        mt: '1rem'
                    }}
                >
                    <Grid item xs={12} sm={8}>
                        <TextField
                            value={controller}
                            onChange={handleChangeController}
                            id={'render-input-textfield'}
                            key={'render-input-textfield'}
                            fullWidth
                            size="small"
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: '8px'
                            }}
                            required
                            type="text"
                            placeholder="Search by email address"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button
                            variant="contained"
                            disableElevation
                            startIcon={<AddOutlined />}
                            fullWidth
                            sx={{
                                height: '40px',
                                minWidth: '150px'
                            }}
                            onClick={handleOnClick(null)}
                        >
                            Add member
                        </Button>
                    </Grid>
                </Grid>

                <List
                    disablePadding
                    sx={{
                        my: '1rem'
                    }}
                >
                    <ListItem
                        sx={{
                            border: '1px solid',
                            borderColor: grey[300],
                            borderRadius: '8px 8px 0px 0px',
                            height: '45px'
                        }}
                        secondaryAction={<Typography variant="body2">Actions</Typography>}
                    >
                        <Typography>Email</Typography>
                    </ListItem>

                    {filteredTeam.length > 0 ? (
                        filteredTeam.map((user, index) => {
                            return isLoading ? (
                                <TeamUserCardSkeleton index={index} length={filteredTeam.length} />
                            ) : (
                                <TeamUserCard user={user} index={index} length={filteredTeam.length} open={handleOnClick(user)} />
                            );
                        })
                    ) : (
                        <NoTeamCard />
                    )}
                    
                </List>
                <TeamMemberDialog onClose={handleClose} open={open} user={selectedUser}></TeamMemberDialog>
            </Container>
        </Box>
    );
}
