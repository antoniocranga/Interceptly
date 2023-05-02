import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../branding/Logo';
import Link from 'next/link';
import StyledMenu from './StyledMenu';
import StickyFooter from './Footer';
import { useRouter } from 'next/router';
import { useAppContext } from '../utils/AppContext';
import DocumentationSideNav from './DocumentationSideNav';
import { NotificationsOutlined } from '@mui/icons-material';
import { Grid } from '@mui/material';
import NotificationsSection from './notifications/NotificationsSection';

export default function WebsiteNavBar({ children }) {
    const pages = [
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'Documentation',
            path: '/documentation'
        },
        {
            name: 'About',
            path: '/about'
        }
    ];
    const settings = [
        {
            name: '@userEmail'
        },
        {
            name: 'Dashboard',
            path: '/dashboard'
        },
        // {
        //     name: 'Account',
        //     path: '/account'
        // },
        {
            name: 'Logout',
            path: '/logout'
        }
    ];
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { logout, isAuthenticated, appState } = useAppContext();
    const isOpen = Boolean(anchorEl);
    const router = useRouter();
    const handleButtonClick = (event) => {
        if (isOpen) {
            setAnchorEl(null);
        } else {
            setAnchorEl(event.currentTarget);
        }
    };

    const close = () => {
        setAnchorEl(null);
    };

    const createHandleMenuClick = (menuItem) => {
        return () => {
            close();
            if (menuItem == '/logout') {
                logout();
            } else {
                router.push(menuItem);
            }
        };
    };
    return (
        <div>
            <AppBar
                position="sticky"
                color="transparent"
                elevation={0}
                sx={{
                    zIndex: 1201,
                    borderBottom: 1,
                    borderColor: 'grey.300',
                    backdropFilter: 'blur(20px)'
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Grid
                            container
                            alignItems={'center'}
                            sx={{
                                display: {
                                    xs: 'flex',
                                    md: 'none'
                                }
                            }}
                        >
                            <Grid item xs={4} justifyContent={'start'} display="flex">
                                <StyledMenu pages={pages} />
                            </Grid>
                            <Grid item xs={4} justifyContent={'center'} display="flex">
                                <Logo />
                            </Grid>
                            <Grid item xs={4} justifyContent={'end'} display="flex">
                                <NotificationsSection />
                                <IconButton
                                    onClick={handleButtonClick}
                                    aria-controls={isOpen ? 'simple-menu' : undefined}
                                    aria-expanded={isOpen || undefined}
                                    aria-haspopup="menu"
                                >
                                    <Avatar alt="U" />
                                </IconButton>
                                <Menu open={isOpen} onClose={close} anchorEl={anchorEl} aria-label='Dashboard'>
                                    {settings.map((setting, index) => {
                                        if (setting.name == '@userEmail') {
                                            if (isAuthenticated) {
                                                return (
                                                    <MenuItem key={'userEmail'} disabled>
                                                        <Typography variant="body2">{appState.user.email}</Typography>
                                                    </MenuItem>
                                                );
                                            }
                                        } else {
                                            return setting.path == '/logout' && !isAuthenticated ? (
                                                <Box key={index}></Box>
                                            ) : (
                                                <MenuItem key={setting.name} onClick={createHandleMenuClick(setting.path)}>
                                                    {setting.name}
                                                </MenuItem>
                                            );
                                        }
                                    })}
                                </Menu>
                            </Grid>
                        </Grid>
                        <Logo
                            sx={{
                                display: { xs: 'none', md: 'flex' }
                            }}
                        />

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page.name}
                                    variant="plain"
                                    component={Link}
                                    href={page.path}
                                    sx={{
                                        ml: '0.5rem'
                                    }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>
                        <Box
                            sx={{
                                flexGrow: 0,
                                display: {
                                    xs: 'none',
                                    md: 'flex'
                                }
                            }}
                        >
                            <NotificationsSection/>

                            <IconButton
                                onClick={handleButtonClick}
                                aria-controls={isOpen ? 'simple-menu' : undefined}
                                aria-expanded={isOpen || undefined}
                                aria-haspopup="menu"
                            >
                                <Avatar alt="U" />
                            </IconButton>
                            <Menu open={isOpen} onClose={close} anchorEl={anchorEl}>
                                {settings.map((setting, index) => {
                                    if (setting.name == '@userEmail') {
                                        if (isAuthenticated) {
                                            return (
                                                <MenuItem key={'userEmail'} disabled>
                                                    <Typography variant="body2">{appState.user.email}</Typography>
                                                </MenuItem>
                                            );
                                        }
                                    } else {
                                        return setting.path == '/logout' && !isAuthenticated ? (
                                            <Box key={index}></Box>
                                        ) : (
                                            <MenuItem key={setting.name} onClick={createHandleMenuClick(setting.path)}>
                                                {setting.name}
                                            </MenuItem>
                                        );
                                    }
                                })}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {router.asPath.includes('/documentation') ? <DocumentationSideNav>{children}</DocumentationSideNav> : children}
            {!router.asPath.includes('/documentation') && <StickyFooter />}
        </div>
    );
}
