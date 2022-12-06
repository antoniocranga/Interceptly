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
import UnstyledMenuIntroduction from './UnstyledMenu';
import StickyFooter from './Footer';
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
        name: 'Create an account',
        path: '/signup'
    },
    {
        name: 'Dashboard',
        path: '/dashboard'
    }
];

export default function WebsiteNavBar({children}) {
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
                        <UnstyledMenuIntroduction pages={pages} />
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
                        <Tooltip title="Go to dashboard">
                            <IconButton component={Link} href={'/dashboard'} sx={{ p: 0 }}>
                                <Avatar alt="U" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        {children}

        </div>
        
    );
}
