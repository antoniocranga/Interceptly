import { MoreHorizOutlined } from '@mui/icons-material';
import { Grid, IconButton, ListItem, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { grey } from '@mui/material/colors';
import { alpha, Stack } from '@mui/system';
import { useRouter } from 'next/router';
import theme from '../../../theme';
import * as timeago from 'timeago.js';
export default function TeamUserCard(props) {
    const router = useRouter();
    const { projectId } = router.query;
    const { user, index, length, open } = props;
    const isSmall = useMediaQuery(theme.breakpoints.only('xs'));

    const formatedDate = (date) => {
        return timeago.format(new Date(date + 'Z'));
    };
    const computeColor = (permission) => {
        switch (permission) {
            case 'OWNER':
                return theme.palette.primary.main;
            case 'ADMIN':
                return theme.palette.secondary.main;
            case 'DEVELOPER':
                return theme.palette.success.main;
            case 'VIEW':
                return theme.palette.info.main;
        }
    };
    return (
        <ListItem
            sx={{
                backgroundColor: 'white',
                pl: '1rem',
                borderBottom: '1px solid',
                borderLeft: '1px solid',
                borderRight: '1px solid',
                borderColor: grey[300],
                borderRadius:
                    index == 0 && length > 1 ? '0px' : index == 0 ? '0px 0px 8px 8px' : index == length - 1 ? '0px 0px 8px 8px' : '0px'
            }}
            key={user.id}
            secondaryAction={
                <IconButton onClick={open} disabled={user.permission == 'OWNER'}>
                    <MoreHorizOutlined fontSize="small" />
                </IconButton>
            }
            disablePadding
        >
            <Grid container alignItems={'center'}>
                <Grid item xs={4}>
                    <Stack direction={'column'} width="100%">
                        <Grid
                            container
                            sx={{
                                my: '0.5rem'
                            }}
                        >
                            <Grid item xs={8} sm={4}>
                                <Typography>{user.email}</Typography>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            sx={{
                                mb: '0.5rem'
                            }}
                            spacing={1}
                        >
                            <Grid item>
                                <Tooltip placement="top-start" title={new Date(user.createdAt + 'Z').toLocaleString()}>
                                    <Typography variant={'caption'}>Added {formatedDate(user.createdAt)}</Typography>
                                </Tooltip>
                            </Grid>
                            {user.permission != 'OWNER' && (
                                <Grid item>
                                    <Typography
                                        variant={'caption'}
                                        sx={{
                                            fontWeight: '500'
                                        }}
                                    >
                                        by {user.createdBy.split('@')[0]}
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                    </Stack>
                </Grid>
                <Grid item xs={8} display="flex" justifyContent={'center'}>
                    <LabelItem color={computeColor(user.permission)}>{user.permission}</LabelItem>
                </Grid>
            </Grid>
        </ListItem>
    );
}
function LabelItem({ color, children }) {
    return (
        <Typography
            variant={'body2'}
            sx={{
                border: '1px solid',
                borderColor: color,
                backgroundColor: alpha(color, 0.1),
                px: '1rem',
                borderRadius: '100px',
                fontWeight: '500'
            }}
        >
            {children}
        </Typography>
    );
}
