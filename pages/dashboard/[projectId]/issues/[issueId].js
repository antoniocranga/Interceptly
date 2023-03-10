import {
    AddOutlined,
    CheckBox,
    CheckOutlined,
    DownloadOutlined,
    GroupAdd,
    KeyboardArrowDownOutlined,
    RemoveOutlined
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    CardContent,
    Chip,
    Collapse,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Menu,
    MenuItem,
    Stack,
    TablePagination,
    TextField,
    Tooltip,
    Typography,
    useMediaQuery
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { alpha, Container } from '@mui/system';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Endpoints from '../../../../src/api/endpoints';
import TeamMemberDialog from '../../../../src/components/dashboard/dialogs/TeamMemberDialog';
import CommentsSection from '../../../../src/components/dashboard/issues/CommentsSection';
import EventCard from '../../../../src/components/dashboard/issues/events/EventCard';
import theme from '../../../../src/theme';

export default function Issue() {
    const router = useRouter();
    const { projectId, issueId } = router.query;

    const [pagination, setPagination] = useState({
        page: 0
    });
    const [issue, setIssue] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [collapsed, setCollapsed] = useState(false);
    const isSmall = useMediaQuery(theme.breakpoints.only('xs'));
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
    const [permissions, setPermissions] = useState([]);
    const [permissionsFilter, setPermissionsFilter] = useState([]);
    const [collaborators, setCollaborators] = useState([]);
    const [collaborationAnchorEl, setCollaborationAnchorEl] = useState(null);
    const isCollaborationMenuOpen = Boolean(collaborationAnchorEl);
    const [comments, setComments] = useState([]);
    const handleCollaborationMenu = (event) => {
        if (isCollaborationMenuOpen) {
            setCollaborationAnchorEl(null);
        } else {
            setCollaborationAnchorEl(event.currentTarget);
        }
    };
    const closeCollaborationMenu = () => {
        setCollaborationAnchorEl(null);
    };
    // const [openDialog, setOpenDialog] = useState(false);
    // const handleOnClick = () => {
    //     setOpenDialog(true);
    // };
    // const handleClose = () => {
    //     setOpenDialog(false);
    // };

    const updateStatus = (status) => () => {
        axios
            .patch(`${Endpoints.projects}/${projectId}/issues`, {
                ids: [issueId],
                status: status
            })
            .then((data) => {
                setAnchorEl(null);
                router.reload();
            })
            .catch((err) => {
            });
    };

    const changePage = (event, newPage) => {
        setPagination({ ...pagination, page: newPage });
    };

    const changeSize = (event) => {
        setPage(0);
        setSize(event.target.value);
    };
    const formatedDate = (date) => {
        date = date+'Z';
        return new Date(date).toLocaleString();
    };
    const actions = [
        {
            label: 'Ignore',
            description: '',
            value: 'IGNORED'
        },
        {
            label: 'Block',
            description: '',
            value: 'BLOCKED'
        },
        {
            label: 'Active',
            description: '',
            value: 'ACTIVE'
        }
    ];
    const handleCollapsed = () => {
        setCollapsed((prev) => !prev);
    };
    useEffect(() => {
        if (!projectId || !issueId) {
            return;
        }
        router.replace({
            path: `/dashboard/[projectId]/issues/[issueId]`,
            query: {
                projectId: projectId,
                issueId: issueId,
                page: pagination.page
            }
        });
        axios
            .get(`${Endpoints.projects}/${projectId}/issues/${issueId}`, {
                params: {
                    page: pagination.page
                }
            })
            .then((data) => {
                data = data.data;
                setIssue(data);
                setCollaborators(data.collaborators);
                setComments(data.comments);
                setIsLoading(false);
            })
            .catch((err) => {
                // router.reload();
                // setIsLoading(false);
            });
        axios
            .get(`${Endpoints.projects}/${projectId}/permissions`)
            .then((data) => {
                data = data.data;
                setPermissions(data);
                setPermissionsFilter(data);
            })
            .catch((err) => {
                // router.reload();
            });
    }, [pagination, projectId, issueId]);
    const handleCollaborationUsers = (event) => {
        setPermissionsFilter(permissions.filter((user) => user.email.startsWith(event.target.value)));
    };

    const addCollaborator = (user) => () => {
        axios
            .post(`${Endpoints.projects}/issues/collaborations`, {
                email: user.email,
                projectId: projectId,
                issueId: issueId
            })
            .then((data) => {
                setCollaborators([
                    ...collaborators,
                    {
                        userId: user.id,
                        email: user.email
                    }
                ]);
            })
            .catch((err) => {});
    };

    const removeCollaborator = (user) => () => {
        axios
            .delete(`${Endpoints.projects}/issues/collaborations`, {
                data: {
                    email: user.email,
                    projectId: projectId,
                    issueId: issueId
                }
            })
            .then((data) => {
                setCollaborators(collaborators.filter((collab) => collab.userId != user.id));
            })
            .catch((err) => {});
    };
    const exportIssue = () => {
        axios
            .get(`${Endpoints.export}/events/excel`, {
                params: {
                    projectId: projectId,
                    issueId: issueId
                },
                responseType: 'arraybuffer'
            })
            .then((data) => {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(new Blob([data.data]));
                link.setAttribute('download', `interceptly_events_project${projectId}_issue${issueId}.xlsx`);
                document.body.appendChild(link);
                link.click();
            })
            .catch((err) => {});
    };
    return (
        <Box
            sx={{
                backgroundColor: grey[50],
                py: '1rem'
            }}
        >
            <Container>
                {!isLoading && issue && (
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={8}>
                            <Stack spacing={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Stack direction={'row'} spacing={1}>
                                            <LabelItem color={theme.palette.warning.main}>{issue.type}</LabelItem>
                                            <LabelItem color={theme.palette.info.main}>{issue.status}</LabelItem>
                                        </Stack>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: {
                                                xs: 'space-between',
                                                sm: 'end'
                                            }
                                        }}
                                    >
                                        <ButtonGroup
                                            disableElevation
                                            variant="outlined"
                                            size="small"
                                            color={'primary'}
                                            disabled={isLoading}
                                        >
                                            <Button startIcon={<CheckOutlined />} onClick={updateStatus('RESOLVED')}>
                                                Resolve
                                            </Button>
                                            <Button
                                                onClick={handleButtonDropdown}
                                                aria-controls={isOpen ? 'simple-menu' : undefined}
                                                aria-expanded={isOpen || undefined}
                                                aria-haspopup="menu"
                                            >
                                                <KeyboardArrowDownOutlined />
                                            </Button>
                                        </ButtonGroup>
                                        <Menu open={isOpen} onClose={close} anchorEl={anchorEl}>
                                            {actions.map((action, index) => (
                                                <MenuItem
                                                    key={action.value}
                                                    onClick={updateStatus(action.value)}
                                                    sx={{
                                                        mb: index < actions.length - 1 ? '5px' : 0
                                                    }}
                                                >
                                                    {action.label}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                        <ButtonGroup>
                                            <Tooltip title="Manage collaborations">
                                                <IconButton sx={{ ml: '0.5rem' }} onClick={handleCollaborationMenu}>
                                                    <GroupAdd color="disabled" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Export all events from this issue as Excel file">
                                                <IconButton sx={{ ml: '0.5rem' }} onClick={exportIssue}>
                                                    <DownloadOutlined color="disabled" />
                                                </IconButton>
                                            </Tooltip>
                                        </ButtonGroup>
                                        <Menu
                                            open={isCollaborationMenuOpen}
                                            onClose={closeCollaborationMenu}
                                            anchorEl={collaborationAnchorEl}
                                            PaperProps={{ sx: { width: '350px' } }}
                                        >
                                            <Box
                                                sx={{
                                                    mx: '1rem',
                                                    mb: '1rem'
                                                }}
                                            >
                                                <Stack direction="row" justifyContent="space-between" alignItems={'center'}>
                                                    <Typography variant="body1" fontWeight={500}>
                                                        Assign issue
                                                    </Typography>
                                                    <Button size="small" href={`/dashboard/${projectId}/team`}>
                                                        Add members
                                                    </Button>
                                                </Stack>
                                                <Typography variant="caption">Assign an issue to a team member.</Typography>
                                            </Box>
                                            <TextField
                                                size="small"
                                                id={'collaboration-input-textfield'}
                                                key={'collaboration-input-textfield'}
                                                fullWidth
                                                sx={{
                                                    backgroundColor: 'white',
                                                    borderRadius: '8px'
                                                }}
                                                type="email"
                                                placeholder="Search by email address"
                                                onChange={handleCollaborationUsers}
                                            />
                                            <List
                                                disablePadding
                                                sx={{
                                                    mt: '1rem'
                                                }}
                                            >
                                                {permissionsFilter.slice(0, 5).map((user) => {
                                                    return (
                                                        <ListItem
                                                            disablePadding
                                                            key={user.id}
                                                            secondaryAction={
                                                                !collaborators.find((collab) => collab.userId == user.id) ? (
                                                                    <AddOutlined fontSize="small" color="primary" />
                                                                ) : (
                                                                    <RemoveOutlined fontSize="small" color="error" />
                                                                )
                                                            }
                                                        >
                                                            <ListItemButton
                                                                selected={collaborators.find((collab) => collab.userId == user.id)}
                                                                sx={{
                                                                    borderRadius: '8px'
                                                                }}
                                                                onClick={
                                                                    collaborators.find((collab) => collab.userId == user.id)
                                                                        ? removeCollaborator(user)
                                                                        : addCollaborator(user)
                                                                }
                                                            >
                                                                <ListItemText primary={user.email} />
                                                            </ListItemButton>
                                                        </ListItem>
                                                    );
                                                })}
                                            </List>
                                        </Menu>
                                    </Grid>
                                </Grid>
                                <Box>
                                    <Grid
                                        container
                                        spacing={1}
                                        sx={{
                                            mb: '1rem'
                                        }}
                                    >
                                        {collaborators &&
                                            collaborators.map((collaborator) => {
                                                return (
                                                    <Grid item key={collaborator.id}>
                                                        <Chip
                                                            variant="outlined"
                                                            color="info"
                                                            avatar={<Avatar>{collaborator.email[0]}</Avatar>}
                                                            label={collaborator.email.split('@')[0]}
                                                        ></Chip>
                                                    </Grid>
                                                );
                                            })}
                                    </Grid>
                                    <Stack direction={'row'} spacing={1}>
                                        <Typography variant="body2">Issue Id: </Typography>
                                        <Typography variant="body2" color={theme.palette.primary.main}>
                                            {issue.id}
                                        </Typography>
                                    </Stack>
                                    <Typography
                                        variant={'h6'}
                                        sx={{
                                            mb: '0.5rem'
                                        }}
                                    >
                                        {issue.title}
                                    </Typography>
                                    <Collapse in={collapsed} collapsedSize={40}>
                                        <Typography variant={'body2'}>{issue.description}</Typography>
                                    </Collapse>
                                    {issue.description.length > 60 && (
                                        <Stack
                                            direction={'row'}
                                            sx={{
                                                justifyContent: 'end'
                                            }}
                                        >
                                            <Button variant="text" size="small" onClick={handleCollapsed}>
                                                {collapsed ? 'See less' : 'See more'}
                                            </Button>
                                        </Stack>
                                    )}
                                </Box>
                                <ContentBox>
                                    <CardContent>
                                        <Grid container spacing={2}>
                                            {[
                                                { date: issue.createdAt, label: 'Created at' },
                                                { date: issue.updatedAt, label: 'Updated at' },
                                                { date: issue.lastSeen, label: 'Last seen' }
                                            ].map((value, index) => (
                                                <Grid item key={`dates-${index}`} xs={12} sm={6} md={4}>
                                                    <TextField
                                                        value={formatedDate(value.date)}
                                                        fullWidth
                                                        size="small"
                                                        disabled
                                                        label={value.label}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </CardContent>
                                </ContentBox>
                                <ContentBox>
                                    <CardContent>
                                        <ContentTitle>Event: {issue.events.content[0].id}</ContentTitle>
                                        <Divider />
                                        <List>
                                            {issue.events.content.map((event) => (
                                                <EventCard event={event} />
                                            ))}
                                        </List>
                                        <TablePagination
                                            component={'div'}
                                            count={issue.events.totalElements}
                                            page={pagination.page}
                                            rowsPerPage={1}
                                            rowsPerPageOptions={[]}
                                            onPageChange={changePage}
                                            onRowsPerPageChange={changeSize}
                                            labelRowsPerPage={'Issues per page'}
                                        />
                                    </CardContent>
                                </ContentBox>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <ContentBox>
                                <CardContent>
                                    <CommentsSection issueComments={issue.comments} />
                                </CardContent>
                            </ContentBox>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </Box>
    );
}

function LabelItem({ color, children }) {
    return (
        <Typography
            variant={'body2'}
            sx={{
                border: '1px solid',
                borderColor: color,
                backgroundColor: alpha(color, 0.1),
                px: '1rem',
                borderRadius: '100px',
                fontWeight: '500'
            }}
        >
            {children}
        </Typography>
    );
}

function ContentBox({ children }) {
    return (
        <Box
            sx={{
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: grey[300],
                width: '100%'
            }}
        >
            {children}
        </Box>
    );
}

function ContentTitle({ children }) {
    return (
        <Typography variant="body1" fontWeight={'500'}>
            {children}
        </Typography>
    );
}

function ContentSubtitle({ children }) {
    return (
        <Typography variant="body2" color={grey[600]}>
            {children}
        </Typography>
    );
}

function ContentCaption({ tooltip, children }) {
    return (
        <Tooltip title={tooltip} arrow placement="top">
            <Typography variant="caption" color={grey[600]}>
                {children}
            </Typography>
        </Tooltip>
    );
}
