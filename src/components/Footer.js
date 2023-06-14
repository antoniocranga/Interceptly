import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { grey } from '@mui/material/colors';
import { Grid } from '@mui/material';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit" href="https://interceptly.xyz/">
                Interceptly.xyz
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function StickyFooter() {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light' ? theme.palette.background.default : theme.palette.background.dark
            }}
        >
            <Container maxWidth="md">
                <Grid container display="flex" justifyContent={'center'} spacing={2}>
                    <Grid item xs={12} display="flex" justifyContent={'center'}>
                        <Copyright />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container display="flex" justifyContent={'center'} spacing={1}>
                            <Grid item xs={12} sm={'auto'} display="flex" justifyContent={'center'}>
                                <Link href="/">Home</Link>
                            </Grid>
                            <Grid item xs={12} sm={'auto'} display="flex" justifyContent={'center'}>
                                <Link href="/documentation">Documentation</Link>
                            </Grid>
                            <Grid item xs={12} sm={'auto'} display="flex" justifyContent={'center'}>
                                <Link href="/about">About</Link>
                            </Grid>
                            <Grid item xs={12} sm={'auto'} display="flex" justifyContent={'center'}>
                                <Link href="/dashboard">Dashboard</Link>
                            </Grid>
                            <Grid item xs={12} sm={'auto'} display="flex" justifyContent={'center'}>
                                <Link href="/login">Login</Link>
                            </Grid>
                            <Grid item xs={12} sm={'auto'} display="flex" justifyContent={'center'}>
                                <Link href="/signup">Signup</Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
