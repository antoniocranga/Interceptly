import { Link } from '@mui/material';
import { grey } from '@mui/material/colors';
import theme from '../../theme';

export default function Code({href, children}) {
    return (
        <Link
            sx={{
                background: grey[100],
                border: '1px solid',
                borderColor: grey[300],
                px: '0.4rem',
                py: '0.1rem',
                borderRadius: '4px',
                mx: '0.2rem',
                fontSize: '15px',
                fontFamily: theme.typography.fontFamily
            }}
        component={href ? undefined : "code"}
        href={href ?? '/'}
        color={"text.primary"}
        underline="none"
        >
            {children}
        </Link>
    );
}
