import { Link, Typography } from '@mui/material';
export default function Logo({ sx }) {
    return (
        <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
                display: 'inline-block',
                textDecoration: 'none',
                color: 'black',
                mr: {
                    md: 2
                },
                ...{ ...sx }
            }}
        >
            Interceptly
        </Typography>
    );
}
