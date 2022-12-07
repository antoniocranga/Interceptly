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
import { Divider, Drawer, List, ListItem, ListItemButton, styled } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { MailIcon, InboxOutlined, ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';
import { Stack } from '@mui/system';
import theme from '../theme';
import StickyFooter from './Footer';
import DrawerList from './DrawerList';
import { grey } from '@mui/material/colors';
import { useRouter } from 'next/router';

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
    const drawerWidth = 220;
    const miniDrawerWidth = 59;
    const settings = [
        {
            name: 'Dashboard',
            path: '/dashboard'
        },
        {
            name: 'Account',
            path: '/account'
        }
    ];
    const [isDrawerExpanded, setIsDrawerExpanded] = React.useState(true);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isOpen = Boolean(anchorEl);
    const router = useRouter();

    const handleCloseDrawer = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleExpand = () => {
        setIsDrawerExpanded(!isDrawerExpanded);
    };

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
            router.push(menuItem);
        };
    };
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
                                    '& .MuiDrawer-paper': {
                                        borderRight: '1px solid',
                                        borderColor: grey[300],

                                        boxSizing: 'border-box',
                                        width: drawerWidth
                                    }
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
                            <IconButton
                                onClick={handleButtonClick}
                                aria-controls={isOpen ? 'simple-menu' : undefined}
                                aria-expanded={isOpen || undefined}
                                aria-haspopup="menu"
                            >
                                <Avatar alt="U" />
                            </IconButton>
                            <Menu open={isOpen} onClose={close} anchorEl={anchorEl}>
                                {settings.map((setting, index) => (
                                    <MenuItem
                                        key={setting.name}
                                        onClick={createHandleMenuClick(setting.path)}
                                        sx={{
                                            mb: index < settings.length - 1 ? '5px' : 0
                                        }}
                                    >
                                        {setting.name}
                                    </MenuItem>
                                ))}
                            </Menu>
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
                        <Tooltip title={!isDrawerExpanded ? 'Expand' : null} arrow placement="right">
                            <ListItemButton
                                onClick={handleExpand}
                                sx={{
                                    margin: isDrawerExpanded ? '0px 8px 6px 8px' : null,
                                    borderRadius: isDrawerExpanded ? '8px' : null
                                }}
                            >
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
