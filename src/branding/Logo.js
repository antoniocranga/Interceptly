import { Typography } from '@mui/material';

export default function Logo({ sx }) {
    return (
        <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
                textDecoration: 'none',
                color: 'black',
                ...{...sx}
            }}
        >
            Interceptly
        </Typography>
    );
}
