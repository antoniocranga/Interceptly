import { HelpOutline } from '@mui/icons-material';
import { Button, ListItem, Stack, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import Link from 'next/link';
export default function NoIssuesCard() {
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
                    width: '100%'
                }}
            >
                <Box>
                    <Typography variant="h6">No issues found!</Typography>
                    <Typography variant="body2">Issues will be displayed as soon as they arrive.</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        pr: '1rem'
                    }}
                >
                    <Box
                        display={'flex'}
                        sx={{
                            alignItems: 'center'
                        }}
                    >
                        <Button
                            variant="contained"
                            size="small"
                            disableElevation
                            sx={{}}
                            component={Link}
                            noLinkStyle
                            href="/documentation/setup"
                        >
                            Setup Interceptly API
                        </Button>
                        <Typography
                            variant="body2"
                            sx={{
                                ml: '0.5rem'
                            }}
                        >
                            or change filters
                        </Typography>
                    </Box>
                    <Tooltip
                        arrow
                        placement="top-end"
                        title={
                            'If you see this card, it means that there are no issues with these filters. Try to change the filters or check the setup guide by pressing the button.'
                        }
                    >
                        <HelpOutline color="info" fontSize="small" />
                    </Tooltip>
                </Box>
            </Stack>
        </ListItem>
    );
}
