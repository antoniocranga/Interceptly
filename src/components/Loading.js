import { Box, CircularProgress } from '@mui/material';

export default function Loading() {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed'
            }}
        >
            <CircularProgress />
        </Box>
    );
}
