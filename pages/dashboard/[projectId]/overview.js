import { ContentCopyOutlined, EditOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, CardContent, Divider, Grid, IconButton, InputAdornment, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Container } from '@mui/system';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import Endpoints from '../../../src/api/endpoints';
import OverviewCard from '../../../src/components/dashboard/overview/OverviewCard';
import ProjectCardSkeleton from '../../../src/components/dashboard/skeletons/ProjectCardSkeleton';
import Circle from "react-color/lib/components/circle/Circle";
import ResetApiKeyDialog from '../../../src/components/dashboard/dialogs/ResetApiKeyDialog';
import DeleteProjectDialog from '../../../src/components/dashboard/dialogs/DeleteProjectDialog';

export default function Project() {
    const skeletons = [
        {
            header: 1
        },
        {
            header: 2
        },
        {
            header: 3
        }
    ];
    const router = useRouter();
    const { projectId } = router.query;
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingProject, setIsLoadingProject] = useState(true);
    const [items, setItems] = useState(skeletons);
    const [project, setProject] = useState({});
    const [controller, setController] = useState({
        title: '',
        description: ''
    });

    const [color, setColor] = useState('');
    const [open, setOpen] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const deleteProject = () => {
        if(projectId){
            setIsLoadingProject(true);
            axios.delete(`${Endpoints.projects}`, {
                data:{
                    projectId:  projectId
                }
            }).then((data) => {
                enqueueSnackbar('You will be redirected!', { variant: 'success', autoHideDuration: 3000 });
                setOpenDeleteDialog(false);
                setIsLoadingProject(false);
                router.push("/dashboard");
            }).catch((data) => {
                enqueueSnackbar('An error has occured, please try again', { variant: 'error', autoHideDuration: 3000 });
                setOpenDeleteDialog(false);
                setIsLoadingProject(false);
            });
        }
    };

    const handleChangeColor = (newColor) => {
        if (project.permission == "OWNER") {
            setColor(newColor.hex);
        }
    };

    const handleAllPageLoadings = (value) => {
        setIsLoading(value);
        setIsLoadingProject(value);
    };

    const patchProject = () => {
        if (projectId) {
            setIsLoadingProject(true);
            axios.patch(`${Endpoints.projects}/${projectId}`, {
                title: controller.title,
                description: controller.description,
                color: color
            }).then((data) => {
                enqueueSnackbar('Properties changed successfully', { variant: 'success', autoHideDuration: 3000 });
                setIsLoadingProject(false);
            }).catch((data) => {
                enqueueSnackbar('An error has occured, please try again', { variant: 'error', autoHideDuration: 3000 });
                setIsLoadingProject(false);
            });
        }
    };

    const resetApiKey = () => {
        if (projectId) {
            setOpen(false);
            setIsLoadingProject(true);
            axios.patch(`${Endpoints.projects}/${projectId}/reset-key`).then((data) => {
                console.log(data);
                enqueueSnackbar('API Key regenerated', { variant: 'success', autoHideDuration: 3000 });
                setProject(data.data);
                setOpen(false);
                setIsLoadingProject(false);
                
            }).catch((err) => {
                console.log(err);
                enqueueSnackbar('An error has occured, please try again', { variant: 'error', autoHideDuration: 3000 });
                setProject({});
                setOpen(false);
                setIsLoadingProject(false);
            });
        }
    }

    useEffect(() => {
        setIsLoading(true);
        setIsLoadingProject(true);
        if (projectId) {
            axios.get(`${Endpoints.projects}/${projectId}/overview`).then((data) => {
                setItems(data.data);
                setIsLoading(false);
            }).catch((err) => {
                enqueueSnackbar('An error has occured, you will be redirected', { variant: 'error', autoHideDuration: 3000 });
                setItems([]);
                setIsLoading(false);
            });

            axios.get(`${Endpoints.projects}/${projectId}`).then((data) => {
                data = data.data;
                setProject(data);
                setController({ ...controller, title: data.project.title, description: data.project.description });
                setColor(data.project.color);
                setIsLoadingProject(false);
            }).catch((err) => {
                console.log(err);
                enqueueSnackbar('An error has occured, you will be redirected', { variant: 'error', autoHideDuration: 3000 });
                setProject({});
                setIsLoadingProject(false);
            });
        }
    }, [projectId]);
    const handleCopyClipboard = () => {
        navigator.clipboard.writeText(project.project.apiKey);
        enqueueSnackbar('Content copied to clipboard', { variant: 'success', autoHideDuration: 3000 });
    };
    return (
        <Box sx={{
            backgroundColor: grey[50],
            py: '1rem'
        }}>
            <Container>
                <Typography variant="h6" sx={{
                    fontWeight: 500,
                    mb: '1rem'
                }}>Overview</Typography>
                <Grid container spacing={2}>
                    {items.map((item) => (
                        <Grid item key={item.header} xs={12} sm={6} md={4} lg={4}>
                            {isLoading ? <ProjectCardSkeleton /> : <OverviewCard props={item} />}
                        </Grid>
                    ))}
                </Grid>
                {!isLoadingProject && project.permission != 'VIEW' &&
                    <Stack direction={"column"} sx={{
                        my: '1rem'
                    }} spacing={2}>
                        <ContentBox>
                            <CardContent>
                                <Stack direction={"row"} sx={{
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    mb: '0.5rem'
                                }}>
                                    <ContentTitle>Project API key</ContentTitle>
                                    <Button variant='text' color='info' size="small" href='/documentation/api'>Documentation</Button>
                                </Stack>
                                <ContentSubtitle>The API is secured using an API Key for requests. The API Key binds any request to the project.</ContentSubtitle>
                                <ContentSubtitle>Use this key along with the request.</ContentSubtitle>
                                <Divider sx={{ my: '1rem' }} />
                                <Stack>
                                    <TextField label={"API Key"} value={project.project.apiKey} size="small" disabled fullWidth InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton size='small' onClick={handleCopyClipboard}><ContentCopyOutlined fontSize='small' /></IconButton>
                                            </InputAdornment>
                                        )
                                    }}></TextField>

                                    <ContentCaption>Example: api.interceptly.io/projects?apiKey=?</ContentCaption>
                                </Stack>
                                {project.permission != "VIEW" && <LoadingButton
                                    size="small"
                                    loading={isLoadingProject}
                                    disableElevation
                                    onClick={() => setOpen(true)}
                                    variant="outlined"
                                    color="error"
                                    sx={{
                                        mt: '1.5rem'
                                    }}
                                >
                                    Reset api key
                                </LoadingButton>}
                            </CardContent>
                        </ContentBox>

                        <ContentBox>
                            <CardContent>
                                <Stack direction={"row"} sx={{
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    mb: '0.5rem'
                                }}>
                                    <ContentTitle>Project settings</ContentTitle>
                                    <Typography variant="body1" fontWeight={"500"}></Typography>
                                    {/* <Button variant='text' color='info' size="small">Documentation</Button> */}
                                </Stack>
                                <ContentSubtitle>Change the properties of the project.</ContentSubtitle>
                                <Divider sx={{ my: '1rem' }} />

                                <Stack spacing={2}>
                                    <TextField
                                        id={'title'}
                                        label={"Title"}
                                        size="small"
                                        value={controller.title}
                                        onChange={(event) => setController({ ...controller, title: event.target.value })}
                                        fullWidth
                                        InputProps={{
                                            endAdornment: (
                                                <EditOutlined fontSize='small' color='info' />
                                            )
                                        }}
                                        disabled={project.permission != "OWNER" || isLoadingProject}
                                    />
                                    <TextField
                                        id={'description'}
                                        label={"Description"}
                                        size="small"
                                        value={controller.description}
                                        onChange={(event) => setController({ ...controller, description: event.target.value })}
                                        fullWidth
                                        InputProps={{
                                            endAdornment: (
                                                <EditOutlined fontSize='small' color='info' />
                                            )
                                        }}
                                        disabled={project.permission != "OWNER" || isLoadingProject}
                                    />
                                    <Circle width="100%" onChangeComplete={handleChangeColor}
                                        color={color} />
                                </Stack>
                                <Stack direction={"row"} sx={{
                                    alignItems: "end",
                                    justifyContent: "space-between"
                                }}>
                                    <LoadingButton
                                        size="small"
                                        disabled={project.permission != "OWNER"}
                                        loading={isLoadingProject}
                                        disableElevation
                                        onClick={patchProject}
                                        variant="outlined"
                                        sx={{
                                            mt: '1.5rem'
                                        }}
                                    >
                                        Submit changes
                                    </LoadingButton>
                                    <Box display={"flex"}>
                                        <ContentCaption tooltip={"The ID of the project"}>{project.project.id}</ContentCaption>
                                        <Divider orientation="vertical" variant="middle" flexItem sx={{
                                            mx: '0.3rem'
                                        }} />
                                        <ContentCaption tooltip={"The date when the project was created"}>{new Date(project.project.createdAt).toUTCString()}</ContentCaption>
                                    </Box>
                                </Stack>
                                <Divider sx={{
                                    my: '1rem'
                                }}/>
                            <Stack display="flex" direction="row" justifyContent={"end"}>
                                <Button color="error" size="small" onClick={() => setOpenDeleteDialog(true)}>Delete project</Button>
                            </Stack>
                            </CardContent>
                        </ContentBox>
                        {project.permission == "OWNER" && <ResetApiKeyDialog
                            onClose={() => setOpen(false)}
                            open={open}
                            onReset={resetApiKey}
                        />}
                        {project.permission == "OWNER" && <DeleteProjectDialog
                            onClose={() => setOpenDeleteDialog(false)}
                            open={openDeleteDialog}
                            onReset={deleteProject}
                        />}
                    </Stack>}
            </Container>
        </Box>
    );
}

function ContentBox({ children }) {
    return <Box sx={{
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: grey[300],
        width: "100%"
    }}>
        {children}
    </Box>
};

function ContentTitle({ children }) {
    return <Typography variant="body1" fontWeight={"500"}>{children}</Typography>
}

function ContentSubtitle({ children }) {
    return <Typography variant="body2" color={grey[600]}>{children}</Typography>
}

function ContentCaption({ tooltip, children }) {
    return <Tooltip title={tooltip} arrow placement='top'><Typography variant="caption" color={grey[600]}>{children}</Typography></Tooltip>
}