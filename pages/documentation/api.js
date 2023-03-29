import { ArrowDropDownOutlined, ContentCopyOutlined } from '@mui/icons-material';
import {
    Box,
    Breadcrumbs,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    ClickAwayListener,
    Grid,
    Grow,
    IconButton,
    Link,
    Menu,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Typography
} from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import { Stack } from '@mui/system';
import { useSnackbar } from 'notistack';
import { useRef, useState } from 'react';
import AnchorLink from '../../src/components/documentation/AnchorLink';
import Code from '../../src/components/documentation/Code';
import EndpointBox from '../../src/components/documentation/endpoint/EndpointBox';
import theme from '../../src/theme';
import SyntaxHighlight from '../../src/utils/SyntaxHighlight';

export default function Endpoints() {
    const options = ['cURL', 'Java'];
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const {enqueueSnackbar} = useSnackbar();

    const handleCopyClipboard = (value) => () => {
        navigator.clipboard.writeText(value);
        enqueueSnackbar('Content copied to clipboard', { variant: 'success', autoHideDuration: 3000 });
    };
    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleButtonDropdown = (event) => {
        if (open) {
            setAnchorEl(null);
        } else {
            setAnchorEl(event.currentTarget);
        }
    };

    const close = () => {
        setAnchorEl(null);
    };

    const baseHref = '/documentation/api';
    const endpoints = [
        {
            id: 'post-event',
            href: baseHref + '#post-event',
            title: 'Post an event',
            description:
                'Post an event by adding multiple fields inside the configuration in order to use Interceptly at full power. If an issue with this specific configuration of type and message does not exist, a new issue will be created and the incoming events will be assigned to it.',
            content: {
                method: 'POST',
                endpoint: process.env.NEXT_PUBLIC_API_HOST_NAME + '/events/',
                success: [
                    {
                        statusCode: 201,
                        statusMessage: 'CREATED',
                        message: 'Event created.'
                    }
                ],
                error: [
                    {
                        statusCode: 400,
                        statusMessage: 'BAD REQUEST',
                        message: 'Constraint violations for every field.'
                    },
                    {
                        statusCode: 403,
                        statusMessage: 'FORBIDDEN',
                        message: "You don't have access the this resource."
                    },
                    {
                        statusCode: 500,
                        statusMessage: 'INTERNAL SERVER ERROR',
                        message: 'Unexpected condition that prevented it from fulfilling the request.'
                    }
                ],
                headers: [
                    {
                        id: 'User-Agent',
                        description: 'Use the User-Agent header in order to specify the environment where the request was made from.'
                    }
                ],
                body: [
                    {
                        id: 'type',
                        type: 'String',
                        restrictions: ['Not null', 'Not blank'],
                        description: 'The type of the exception, or any custom string that identifies an issue.'
                    },
                    {
                        id: 'message',
                        type: 'String',
                        restrictions: ['Not null', 'Not blank'],
                        description: 'The description of the exception.'
                    },
                    {
                        id: 'stackTrace',
                        type: 'String',
                        description: 'The list of the method calls that the application was in the middle of when an Exception was thrown.'
                    },
                    {
                        id: 'body',
                        type: 'Object',
                        description: 'Any aditional information that might help.'
                    },
                    {
                        id: 'environment',
                        type: 'String',
                        description: 'The environment that the application currently runs.'
                    },
                    {
                        id: 'packageName',
                        type: 'String',
                        description: 'The name of the package/application.'
                    },
                    {
                        id: 'packageVersion',
                        type: 'String',
                        description: 'The version of the package/application.'
                    }
                ],
                params: [
                    {
                        id: 'apiKey',
                        type: 'String',
                        restrictions: ['Not null', 'Not blank'],
                        description:
                            'The API Key assigned to the project, it binds the requests to the encoded project id inside the key. You can get the key from the dashboard overview section.'
                    }
                ]
            }
        }
    ];
    return (
        <Stack spacing={4}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link href="/documentation" color="inherit" underline="hover">
                    Documentation
                </Link>
                <Link href="/documentation/api" color="text.primary" underline="hover" aria-current="page">
                    API Reference
                </Link>
            </Breadcrumbs>
            <Typography variant="h4" fontWeight={600}>
                API Reference
            </Typography>
            <Typography variant="body1">All the endpoints you can request and their configuration.</Typography>
            <Typography variant="body1">
                The {process.env.NEXT_PUBLIC_APP_NAME} API is based on{' '}
                <Link href="https://en.wikipedia.org/wiki/Representational_state_transfer" fontWeight={600}>
                    REST
                </Link>{' '}
                and built using{' '}
                <Link href="https://spring.io/" fontWeight={600}>
                    Java Spring Boot
                </Link>{' '}
                and{' '}
                <Link href="https://www.mysql.com/" fontWeight={600}>
                    My SQL
                </Link>
                .
            </Typography>
            <Typography variant="body2">
                Just starting with {process.env.NEXT_PUBLIC_APP_NAME}? Check our{' '}
                <Link href="/documentation/getting-started" fontWeight={500}>
                    quickstart guide
                </Link>
                .
            </Typography>
            <Box
                sx={{
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: grey[300]
                }}
            >
                <Box
                    bgcolor={grey[50]}
                    sx={{
                        borderRadius: '8px 8px 0px 0px',
                        px: '1rem',
                        py: '0.7rem'
                    }}
                >
                    <Typography variant="caption" color={grey[700]}>BASE URL</Typography>
                </Box>
                <Box
                    bgcolor={grey[100]}
                    sx={{
                        borderRadius: '0px 0px 8px 8px',
                        px: '1rem',
                        py: '1rem'
                    }}
                >
                    <Box display="flex" justifyContent={"space-between"} alignItems={"center"}>
                        <Typography variant="body2">{process.env.NEXT_PUBLIC_API_HOST_NAME}</Typography>
                        <IconButton size='small' onClick={handleCopyClipboard('https://api.interceptly.com')}><ContentCopyOutlined fontSize='small' /></IconButton>
                    </Box>
                </Box>
            </Box>
            {endpoints.map((endpoint, index) => (
                <Box id={endpoint.id} key={endpoint.id}>
                    <AnchorLink href={endpoint.href} label={endpoint.title}></AnchorLink>
                    <Typography variant="body1">{endpoint.description}</Typography>
                    <Grid container spacing={5} sx={{ my: '0.5rem' }}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">Headers</Typography>
                            {endpoint.content.headers.map((header, index) => {
                                return (
                                    <Grid
                                        container
                                        key={header.id}
                                        sx={{
                                            my: '1.5rem'
                                        }}
                                    >
                                        <Grid item xs={6}>
                                            <Stack>
                                                <Typography>{header.id}</Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2">{header.description}</Typography>
                                        </Grid>
                                    </Grid>
                                );
                            })}

                            <Typography variant="h6">Request params</Typography>
                            {endpoint.content.params.map((param, index) => {
                                return (
                                    <Grid
                                        container
                                        key={param.id}
                                        sx={{
                                            my: '1.5rem'
                                        }}
                                    >
                                        <Grid item xs={6}>
                                            <Stack>
                                                <Typography>{param.id}</Typography>
                                                <Typography variant="body2" color={grey[600]}>
                                                    {param.type}
                                                </Typography>
                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                    sx={{
                                                        color: theme.palette.error.main
                                                    }}
                                                >
                                                    {param.restrictions &&
                                                        param.restrictions.map((restriction,index) => (
                                                            <Typography key={index} variant="caption">{restriction}</Typography>
                                                        ))}
                                                </Stack>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2">{param.description}</Typography>
                                        </Grid>
                                    </Grid>
                                );
                            })}
                            <Typography variant="h6">Request body</Typography>
                            {endpoint.content.body.map((body, index) => {
                                return (
                                    <Grid
                                        container
                                        key={body.id}
                                        sx={{
                                            my: '1.5rem'
                                        }}
                                    >
                                        <Grid item xs={6}>
                                            <Stack>
                                                <Typography>{body.id}</Typography>
                                                <Typography variant="body2" color={grey[600]}>
                                                    {body.type}
                                                </Typography>
                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                    sx={{
                                                        color: theme.palette.error.main
                                                    }}
                                                >
                                                    {body.restrictions &&
                                                        body.restrictions.map((restriction,index) => (
                                                            <Typography key={index} variant="caption">{restriction}</Typography>
                                                        ))}
                                                </Stack>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2">{body.description}</Typography>
                                        </Grid>
                                    </Grid>
                                );
                            })}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack
                                spacing={2}
                                sx={{
                                    background: grey[100],
                                    borderRadius: '8px',
                                    border: '1px solid',
                                    borderColor: grey[300],
                                    p: '1rem'
                                }}
                            >
                                {/* <ButtonGroup variant="outlined" size="small">
                                    <Button onClick={handleButtonDropdown}>{options[selectedIndex]}</Button>
                                    <Button
                                        aria-controls={open ? 'split-button-menu' : undefined}
                                        aria-expanded={open ? 'true' : undefined}
                                        aria-haspopup="menu"
                                        onClick={handleButtonDropdown}
                                    >
                                        <ArrowDropDownOutlined />
                                    </Button>
                                </ButtonGroup>
                                <Menu id="split-button-menu" open={open} onClose={close} anchorEl={anchorEl}>
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Menu> */}
                                <Box
                                    display="flex"
                                    sx={{
                                        // my:'1rem',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Box
                                        bgcolor={grey[300]}
                                        sx={{
                                            px: '0.7rem',
                                            py: '0.2rem',
                                            borderRadius: '4px',
                                            mr: '0.7rem',
                                            width: '60px'
                                        }}
                                    >
                                        <Typography variant="body2" fontWeight={500}>
                                            {endpoint.content.method}
                                        </Typography>
                                    </Box>
                                    <Typography>{endpoint.content.endpoint}</Typography>
                                </Box>
                                <Typography variant="h6">Response</Typography>
                                {endpoint.content.success.map((result, index) => (
                                    <StatusCodeBox result={result} />
                                ))}
                                {endpoint.content.error.map((result, index) => (
                                    <StatusCodeBox result={result} />
                                ))}
                                {/* <Box bgcolor={grey[200]} sx={{
                                    borderRadius: '4px',
                                }}>
                                  
                                </Box> */}
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            ))}
        </Stack>
    );
}

function StatusCodeBox({ result }) {
    return (
        <Stack spacing={1} key={result.statusCode}>
            <Stack direction={'row'} alignItems="center">
                <Box
                    bgcolor={result.statusCode < 300 ? green[100] : red[100]}
                    sx={{
                        px: '0.7rem',
                        py: '0.2rem',
                        borderRadius: '4px',
                        mr: '0.7rem',
                        minWidth: '60px'
                    }}
                >
                    <Typography variant="body2" fontWeight={500} align="center">
                        {result.statusCode}
                    </Typography>
                </Box>
                <Typography variant="body2">{result.statusMessage}</Typography>
            </Stack>
            <Typography variant="body2">Body: {result.message}</Typography>
        </Stack>
    );
}
