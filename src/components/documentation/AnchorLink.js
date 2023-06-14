import { AnchorOutlined } from '@mui/icons-material';
import { Link, Typography } from '@mui/material';
import { Stack } from '@mui/system';

export default function AnchorLink({ href, label }) {
    return (
        <Stack direction="row">
            <AnchorOutlined fontSize="small" color="info" />
            <Typography variant="h5" fontWeight={600} component={Link} color="text.primary" underline="hover" href={href}>
                {label}
            </Typography>
        </Stack>
    );
}
