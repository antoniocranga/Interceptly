import { ListItem, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
export default function NoTeamCard() {
    return (
        <ListItem
            sx={{
                backgroundColor: 'white',
                pl: '1rem',
                borderBottom: '1px solid',
                borderLeft: '1px solid',
                borderRight: '1px solid',
                borderColor: grey[300],
                borderRadius: '0px 0px 8px 8px'
            }}
            key={'no-issues-card'}
            disableGutters
        >
            <Stack
                spacing={2}
                sx={{
                    width: '100%',
                    mb: '0.5rem'
                }}
            >
                <Box>
                    <Typography variant="h6">No team members found!</Typography>
                    <Typography variant="body2">Team members will be shown here.</Typography>
                </Box>
            </Stack>
        </ListItem>
    );
}
