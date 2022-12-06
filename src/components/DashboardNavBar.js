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
import { Divider, Drawer, List, ListItem, ListItemButton, styled } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { MailIcon, InboxOutlined, ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';
import { Stack } from '@mui/system';
import theme from '../theme';
import StickyFooter from './Footer';
import DrawerList from './DrawerList';
import { grey } from '@mui/material/colors';

export default function DashboardNavBar({ children }) {
    const TriggerButton = styled('button')(
        ({ theme }) => `
      line-height: 0.25rem;
      box-sizing: border-box;
      border-radius: 12px;
      padding: 7px;
      background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 120ms;
    
      &:hover {
        background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
        border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
      }
    
      `
    );
    const pages = [
        {
            name: 'Documentation',
            path: '/documentation'
        },
        {
            name: 'About',
            path: '/about'
        }
    ];
    const [isDrawerExpanded, setIsDrawerExpanded] = React.useState(true);
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleCloseDrawer = () => {
        setMobileOpen(!mobileOpen);
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleExpand = () => {
        setIsDrawerExpanded(!isDrawerExpanded);
    };
    const drawerWidth = 220;
    const miniDrawerWidth = 59;
    return (
        <Stack>
            <AppBar
                position="fixed"
                color="transparent"
                elevation={0}
                sx={{
                    borderBottom: 1,
                    borderColor: 'grey.300',
                    backgroundColor: 'white',
                    zIndex: 1201
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
                            <TriggerButton onClick={handleDrawerToggle}>
                                <MenuIcon />
                            </TriggerButton>
                            <Drawer
                                variant="temporary"
                                open={mobileOpen}
                                onClick={handleCloseDrawer}
                                onClose={handleDrawerToggle}
                                ModalProps={{
                                    keepMounted: true
                                }}
                                sx={{
                                    display: {
                                        xs: 'block',
                                        md: 'none'
                                    },
                                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                                }}
                            >
                                <DrawerList isDrawerExpanded={true} />
                            </Drawer>
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
            <Box sx={{ display: 'flex' }}>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: {
                            xs: 'none',
                            md: 'flex'
                        },
                        width: isDrawerExpanded ? drawerWidth : miniDrawerWidth,
                        flexShrink: 0,
                        justifyContent: 'space-between',
                        '& .MuiDrawer-paper': {
                            borderRight: 1,
                            borderColor: grey[300],
                            boxSizing: 'border-box',
                            width: isDrawerExpanded ? drawerWidth : miniDrawerWidth,
                            display: 'flex',
                            justifyContent: 'space-between'
                        }
                    }}
                >
                    <DrawerList isDrawerExpanded={isDrawerExpanded} />
                    <List>
                        <Tooltip title={!isDrawerExpanded ? 'Expand' : null}>
                            <ListItemButton onClick={handleExpand}>
                                <ListItemIcon>{isDrawerExpanded ? <ArrowBackIosNewOutlined /> : <ArrowForwardIosOutlined />}</ListItemIcon>
                                {isDrawerExpanded ? <ListItemText primary={isDrawerExpanded ? 'Minimize' : null} /> : <></>}
                            </ListItemButton>
                        </Tooltip>
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3
                    }}
                >
                    <Toolbar />
                    {children}
                </Box>
            </Box>
        </Stack>
    );
}
