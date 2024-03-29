import { ListItemButton } from '@mui/material';
import { blue } from '@mui/material/colors';
import axios from 'axios';
import { useRouter } from 'next/router';
import Endpoints from '../../../api/endpoints';

export default function NotificationItemBase({ notification, children }) {
    const router = useRouter();
    const handleRedirect = () => {
        if (!notification.seen) {
            axios.patch(`${Endpoints.notifications}/seen`, {
                id: notification.id
            });
        }
        router.push(notification.redirectUrl);
    };
    return (
        <ListItemButton
            key={notification.id}
            onClick={handleRedirect}
            alignItems="flex-start"
            sx={{
                background: notification.seen ? 'white' : blue[50],
                borderRadius: '8px',
                mt: '0.1rem'
            }}
        >
            {children}
        </ListItemButton>
    );
}
