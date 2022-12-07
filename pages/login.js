import { Button, Divider, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import Link from 'next/link';
import AuthCard from '../src/components/authentication/AuthCard';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import MeshGradient from '../src/branding/backgrounds/MeshGradient';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import theme from '../src/theme';
import { grey } from '@mui/material/colors';
import SocialAuthButton from '../src/components/buttons/SocialAuthButton';

export default function Login() {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    const [isLoading, setIsLoading] = useState(false);
    const [isObscure, setIsObscure] = useState(true);
    const handlePasswordClick = () => {
        setIsObscure(!isObscure);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const data = {
            email: event.target.email.value,
            password: event.target.password.value
        };
        const JSONdata = JSON.stringify(data);
        await delay(5000);
        console.log(JSONdata);
        // const endpoint = "/"
        // const options = {
        //     method: 'POST',
        //     headers: {},
        //     body: JSONdata
        // }
        // const response = await fetch(endpoint, options)
        // const result = await response.json()
        setIsLoading(false);
    };
    return (
        <MeshGradient>
            <Box display="flex" justifyContent="center" component="form" onSubmit={onSubmit}>
                <AuthCard>
                    <Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6">Login</Typography>
                            <Link
                                href="/signup"
                                style={{
                                    textDecoration: 'none',
                                    color: theme.palette.primary.main,
                                    fontSize: '14px'
                                }}
                            >
                                {' '}
                                Don't have an account?
                            </Link>
                        </Stack>
                        <Typography
                            variant="caption"
                            color={grey[500]}
                            sx={{
                                mt: '0.5rem'
                            }}
                        >
                            Enter your credentials to access the dashboard
                        </Typography>
                        <Typography variant="body2" sx={{ mt: '1rem' }}>
                            Email address*
                        </Typography>
                        <TextField disabled={isLoading} fullWidth required id="email" size="small" type="email"></TextField>
                        <Typography variant="body2" sx={{ mt: '1rem' }}>
                            Password*
                        </Typography>
                        <TextField
                            disabled={isLoading}
                            fullWidth
                            required
                            id="password"
                            size="small"
                            type={isObscure ? 'password' : 'text'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton disabled={isLoading} onClick={handlePasswordClick} edge="end">
                                            {isObscure ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        ></TextField>
                        <Grid
                            container
                            justifyContent="flex-end"
                            sx={{
                                mt: '1rem'
                            }}
                        >
                            <Link
                                href="/forgot-password"
                                style={{
                                    textDecoration: 'none',
                                    color: theme.palette.primary.main,
                                    fontSize: '14px'
                                }}
                            >
                                {' '}
                                Forgot password?
                            </Link>
                        </Grid>
                        <LoadingButton
                            size="large"
                            loading={isLoading}
                            disableElevation
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: '1.5rem'
                            }}
                        >
                            Login
                        </LoadingButton>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                my: '1.5rem'
                            }}
                        >
                            <Divider
                                sx={{
                                    flexGrow: 1,
                                    color: grey[300]
                                }}
                            />
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    mx: '1rem',
                                    color: grey[500]
                                }}
                            >
                                or
                            </Typography>
                            <Divider sx={{ flexGrow: 1, color: grey[300] }} />
                        </Box>
                        <SocialAuthButton></SocialAuthButton>
                    </Stack>
                </AuthCard>
            </Box>
        </MeshGradient>
    );
}
