import { Typography } from '@mui/material';
import Link from 'next/link';
export default function Logo({ sx }) {
    return (
        <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
                display: 'flex',
                textDecoration: 'none',
                color: 'black',
                ...{ ...sx }
            }}
        >
            Interceptly
        </Typography>
    );
}
