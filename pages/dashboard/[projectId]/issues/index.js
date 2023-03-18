import { CheckOutlined, KeyboardArrowDownOutlined } from '@mui/icons-material';
import {
    Button,
    ButtonGroup,
    Checkbox,
    Container,
    Grid,
    InputLabel,
    Menu,
    MenuItem,
    Select,
    Stack,
    TablePagination,
    TextField,
    Tooltip,
    Typography,
    FormControl,
    List,
    ListItem
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import IssueCard from '../../../../src/components/dashboard/issues/IssueCard';
import IssueCardSkeleton from '../../../../src/components/dashboard/skeletons/IssueCardSkeleton';
import Endpoints from '../../../../src/api/endpoints';
import NoIssuesCard from '../../../../src/components/dashboard/issues/NoIssuesCard';

export default function Issues() {
    const router = useRouter();
    const [range, setRange] = useState(14);
    const [status, setStatus] = useState('active');
    const [sortBy, setSortBy] = useState('lastSeen');
    const [direction, setDirection] = useState('desc');
    const [page, setPage] = useState(0);
    const [controller, setController] = useState('');
    const [size, setSize] = useState(25);
    const { projectId } = router.query;

    const changeHistory = (event) => {
        setPage(0);
        setRange(event.target.value);
    };
    const changeStatus = (event) => {
        setPage(0);
        setStatus(event.target.value);
    };

    const changeSortBy = (event) => {
        setPage(0);
        setSortBy(event.target.value);
    };

    const changeDirection = (event) => {
        setPage(0);
        setDirection(event.target.value);
    };

    const changePage = (event, newPage) => {
        setPage(newPage);
    };

    const changeSize = (event) => {
        setPage(0);
        setSize(event.target.value);
    };
    const selects = [
        {
            tooltip: 'Status',
            label: 'Status',
            name: 'status',
            defaultValue: 'active',
            value: status,
            onChange: changeStatus,
            options: [
                {
                    label: 'Active',
                    value: 'active'
                },
                {
                    label: 'Resolved',
                    value: 'resolved'
                },
                {
                    label: 'Ignored',
                    value: 'ignored'
                },
                {
                    label: 'Blocked',
                    value: 'blocked'
                }
            ]
        },
        {
            tooltip: 'History',
            label: 'Time range',
            name: 'history',
            defaultValue: 14,
            value: range,
            onChange: changeHistory,
            options: [
                {
                    label: '24 hours',
                    value: 1
                },
                {
                    label: '7 days',
                    value: 7
                },
                {
                    label: '14 days',
                    value: 14
                },
                {
                    label: 'Last month',
                    value: 30
                },
                {
                    label: 'Last 3 months',
                    value: 90
                },
                {
                    label: 'Last 6 months',
                    value: 180
                },
                {
                    label: 'Last year',
                    value: 360
                },
                {
                    label: 'All',
                    value: 0
                }
            ]
        },
        {
            tooltip: 'Sorting method',
            label: 'Sort by',
            name: 'sortBy',
            defaultValue: 'lastSeen',
            value: sortBy,
            onChange: changeSortBy,
            options: [
                {
                    label: 'Last Seen',
                    value: 'lastSeen'
                },
                {
                    label: 'First seen',
                    value: 'firstSeen'
                },
                {
                    label: 'Events count',
                    value: 'eventsCount'
                }
            ]
        },
        {
            tooltip: 'Sorting direction',
            label: 'Direction',
            name: 'direction',
            defaultValue: 'desc',
            value: direction,
            onChange: changeDirection,
            options: [
                {
                    label: 'Descending',
                    value: 'desc'
                },
                {
                    label: 'Ascending',
                    value: 'asc'
                }
            ]
        }
    ];

    const actions = [
        {
            label: 'Ignore',
            description: '',
            value: 'IGNORED'
        },
        {
            label: 'Block',
            description: '',
            value: 'BLOCKED'
        },
        {
            label: 'Active',
            description: '',
            value: 'ACTIVE'
        }
    ];

    const skeletons = {
        content: [
            {
                id: 1
            },
            {
                id: 2
            },
            {
                id: 3
            }
        ],
        numberOfElements: 3
    };

    const [issues, setIssues] = useState(skeletons);
    const handleChangeController = (event) => {
        setController(event.target.value);
    };
    const handleChanges = () => {
        router.push({
            path: `/dashboard/[projectId]/issues`,
            query: {
                projectId: projectId,
                range: range,
                status: status,
                sortBy: sortBy,
                direction: direction,
                size: size,
                page: page
            }
        });
    };

    useEffect(() => {
        if (!projectId) {
            return;
        }
        setIsLoading(true);
        handleChanges();
        axios
            .get(`${Endpoints.projects}/${projectId}/issues`, {
                params: {
                    range: range,
                    status: status,
                    sortBy: sortBy,
                    direction: direction,
                    size: size,
                    page: page,
                    type: controller
                }
            })
            .then((data) => {
                data = data.data;
                setIsLoading(false);
                setIssues(data);
                setPage(data.pageable.pageNumber);
                setSize(data.pageable.pageSize);
            })
            .then((err) => {});
    }, [range, status, sortBy, direction, projectId, controller, size, page]);

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleButtonDropdown = (event) => {
        if (isOpen) {
            setAnchorEl(null);
        } else {
            setAnchorEl(event.currentTarget);
        }
    };
    const close = () => {
        setAnchorEl(null);
    };

    const [checked, setChecked] = useState([]);
    const [allChecked, setAllChecked] = useState(false);
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    const [value, setValue] = useState('');
    const handleTagInput = (tag, input) => {
        setValue(input);
    };

    const handleToggleAll = () => {
        if (allChecked) {
            setChecked([]);
        } else {
            const ids = [];
            issues.content.forEach((issue) => ids.push(issue.id));
            setChecked(ids);
        }
        setAllChecked(!allChecked);
    };

    const updateStatus = (status) => () => {
        axios
            .patch(`${Endpoints.projects}/${projectId}/issues`, {
                ids: checked,
                status: status
            })
            .then((data) => {
                setAnchorEl(null);
                setChecked([]);
                router.reload();
            })
            .catch((err) => {});
    };
    const [isLoading, setIsLoading] = useState(true);
    return (
        <Box
            sx={{
                backgroundColor: grey[50],
                py: '1rem'
            }}
        >
            <Container>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 500,
                        mb: '1rem'
                    }}
                >
                    Issues
                </Typography>
                <Grid container spacing={1.5}>
                    {selects.map((value) => (
                        <Grid item key={value.name}>
                            <Tooltip title={value.tooltip} placement="top" arrow>
                                <FormControl
                                    size="small"
                                    sx={{
                                        minWidth: 125,
                                        backgroundColor: 'white',
                                        borderRadius: '8px'
                                    }}
                                >
                                    <InputLabel id="history-input-label">{value.label}</InputLabel>

                                    <Select
                                        defaultValue={value.defaultValue}
                                        labelId="history-input-label"
                                        id="history-select"
                                        label={value.label}
                                        value={value.value}
                                        onChange={value.onChange}
                                        name={value.name}
                                    >
                                        {value.options.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Tooltip>
                        </Grid>
                    ))}
                </Grid>
                <Tooltip title={''}>
                    <TextField
                        value={controller}
                        onChange={handleChangeController}
                        id={'render-input-textfield'}
                        key={'render-input-textfield'}
                        fullWidth
                        size="small"
                        sx={{
                            mt: '1rem',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            ':root': {
                                backgroundColor: 'red'
                            }
                        }}
                        required
                        type="text"
                        placeholder="Search for issues by type"
                    />
                </Tooltip>

                <List
                    disablePadding
                    sx={{
                        my: '1rem'
                    }}
                >
                    <ListItem
                        sx={{
                            border: '1px solid',
                            borderColor: grey[300],
                            borderRadius: '8px 8px 0px 0px',
                            height: '45px'
                        }}
                        secondaryAction={<Typography variant="body2">Events</Typography>}
                    >
                        <Checkbox
                            sx={{
                                display: {
                                    xs: 'none',
                                    sm: 'flex'
                                },
                                mr: '0.5rem'
                            }}
                            disabled={isLoading}
                            edge="start"
                            checked={allChecked}
                            onChange={handleToggleAll}
                            inputprops={{ 'aria-labelledby': 'checkbox-all' }}
                        />
                        <Stack direction={'row'}>
                            <ButtonGroup
                                disableElevation
                                variant="outlined"
                                size="small"
                                color={checked.length > 0 ? 'primary' : 'info'}
                                disabled={isLoading || checked.length == 0}
                            >
                                <Button startIcon={<CheckOutlined />} onClick={updateStatus('RESOLVED')}>
                                    Resolve
                                </Button>
                                <Button
                                    onClick={handleButtonDropdown}
                                    aria-controls={isOpen ? 'simple-menu' : undefined}
                                    aria-expanded={isOpen || undefined}
                                    aria-haspopup="menu"
                                >
                                    <KeyboardArrowDownOutlined />
                                </Button>
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
                        </Stack>
                    </ListItem>
                    {issues.content ? (
                        issues.content.map((issue, index) =>
                            isLoading ? (
                                <IssueCardSkeleton key={index} index={index} length={issues.numberOfElements} id={issue.id} />
                            ) : (
                                <IssueCard
                                    key={index}
                                    issue={issue}
                                    index={index}
                                    length={issues.numberOfElements}
                                    selected={checked.indexOf(issue.id) !== -1}
                                    onChange={handleToggle(issue.id)}
                                />
                            )
                        )
                    ) : (
                        <NoIssuesCard />
                    )}
                </List>
                {!isLoading && (
                    <TablePagination
                        component={'div'}
                        count={issues.totalElements}
                        page={page}
                        rowsPerPage={size}
                        onPageChange={changePage}
                        onRowsPerPageChange={changeSize}
                        labelRowsPerPage={'Issues per page'}
                    />
                )}
            </Container>
        </Box>
    );
}
