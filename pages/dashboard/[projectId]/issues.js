import { OptionUnstyled, SelectUnstyled } from '@mui/base';
import { ChangeHistory, SearchOffOutlined, SearchOutlined } from '@mui/icons-material';
import {
    Button,
    Container,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import { useState } from 'react';
import theme from '../../../src/theme';

export default function Issues() {
    const [history, setHistory] = useState(14);
    const [status, setStatus] = useState('active');
    const changeHistory = (event) => {
        // console.log(event);
        setHistory(event.target.value);
    };
    const changeStatus = (event) => {
        setStatus(event.target.value);
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
                    label: 'Resolved',
                    value: 'resolved'
                },
                {
                    label: 'Active',
                    value: 'active'
                },
                {
                    label: 'Hidden',
                    value: 'hidden'
                },
                {
                    label: 'All',
                    value: 'all'
                }
            ]
        },
        {
            tooltip: 'History',
            label: 'Time range',
            name: 'history',
            defaultValue: 14,
            value: history,
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
        }
    ];

    const issues = [
        {
            id: 1,
            title: 'Title1',
            description: 'Description1'
        },
        {
            id: 1,
            title: 'Title1',
            description: 'Description1'
        },
        {
            id: 1,
            title: 'Title1',
            description: 'Description1'
        }
    ];
    return (
        <Container
            sx={{
                backgroundColor: grey[50],
                py: '1rem'
            }}
        >
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
            <TextField
                fullWidth
                size="small"
                sx={{
                    mt: '1rem'
                }}
                required
                id="search"
                type="text"
                placeholder='Search for an Issue by Name or Id'
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchOutlined />
                        </InputAdornment>
                    )
                }}
            ></TextField>
            <Container>

            </Container>
        </Container>
    );
}
