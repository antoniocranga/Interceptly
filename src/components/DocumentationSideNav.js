import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { InboxOutlined, MailOutline } from '@mui/icons-material';
import { useRouter } from 'next/router';
import StickyFooter from './Footer';
import theme from '../theme';
import { fontWeight } from '@mui/system';
import { grey } from '@mui/material/colors';

export default function DocumentationSideNav({ children }) {
    const items = [
        {
            label: 'Getting started',
            path: '/documentation/getting-started'
        },
        {
            label: 'API Reference',
            path: '/documentation/api'
        }
    ];
    const drawerWidth = 180;
    const router = useRouter();
    const handleRoute = (path) => {
        return () => {
            router.push(path);
        };
    };
    return (
        <Box display="flex">
            <Drawer
                variant="permanent"
                sx={{
                    display: {
                        xs: 'none',
                        sm: 'flex'
                    },
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderRight: 1,
                        borderColor: grey[300]
                    }
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {items.map((item, index) => (
                            <ListItem key={item.path} disablePadding sx={{ display: 'block' }} dense>
                                <ListItemButton
                                    sx={{
                                        px: 2.5,
                                        mx: 1,
                                        borderRadius: '8px'
                                    }}
                                    selected={item.path == router.asPath.split("#")[0]}
                                    onClick={handleRoute(item.path)}
                                >
                                    <ListItemText
                                        primary={item.label}
                                        sx={{
                                            color: item.path == router.asPath ? theme.palette.primary.main : 'black'
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    {/* <Divider /> */}
                
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, py:'1rem' }}>
                <Container>
                    {children}
                    <StickyFooter />
                </Container>
            </Box>
        </Box>
    );
}
