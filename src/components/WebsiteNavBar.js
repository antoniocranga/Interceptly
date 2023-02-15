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
            name: 'Dashboard',
            path: '/dashboard'
        },
        {
            name: 'Account',
            path: '/account'
        },
        {
            name: 'Logout',
            path: '/logout'
        }
    ];
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { logout, isAuthenticated } = useAppContext();
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
            }
            else {
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
                    borderBottom: 1,
                    borderColor: 'grey.300',
                    backdropFilter: 'blur(20px)'
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Logo
                            sx={{
                                display: { xs: 'none', md: 'flex' }
                            }}
                        />
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <StyledMenu pages={pages} />
                        </Box>
                        <Logo
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'flex', md: 'none' }
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
                        <Box sx={{ flexGrow: 0 }}>
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
                                    return setting.path == '/logout' && !isAuthenticated ? <Container key="0"></Container> : 
                                    <MenuItem
                                        key={setting.name}
                                        onClick={createHandleMenuClick(setting.path)}
                                        sx={{
                                            mb: index < settings.length - 1 ? '5px' : 0
                                        }}
                                    >
                                        {setting.name}
                                    </MenuItem>
                                })}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {children}
        </div>
    );
}
