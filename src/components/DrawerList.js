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
    ArrowBackIosNewOutlined,
    GroupsOutlined
} from '@mui/icons-material';
import { Stack } from '@mui/system';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import { useRouter } from 'next/router';
import theme from '../theme';

export default function DrawerList({ isDrawerExpanded }) {
    const router = useRouter();
    const paths = router.asPath.split('/');
    const projectId = paths[2];
    const activeScreen = paths[paths.length - 1];
    const menuItems = [
        {
            name: 'Overview',
            icon: FolderCopyOutlined,
            path: `/dashboard/${projectId}/overview`
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
            name: 'Team',
            icon: GroupsOutlined,
            path: `/dashboard/${projectId}/team`
        }
    ];
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
                    bgcolor: 'background.paper'
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                {menuItems.map((item) => (
                    <Tooltip key={item.name} title={!isDrawerExpanded ? item.name : null} arrow placement="right">
                        <ListItemButton
                            sx={{
                                margin: isDrawerExpanded ? '0px 8px 6px 8px' : null,
                                borderRadius: isDrawerExpanded ? '8px' : null,
                                color: item.path.split('/').slice(-1)[0] == activeScreen ? theme.palette.primary.main : null
                            }}
                            selected={item.path.split('/').slice(-1)[0] == activeScreen}
                            onClick={createHandleMenuClick(item.path)}
                        >
                            <ListItemIcon>
                                {<item.icon color={item.path.split('/').slice(-1)[0] == activeScreen ? 'primary' : 'undefined'} />}
                            </ListItemIcon>
                            {isDrawerExpanded ? <ListItemText primary={item.name} /> : <></>}
                        </ListItemButton>
                    </Tooltip>
                ))}
            </List>
        </Stack>
    );
}
