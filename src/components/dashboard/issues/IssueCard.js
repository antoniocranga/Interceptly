import { Box, Checkbox, Divider, ListItem, ListItemText, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { alpha, Stack } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/router";
import theme from "../../../theme";
import * as timeago from 'timeago.js';
export default function IssueCard(props) {
    const router = useRouter();
    const { projectId } = router.query;
    const { issue, index, length, selected, onChange } = props;
    const labelId = `checkbox-list-secondary-label-${issue.id}`;
    const isSmall = useMediaQuery(theme.breakpoints.only('xs'))
    const formatedDate = (date) => {
        date = date+'Z';
        if (isSmall) {
            return new Date(date).toLocaleString();
        } else {
            return new Date(date).toLocaleString();
        }
    };
    return (
        <ListItem
            sx={{
                backgroundColor: selected ? blue[50] : "white",
                pl: '1rem',
                borderBottom: '1px solid',
                borderLeft: '1px solid',
                borderRight: '1px solid',
                borderColor: grey[300],
                borderRadius: index == 0 && length > 1 ? '0px' : index == 0 ? '0px 0px 8px 8px' : index == length - 1 ? '0px 0px 8px 8px' : '0px',
            }}
            key={issue.id}
            secondaryAction={
                <Typography sx={{
                    mr: '1rem'
                }} variant="body1">{issue.eventsCount}</Typography>
            }
            disablePadding
            disableGutters
        >
            <Checkbox
                sx={{
                    display: {
                        xs: 'none',
                        sm: 'flex',
                    },
                    mr: '0.5rem'
                }}
                edge="start"
                checked={selected}
                onChange={onChange}
                inputprops={{ 'aria-labelledby': labelId }}
            />
            <Stack direction={"column"}>

                <Box sx={{
                    my: '0.5rem',
                }}>
                    <Link href={`/dashboard/${projectId}/issues/${issue.id}`} style={{
                        textDecoration: 'none',
                        color: theme.palette.primary.main,
                    }}>
                        <Typography sx={{
                            maxWidth: {
                                sx: '60%',
                                sm: '100%'
                            }
                        }}>{issue.title.length <= 35 ? issue.title : issue.title.substr(0, 35) + "..."}</Typography>
                    </Link>
                    <Typography noWrap variant={'body2'} sx={{
                        color: grey[600],
                        mr: '2.5rem',
                        maxWidth: {
                            sx: '60%',
                            sm: '100%'
                        }
                    }}>
                        {issue.description.length <= 40 ? issue.description : issue.description.substr(0, 40) + "..."}
                    </Typography>
                </Box>
                <Stack direction={"row"} sx={{
                    mb: '0.5rem',
                }} spacing={1}>
                    <Typography variant={'caption'} sx={{
                        border: '1px solid',
                        borderColor: theme.palette.warning.main,
                        backgroundColor: alpha(theme.palette.warning.main, 0.1),
                        px: '1rem',

                        borderRadius: '100px',
                        fontWeight: '500'
                    }}>{issue.type}</Typography>

                    <Tooltip placement="top" title={<Stack spacing={1} sx={{
                        m: '0.2rem',
                    }}>
                        <Box>First seen: {formatedDate(issue.firstSeen)}</Box>
                        <Box>Last seen: {formatedDate(issue.lastSeen)}</Box>
                    </Stack>} arrow>
                        <Typography variant={'caption'} sx={{
                            border: '1px solid',
                            borderColor: grey[500],
                            px: '1rem',
                            borderRadius: '100px',
                            fontWeight: '500',
                        }}>{timeago.format(new Date(issue.lastSeen + " UTC"))}</Typography>
                    </Tooltip>
                </Stack>
            </Stack>
        </ListItem>);
}