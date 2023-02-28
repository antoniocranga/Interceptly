import { CheckOutlined } from '@mui/icons-material';
import { Avatar, Button, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { Box, Stack } from '@mui/system';
import * as timeago from 'timeago.js';
import NotificationItemBase from './NotificationItemBase';

export default function IssueCollaborationNotification({ notification }) {
    const splitted = notification.message.split('%');
    const email = splitted[0];
    const formatMessage = () => {
        return (
            <Box>
                <Typography variant="body2" fontWeight={index % 2 ? 400 : 500} display="inline">
                            {message + " "}
                </Typography>
            </Box>
        );
    };
    return (
        <NotificationItemBase notification={notification}>
            <ListItemAvatar>
                <Avatar>{email[0]}</Avatar>
            </ListItemAvatar>
            <Stack>
                {formatMessage(notification.message)}
                <Typography variant="caption" color={grey[600]}>
                    {timeago.format(new Date(notification.createdAt))}
                </Typography>
            </Stack>
        </NotificationItemBase>
    );
}
