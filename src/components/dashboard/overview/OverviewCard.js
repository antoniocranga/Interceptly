import { Card, CardContent, IconButton, Tooltip, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import theme from '../../../theme';
import { TrendingUpOutlined, TrendingDownOutlined, InfoOutlined } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
export default function OverviewCard({ props }) {
    const { header, total, thisMonth, lastMonth, extra, percentage, isDecreasing, tooltip } = props;
    return (
        <Card
            variant="outlined"
            sx={{
                border: '1px solid',
                borderColor: grey[300]
            }}
        >
            <CardContent>
                <Stack
                    direction={'row'}
                    sx={{
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: grey[600]
                        }}
                    >
                        {header}
                    </Typography>
                    <Tooltip title={tooltip} arrow placement={'top-start'}>
                        <IconButton size="small">
                            <InfoOutlined fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Stack>
                <Stack
                    direction="row"
                    sx={{
                        alingItems: 'center',
                        display: 'flex'
                    }}
                >
                    <Typography variant="h6">{total}</Typography>
                    {percentage != null && (
                        <Box
                            sx={{
                                backgroundColor: isDecreasing ? theme.palette.secondary.main : theme.palette.primary.main,
                                display: 'flex',
                                color: 'white',
                                alignItems: 'center',
                                my: '0.2rem',
                                px: '0.4rem',
                                py: '0.1rem',
                                borderRadius: '4px',
                                ml: '1rem'
                            }}
                        >
                            {isDecreasing ? <TrendingDownOutlined fontSize="small" /> : <TrendingUpOutlined fontSize="small" />}
                            <Typography variant="body2">{percentage}%</Typography>
                        </Box>
                    )}
                </Stack>
                <Typography variant="caption">{`A number of ${thisMonth} records have been registered this month`}</Typography>
            </CardContent>
        </Card>
    );
}
