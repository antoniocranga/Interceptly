import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { grey } from '@mui/material/colors';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit" href="https://interceptly.io/">
                Interceptly.io
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
                <Typography variant="body1">My sticky footer can be found here.</Typography>
                <Copyright />
            </Container>
        </Box>
    );
}
