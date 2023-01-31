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
import { MailIcon, InboxOutlined, ArrowBackIosNewOutlined, ArrowForwardIosOutlined, MailOutline, FolderCopyOutlined, ChevronRightOutlined, ChevronLeftOutlined, BugReportOutlined, AnalyticsOutlined } from '@mui/icons-material';
import { Stack } from '@mui/system';
import theme from '../theme';
import StickyFooter from './Footer';
import DrawerList from './DrawerList';
import { grey } from '@mui/material/colors';
import { useRouter } from 'next/router';
import { useAppContext } from '../utils/AppContext';
import MuiDrawer from '@mui/material/Drawer';

export default function DashboardNavBar({ children }) {
    const router = useRouter();
    const paths = router.asPath.split('/');
    const projectId = paths[2];
    const activeScreen = paths[paths.length - 1];

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
    const drawerWidth = 180;
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
    const drawerItems = [
        {
            name: 'Overview',
            icon: FolderCopyOutlined,
            path: `/dashboard/${projectId}`
        },
        {
            name: 'Issues',
            icon: BugReportOutlined,
            path: `/dashboard/${projectId}/issues`
        },
        {
            name: 'Statistics',
            icon: AnalyticsOutlined,
            path: `/dashboard/${projectId}/statistics`
        },
    ];
    const allItems = [
        {
            name: 'Overview',
            icon: FolderCopyOutlined,
            path: `/dashboard/${projectId}`
        },
        {
            name: 'Issues',
            icon: BugReportOutlined,
            path: `/dashboard/${projectId}/issues`
        },
        {
            name: 'Statistics',
            icon: AnalyticsOutlined,
            path: `/dashboard/${projectId}/statistics`
        },
        {
            name: 'space',
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

    const [isDrawerExpanded, setIsDrawerExpanded] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { logout, isAuthenticated } = useAppContext();
    const isOpen = Boolean(anchorEl);

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
            if (menuItem == '/logout') {
                logout();
            }
            else {
                router.push(menuItem);
            }
        };
    };

    const handleRoute = (path) => {
        return () => {
            router.push(path);
        }
    }

    const openedMixin = (theme) => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    });

    const closedMixin = (theme) => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
    });
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));
    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            ...(open && {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
            }),
            ...(!open && {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            }),
        }),
    );
    return (
        <Box sx={{
            display: "flex"
        }}>
            <AppBar
                position="fixed"
                color="transparent"
                elevation={0}
                open={isDrawerExpanded}
                sx={{
                    borderBottom: 1,
                    borderColor: 'grey.300',
                    backgroundColor: 'white',
                    zIndex: 1201
                }}
            >
                <Toolbar>
                    <Logo
                        sx={{
                            display: { xs: 'none', md: 'flex' }
                        }}
                    />
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <StyledMenu pages={allItems} />
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
                                return setting.path == '/logout' && !isAuthenticated ? <Container key="0"></Container> : <MenuItem
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
            </AppBar>
            <Drawer
                variant="permanent"
                open={isDrawerExpanded}
                sx={{
                    display: {
                        xs: 'none',
                        md: !router.pathname.includes("/create-project") ? 'flex' : 'none'
                    },
                    '& .MuiDrawer-paper': {
                        borderRight: 1,
                        borderColor: grey[300],
                    }
                }}
            >
                <DrawerHeader>
                    <IconButton onClick={handleExpand}>
                        {theme.direction === 'rtl' ? <ChevronRightOutlined /> : <ChevronLeftOutlined />}
                    </IconButton>
                </DrawerHeader>

                <List>
                    {drawerItems.map((item) => {
                        return item.name == 'space' ? <Box height={'1rem'} /> :
                            <ListItem key={item.name} disablePadding  sx={{ display: 'block' }}>
                                <Tooltip key={item.name} title={!isDrawerExpanded ? item.name : null} arrow placement="right">
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: 0 ? 'initial' : 'center',
                                            px: 2.5,
                                            m: 1,
                                            borderRadius: '8px'
                                        }}
                                        selected={item.path.split('/').slice(-1)[0] == activeScreen}

                                        onClick={handleRoute(item.path)}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: isDrawerExpanded ? 2 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {<item.icon color={item.path.split('/').slice(-1)[0] == activeScreen ? 'primary' : 'undefined'} />}
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} sx={{ opacity: isDrawerExpanded ? 1 : 0 }} />
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                    })}
                    <ListItem key={'Show less'} disablePadding sx={{ display: 'block' }}>
                        <Tooltip key={'Show less'} title={!isDrawerExpanded ? 'Expand' : null} arrow placement="right">
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: 0 ? 'initial' : 'center',
                                    px: 2.5,
                                    m: 1,
                                    borderRadius: '8px'
                                }}

                                onClick={handleExpand}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: isDrawerExpanded ? 2 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {isDrawerExpanded ? <ArrowBackIosNewOutlined /> : <ArrowForwardIosOutlined />}
                                </ListItemIcon>
                                <ListItemText primary={'Show less'} sx={{ opacity: isDrawerExpanded ? 1 : 0 }} />
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    backgroundColor: "white",
                }}
            >
                <DrawerHeader />
                {children}
                <StickyFooter />
            </Box>
        </Box>
    );
}
