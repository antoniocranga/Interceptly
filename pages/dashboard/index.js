import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import NewProjectCard from '../../src/components/dashboard/NewProjectCard';
import ProjectCard from '../../src/components/dashboard/ProjectCard';

const projects = [
    {
        name: 'Project 1',
        id: '1'
    },
    {
        name: 'Project 2',
        id: '2'
    },
    {
        name: 'Project 3',
        id: '3'
    }
];

export default function Dashboard() {
    return (
        <Grid container spacing={2} sx={{
            padding: '12px',
            alignItems: 'stretch'
        }}>
            {projects.map((project) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <ProjectCard 
                    key={project.id}
                    props={project} />
                </Grid>
            ))}
            <Grid item xs={12} sm={6} md={4} lg={3}>
                    <NewProjectCard/>
                </Grid>
        </Grid>
    );
}
