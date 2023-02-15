import { CheckBox, CheckOutlined, GroupAdd, KeyboardArrowDownOutlined } from "@mui/icons-material";
import { Box, Button, ButtonGroup, CardContent, Chip, Collapse, Divider, Grid, IconButton, List, Menu, MenuItem, Stack, TablePagination, TextField, Typography, useMediaQuery } from "@mui/material";
import { grey } from "@mui/material/colors";
import { alpha, Container } from "@mui/system";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Endpoints from "../../../../src/api/endpoints";
import EventCard from "../../../../src/components/dashboard/issues/events/EventCard";
import theme from "../../../../src/theme";

export default function Issue() {
    const router = useRouter();
    const { projectId, issueId } = router.query;

    const [pagination, setPagination] = useState({
        size: 1,
        page: 0
    });
    const [issue, setIssue] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [collapsed, setCollapsed] = useState(false);
    const isSmall = useMediaQuery(theme.breakpoints.only('xs'))
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleButtonDropdown = (event) => {
        if (isOpen) {
            setAnchorEl(null);
        }
        else {
            setAnchorEl(event.currentTarget);
        }
    }
    const close = () => {
        setAnchorEl(null);
    };
    const updateStatus = (status) => () => {
        console.log(status);
        axios.patch(`${Endpoints.projects}/${projectId}/issues`, {
            ids: [issueId],
            status: status
        }).then((data) => {
            setAnchorEl(null);
            router.reload();
        }).catch((err) => { console.log(err); });
    }

    const changePage = (event, newPage) => {
        setPagination({ ...pagination, page: newPage });
    }

    const changeSize = (event) => {
        setPage(0);
        setSize(event.target.value);
    }
    const formatedDate = (date) => {
        return new Date(date).toUTCString();
    };
    const actions = [
        {
            label: 'Ignore',
            description: '',
            value: 'IGNORED',
        },
        {
            label: 'Block',
            description: '',
            value: 'BLOCKED',
        },
        {
            label: 'Active',
            description: '',
            value: 'ACTIVE',
        },
    ];
    const handleCollapsed = () => {
        setCollapsed((prev) => !prev);
    }
    useEffect(() => {
        if (!projectId || !issueId) {
            return;
        }
        router.replace({
            path: `/dashboard/[projectId]/issues/[issueId]`,
            query: {
                projectId: projectId,
                issueId: issueId,
                size: pagination.size,
                page: pagination.page
            }
        });
        axios.get(`${Endpoints.projects}/${projectId}/issues/${issueId}`, {
            params: {
                size: pagination.size,
                page: pagination.page
            }
        }).then((data) => {
            data = data.data;
            setIssue(data);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            router.reload();
            setIsLoading(false);
        });
    }, [pagination, projectId, issueId]);

    return (<Box sx={{
        backgroundColor: grey[50],
        py: '1rem'
    }}>
        <Container>
            {!isLoading && issue && <Stack spacing={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Stack direction={"row"} spacing={1}>
                            <LabelItem color={theme.palette.warning.main}>
                                {issue.type}
                            </LabelItem>
                            <LabelItem color={theme.palette.info.main}>
                                {issue.status}
                            </LabelItem>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{
                        display: "flex",
                        justifyContent: {
                            xs: "space-between",
                            sm: "end"
                        }
                    }}>
                        <ButtonGroup

                            disableElevation
                            variant="outlined"
                            size='small'
                            color={'primary'}
                            disabled={isLoading}
                        >
                            <Button
                                startIcon={<CheckOutlined />} onClick={
                                    updateStatus('RESOLVED')
                                }>Resolve</Button>
                            <Button onClick={handleButtonDropdown}
                                aria-controls={isOpen ? 'simple-menu' : undefined}
                                aria-expanded={isOpen || undefined}
                                aria-haspopup="menu"
                            ><KeyboardArrowDownOutlined /></Button>
                        </ButtonGroup>
                        <Menu open={isOpen} onClose={close} anchorEl={anchorEl}>
                            {actions.map((action, index) => (
                                <MenuItem
                                    key={action.value}
                                    onClick={updateStatus(action.value)}
                                    sx={{
                                        mb: index < actions.length - 1 ? '5px' : 0
                                    }}
                                >
                                    {action.label}
                                </MenuItem>
                            ))}
                        </Menu>
                        <IconButton size={"small"} sx={{ ml: '0.5rem' }}>
                            <GroupAdd color="disabled" />
                        </IconButton>
                    </Grid>
                </Grid>
                <Box>
                    <Stack direction={"row"} spacing={1}>
                        <Typography variant="body2">Issue Id: </Typography>
                        <Typography variant="body2" color={theme.palette.primary.main}>{issue.id}</Typography>
                    </Stack>
                    <Typography variant={'h6'} sx={{
                        mb: '0.5rem'
                    }}>
                        {issue.title}
                    </Typography>
                    <Collapse in={collapsed} collapsedSize={40}>
                        <Typography variant={'body2'}>
                            {issue.description}
                        </Typography>
                    </Collapse>
                    {issue.description.length > 60 && <Stack direction={"row"} sx={{
                        justifyContent: "end"
                    }}>
                        <Button variant="text" size="small" onClick={handleCollapsed}>
                            {collapsed ? "See less" : "See more"}
                        </Button></Stack>}
                </Box>
                <ContentBox>
                    <CardContent>
                        <Grid container spacing={2}>
                            {
                                [{ date: issue.createdAt, label: "Created at" }, { date: issue.updatedAt, label: "Updated at" }, { date: issue.lastSeen, label: "Last seen" }].map((value, index) =>
                                    <Grid item key={`dates-${index}`} xs={12} sm={6} md={4}>
                                        <TextField
                                            value={formatedDate(value.date)}
                                            fullWidth
                                            size="small"
                                            disabled
                                            label={value.label}
                                        />
                                    </Grid>)
                            }
                        </Grid>
                    </CardContent>
                </ContentBox>
                <ContentBox>
                    <CardContent>
                        <ContentTitle>Event: {issue.events.content[0].id}</ContentTitle>
                        <Divider />
                        <List >
                            {issue.events.content.map((event) => <EventCard event={event} />)}
                        </List>
                        <TablePagination
                            component={'div'}
                            count={issue.events.totalElements}
                            page={pagination.page}
                            rowsPerPage={pagination.size}
                            rowsPerPageOptions={[]}
                            onPageChange={changePage}
                            onRowsPerPageChange={changeSize}
                            labelRowsPerPage={"Issues per page"}
                        />
                    </CardContent>
                </ContentBox>
            </Stack>}
        </Container>
    </Box>);
}

function LabelItem({ color, children }) {
    return <Typography variant={"body2"} sx={{
        border: '1px solid',
        borderColor: color,
        backgroundColor: alpha(color, 0.1),
        px: '1rem',
        borderRadius: '100px',
        fontWeight: '500'
    }}>
        {children}
    </Typography>
}

function ContentBox({ children }) {
    return <Box sx={{
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: grey[300],
        width: "100%"
    }}>
        {children}
    </Box>
};

function ContentTitle({ children }) {
    return <Typography variant="body1" fontWeight={"500"}>{children}</Typography>
}

function ContentSubtitle({ children }) {
    return <Typography variant="body2" color={grey[600]}>{children}</Typography>
}

function ContentCaption({ tooltip, children }) {
    return <Tooltip title={tooltip} arrow placement='top'><Typography variant="caption" color={grey[600]}>{children}</Typography></Tooltip>
}