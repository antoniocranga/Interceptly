import { Avatar, Box, ListItemAvatar, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Stack } from '@mui/system';
import { format } from 'timeago.js';
import NotificationItemBase from './NotificationItemBase';

export default function ProjectPermissionNotification({ notification }) {
    const splitted = notification.message.split('%');
    const formatMessage = () => {
        return (
            <Box>
                {splitted.map((message, index) => {
                    return (
                        <Typography key={index} variant="body2" fontWeight={index % 2 ? 400 : 500} display="inline">
                            {message + ' '}
                        </Typography>
                    );
                })}
            </Box>
        );
    };
    return (
        <NotificationItemBase notification={notification}>
            <ListItemAvatar>
                <Avatar>{splitted[0][0]}</Avatar>
            </ListItemAvatar>
            <Stack>
                {formatMessage(notification.message)}
                <Typography variant="caption" color={grey[600]}>
                    {format(new Date(notification.createdAt + 'Z'))}
                </Typography>
            </Stack>
        </NotificationItemBase>
    );
}
