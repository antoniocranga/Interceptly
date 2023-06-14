import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';

export default function About() {
    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }} display='flex' flexDirection={'column'} alignItems='center'>
                <Typography variant="h6" align='center'> 
                    Coming soon...
                </Typography>
                <Button variant="outlined" href="/" sx={{
                    mt: '2rem'
                }}>Back to home</Button>
            </Box>
        </Container>
    );
}
