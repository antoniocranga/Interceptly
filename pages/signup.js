import { Button, Divider, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import Link from 'next/link';
import AuthCard from '../src/components/authentication/AuthCard';
import { useEffect, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import MeshGradient from '../src/branding/backgrounds/MeshGradient';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import theme from '../src/theme';
import { grey } from '@mui/material/colors';
import SocialAuthButton from '../src/components/buttons/SocialAuthButton';
import { strengthColor, strengthIndicator } from '../src/utils/validators/password_validator';
import { useAppContext } from '../src/utils/AppContext';
import { useRouter } from 'next/router';
import Head from 'next/head';
export default function Signup() {
    const router = useRouter();
    const [level, setLevel] = useState();
    const [isObscure, setIsObscure] = useState(true);
    const { isLoading, register, isAuthenticated, appState } = useAppContext();
    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
    };

    const handlePasswordClick = () => {
        setIsObscure(!isObscure);
    };

    useEffect(() => {
        changePassword('');
        if (!isLoading && isAuthenticated) {
            router.push("/dashboard");
        }
    }, [isLoading, isAuthenticated, appState]);

    const onSubmit = async (event) => {
        event.preventDefault();
        register(event.target.email.value, event.target.password.value, event.target.first_name.value, event.target.last_name.value);
    };
    return (
        <MeshGradient>
            <Head>
                <title>Sign up | Interceptly</title>
                <meta
                    name="description"
                    content={
                        'Interceptly.xyz is a cloud based error tracker solution that helps developers to monitor and debug projects within two clicks.'
                    }
                />
            </Head>
            <Box display="flex" justifyContent="center" component="form" onSubmit={onSubmit}>
                <AuthCard>
                    <Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6">Sign up</Typography>
                            <Link
                                href="/login"
                                style={{
                                    textDecoration: 'none',
                                    color: theme.palette.primary.main,
                                    fontSize: '14px'
                                }}
                            >
                                {' '}
                                Already have an account?
                            </Link>
                        </Stack>
                        <Typography
                            variant="caption"
                            color={grey[500]}
                            sx={{
                                mt: '0.5rem'
                            }}
                        >
                            Create an account
                        </Typography>
                        <Stack direction="row">
                            <Stack
                                sx={{
                                    mr: '0.5rem'
                                }}
                            >
                                <Typography variant="body2" sx={{ mt: '1rem' }}>
                                    First name*
                                </Typography>
                                <TextField disabled={isLoading} required id="first_name" size="small" type="text" name="first_name"></TextField>
                            </Stack>
                            <Stack
                                sx={{
                                    ml: '0.5rem'
                                }}
                            >
                                <Typography variant="body2" sx={{ mt: '1rem' }}>
                                    Last name*
                                </Typography>
                                <TextField id="last_name" size="small" required type="text" name="last_name"></TextField>
                            </Stack>
                        </Stack>
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
                            onChange={(e) => {
                                changePassword(e.target.value);
                            }}
                        ></TextField>
                        <Grid container spacing={1} alignItems="center" sx={{ mt: '0.1rem' }}>
                            <Grid item>
                                <Box sx={{ bgcolor: level?.color, width: 80, height: 8, borderRadius: '7px' }} />
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" fontSize="0.75rem">
                                    {level?.label}
                                </Typography>
                            </Grid>
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
                            Sign up
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
