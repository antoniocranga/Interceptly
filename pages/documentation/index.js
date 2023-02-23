import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import theme from '../../src/theme';
import { grey } from '@mui/material/colors';
import { useRouter } from 'next/router';

export default function Docs() {
    const items = [
        {
            title: 'Getting started',
            subtitle: 'Basic setup for Interceptly',
            path: '/documentation/getting-started'
        },
        {
            title: 'API Reference',
            subtitle: 'All the endpoints you can request and their configuration',
            path: '/documentation/api'
        }
    ];
    const router = useRouter();
    const handleRoute = (path) => () => {
        router.push(path);
    };
    return (
        <Box>
            <Typography variant="h4">Quick reference</Typography>
            <Grid container spacing={2} sx={{ mt: '1rem' }}>
                {items.map((item, index) => {
                    return (
                        <Grid item key={item.label} xs={12}>
                            <Card
                                onClick={handleRoute(item.path)}
                                elevation={0}
                                sx={{
                                    ':hover': {
                                        boxShadow: theme.custom.customBoxShadow,
                                        borderColor: theme.palette.primary.main
                                    },
                                    border: '1px solid',
                                    borderColor: grey[300]
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6">{item.title}</Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: grey[700]
                                        }}
                                    >
                                        {item.subtitle}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}
