import { Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Endpoints from '../../src/api/endpoints';
import NewProjectCard from '../../src/components/dashboard/NewProjectCard';
import ProjectCard from '../../src/components/dashboard/ProjectCard';
import { useSnackbar } from 'notistack';
import ProjectCardSkeleton from '../../src/components/dashboard/skeletons/ProjectCardSkeleton';
import { useAppContext } from '../../src/utils/AppContext';
import Head from 'next/head';
const skeletons = [
    {
        project: {
            id: 1
        }
    },
    {
        project: {
            id: 2
        }
    },
    {
        project: {
            id: 3
        }
    }
];

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [projects, setProjects] = useState(skeletons);
    const { enqueueSnackbar } = useSnackbar();
    const { appState } = useAppContext();
    useEffect(() => {
        axios
            .get(Endpoints.projects)
            .then((data) => {
                setProjects(data.data);
                setIsLoading(false);
            })
            .catch((err) => {
                enqueueSnackbar('An error has occured, please refresh the page!', { variant: 'error', autoHideDuration: 3000 });
                setProjects([]);
                setIsLoading(false);
            });
    }, [appState]);
    return (
        <Grid
            container
            spacing={2}
            sx={{
                padding: '12px',
                alignItems: 'stretch'
            }}
        >
            <Head>
                <title></title>
                <meta
                    name="description"
                    content={
                        'Interceptly.xyz is a cloud based error tracker solution that helps developers to monitor and debug projects within two clicks.'
                    }
                />
            </Head>
            {projects.map((project) => (
                <Grid key={project.project.id} item xs={12} sm={6} md={4} lg={3}>
                    {isLoading ? <ProjectCardSkeleton /> : <ProjectCard props={project.project} />}
                </Grid>
            ))}
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <NewProjectCard />
            </Grid>
        </Grid>
    );
}
