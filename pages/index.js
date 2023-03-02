import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SyntaxHighlight from '../src/utils/SyntaxHighlight';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import Endpoints from '../src/api/endpoints';
import { Button, Card, CardContent, Grid, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import theme from '../src/theme';

export default function Index({ stats }) {
    const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("lg"));
  const tablet = useMediaQuery(theme.breakpoints.up("sm"));
  const mobile = useMediaQuery(theme.breakpoints.up("xs"));
  const sizes = () => {
    if (desktop) return "large";
    if (tablet) return "large";
    if (mobile) return "medium";
  };
    const code = `
  try{
    //do some work
  }catch(e){
    //call Interceptly
  }
  `;
    return (
        <Container maxWidth="md">
            <Toolbar/>
            <Typography variant="h3" fontWeight={700} align="center" mb={2}>
                Application Performance Monitoring
            </Typography>
            <Typography variant="body2" align="center" color={grey[700]}>
                Interceptly is an Application Performance Monitoring tool that helps developers to log issues and events and easily
                visualize them.
            </Typography>
            <Stack direction="row" justifyContent={'center'} spacing={2} mt={4}>
                <Button variant="contained" disableElevation size={sizes()} href="signup">
                    Try it for free
                </Button>
                <Button variant="outlined" size={sizes()} href="/documentation">
                    Go to documentation
                </Button>
            </Stack>
            <Box
                sx={{
                    mt: 6,
                    pre: {
                        border: '1px solid',
                        borderRadius: '8px',
                        borderColor: grey[300],
                        background: grey[100]
                    }
                }}
            >
                <SyntaxHighlight>{code}</SyntaxHighlight>
            </Box>
            <Box>
                <Typography variant="h6" mb={2}>
                    Live stats
                </Typography>
                <Grid container height="100%" spacing={2}>
                    <Grid item xs={6} sm={3}>
                        <StatBox title="Events" value={stats.eventsCount} />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <StatBox title="Issues" value={stats.issuesCount} />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <StatBox title="Projects" value={stats.projectsCount} />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <StatBox title="Users" value={stats.usersCount} />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

function StatBox({ title, value }) {
    return (
        <Card
            elevation={0}
            sx={{
                height: '100%',
                border: '1px solid',
                borderColor: grey[300],
                ':hover': {
                    boxShadow: theme.custom.customBoxShadow,
                    borderColor: theme.palette.primary.main,
                    cursor: 'pointer'
                }
            }}
        >
            <CardContent>
                <Typography variant="body2" color={grey[500]}>
                    {title}
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                    {value}
                </Typography>
            </CardContent>
        </Card>
    );
}

export async function getStaticProps() {
    const response = await fetch(Endpoints.baseUrl + Endpoints.stats);
    const stats = await response.json();
    return {
        props: {
            stats
        }
    };
}
