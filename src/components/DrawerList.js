import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import { IconButton, ListItemButton, Tooltip } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
    FolderCopyOutlined,
    BugReportOutlined,
    AnalyticsOutlined,
    ExpandLessOutlined,
    ExpandMoreOutlined,
    TimelineOutlined,
    HomeOutlined,
    ArrowForwardIosOutlined,
    ArrowBackIosNewOutlined
} from '@mui/icons-material';
import { Stack } from '@mui/system';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import { useRouter } from 'next/router';

export default function DrawerList({ isDrawerExpanded }) {
    const router = useRouter();
    const menuItems = [
        {
            name: 'Overview',
            icon: HomeOutlined,
            path: '/dashboard'
        },
        {
            name: 'Projects',
            icon: FolderCopyOutlined,
            path: '/dashboard/projects'
        },
        {
            name: 'Issues',
            icon: BugReportOutlined,
            path: '/dashboard/issues'
        },
        {
            name: 'Statistics',
            icon: AnalyticsOutlined,
            path: '/dashboard/statistics'
        }
    ];
    // const [open, setOpen] = React.useState(true);

    // const handleClick = () => {
    //     setOpen(!open);
    // };
    const createHandleMenuClick = (menuItem) => {
        return () => {
            router.push(menuItem);
        };
    };

    return (
        <Stack>
            <Toolbar />
            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper'
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                {/* <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <AnalyticsOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Statistics" />
                    {open ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
                </ListItemButton> */}
                {/* <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 8 }}>
                            <ListItemIcon>
                                <TimelineOutlined />
                            </ListItemIcon>
                            <ListItemText primary="Timeline" />
                        </ListItemButton>
                    </List>
                </Collapse> */}
                {menuItems.map((item) => (
                    <Tooltip title={!isDrawerExpanded ? item.name : null}>
                        <ListItemButton onClick={createHandleMenuClick(item.path)}>
                            <ListItemIcon>{<item.icon />}</ListItemIcon>
                            {isDrawerExpanded ? <ListItemText primary={item.name} /> : <></>}
                        </ListItemButton>
                    </Tooltip>
                ))}
                
            </List>
        </Stack>
    );
}
