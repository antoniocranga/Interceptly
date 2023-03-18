import { NotificationsOutlined } from '@mui/icons-material';
import { Badge, Button, IconButton, List, Menu, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useAppContext } from '../../utils/AppContext';
import IssueCollaborationNotification from './types/IssueCollaborationNotification';
import axios from 'axios';
import Endpoints from '../../api/endpoints';
import ProjectPermissionNotification from './types/ProjectPermissionNotification';

export default function NotificationsSection() {
    const { isAuthenticated, notifications, setNotifications } = useAppContext();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const onClick = (event) => {
        if (open) {
            setAnchorEl(null);
        } else {
            setAnchorEl(event.currentTarget);
        }
    };
    const onClose = () => {
        setAnchorEl(null);
    };

    const seenAllNotifications = () => {
        if (notifications.filter((noti) => !noti.seen).length > 0) {
            axios
                .patch(`${Endpoints.notifications}/seen/all`)
                .then((data) => {
                    var changedNoti = notifications
                    for (var noti in changedNoti) {
                        changedNoti[noti].seen = true;
                    }
                    setNotifications(changedNoti);
                })
                .catch((err) => {});
        }
    };
    return isAuthenticated ? (
        <Box display="flex" alignItems={'center'}>
            <IconButton onClick={onClick}>
                <Badge badgeContent={notifications ? notifications.filter((noti) => !noti.seen).length : 0} color="primary">
                    <NotificationsOutlined />
                </Badge>
            </IconButton>
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={onClose}
                sx={{
                    minWidth: '200px'
                }}
            >
                <Stack
                    sx={{
                        mb: '0.5rem',
                        minWidth: '200px'
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems={'center'}
                        justifyContent="space-between"
                        sx={{
                            mx: '1rem',
                            my: '0.2rem'
                        }}
                    >
                        <Typography variant="body1" fontWeight={500}>
                            Notifications
                        </Typography>
                        <Button size="small" onClick={seenAllNotifications}>
                            Seen all{' '}
                        </Button>
                    </Stack>
                    <List
                        sx={{
                            maxWidth: '360px',
                            maxHeight: '400px',
                            overflowY: 'auto'
                        }}
                        disablePadding
                    >
                        {notifications &&
                            notifications.map((notification, index) => {
                                switch (notification.type) {
                                    case 'ISSUE_COLLABORATION':
                                        return <IssueCollaborationNotification key={index} notification={notification} />;
                                    case 'PROJECT_PERMISSION_ADD':
                                    case 'PROJECT_PERMISSION_UPDATE':
                                        return <ProjectPermissionNotification key={index} notification={notification} />;
                                }
                            })}
                    </List>
                </Stack>
            </Menu>
        </Box>
    ) : (
        <></>
    );
}
