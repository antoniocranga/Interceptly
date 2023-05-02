import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';
import Head from 'next/head';

export default function About() {
    return (
        <Container maxWidth="sm">
            <Head>
                <title>Login | Interceptly</title>
                <meta name="author" content={"Crangă Antonio-Cristian <antocranga@gmail.com>"}></meta>
                <meta
                    name="description"
                    content={
                        'Interceptly.xyz is a cloud based error tracker solution that helps developers to monitor and debug projects within two clicks.'
                    }
                />
            </Head>
            <Box sx={{ my: 4 }} display='flex' flexDirection={'column'} alignItems='center'>
                <Typography variant="h6" align='center'> 
                    Coming soon...
                </Typography>
                <Button variant="outlined" href="/" sx={{
                    mt: '2rem'
                }}>Back home</Button>
            </Box>
        </Container>
    );
}
