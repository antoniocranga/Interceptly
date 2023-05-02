import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SyntaxHighlight from '../src/utils/SyntaxHighlight';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import Endpoints from '../src/api/endpoints';
import { Button, Card, CardContent, CardMedia, Grid, Tab, Tabs, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import theme from '../src/theme';
import Head from 'next/head';
import Image from 'next/image';
import monitoring from '../public/assets/images/monitoring.svg';
import improve from '../public/assets/images/improve.svg';
import rocketbg from '../public/assets/images/rocket-bg.svg';
import rocket from '../public/assets/images/rocket.svg';
export default function Index({ stats }) {
    const [language, setLanguage] = React.useState(0);
    const handleChange = (event, newLanguage) => {
        setLanguage(newLanguage);
    };
    const theme = useTheme();
    const desktop = useMediaQuery(theme.breakpoints.up('lg'));
    const tablet = useMediaQuery(theme.breakpoints.up('sm'));
    const mobile = useMediaQuery(theme.breakpoints.up('xs'));
    const sizes = () => {
        if (desktop) return 'large';
        if (tablet) return 'large';
        if (mobile) return 'medium';
    };
    const languages = [
        {
            lang: 'java',
            label: 'Java',
            code: ` 
    try {
        // do some work
    } catch (Exception e) {
        // call Interceptly
    }         
            
`
        },
        {
            lang: 'python',
            label: 'Python',
            code: ` 
    try :
        # do some work 
    except Exception as e:
        # call Interceptly   

`
        },
        {
            lang: 'c',
            label: 'C++',
            code: ` 
    try {
        // do some work 
    } catch (Exception e) {
        // call Interceptly
    }

`
        },
        {
            lang: 'php',
            label: 'PHP',
            code: ` 
    try {
        // do some work 
    } catch (Exception $e) {
        // call Interceptly
    }
    
`
        },
        {
            lang: 'ruby',
            label: 'Ruby',
            code: ` 
    begin
        # do some work 
    rescue Exception => e
        # call Interceptly
    end
   
`
        },
        {
            lang: 'swift',
            label: 'Swift',
            code: ` 
    do {
        // do some work 
    } catch let error as Error {
        // call Interceptly
    }
   
`
        },
        {
            lang: 'kotlin',
            label: 'Kotlin',
            code: ` 
    try {
        // do some work 
    } catch (e: Exception) {
        // call Interceptly
    }
   
`
        },
        {
            lang: 'go',
            label: 'Go',
            code: ` 
    func someFunction() error {
        // do some work
    }

    if err := someFunction(); err != nil {
        // call Interceptly
    }
   
`
        }
    ];
    const code = `
  try{
    //do some work
  } 
  catch(Exception e){
    //call Interceptly
  }
  `;
    const features = [
        {
            src: monitoring,
            title: 'Monitor any web or mobile application',
            description: 'Prevents issues and enhances performance, leading to better business outcomes.'
        },
        {
            src: improve,
            title: 'Better performance better user experience',
            description: 'Enhance user satisfaction by solving issues from production.'
        },
        {
            src: null,
            title: 'Statistics up to 1 year',
            description:
                'Long-term statistics enable trend analysis, forecasting, and data-driven decision-making for informed strategic planning and performance evaluation.'
        },
        {
            src: null,
            title: 'Highly detailed events',
            description:
                'Detailed events provide granular insights for optimizing user experience, identifying issues, and enhancing application performance.'
        },
        {
            src: null,
            title: 'Easy and fast collaboration',
            description: 'Let your team know what exception they should have an eye on.'
        },
        {
            src: null,
            title: 'Stay notified',
            description:
                'Notifications provide timely information, enabling quick response, and reducing the risk of missing important updates or events.'
        }
    ];
    return (
        <Container maxWidth="md">
            <Head>
                <title>Interceptly | Cloud Based Error Tracker</title>
                <meta name="author" content={'Crangă Antonio-Cristian <antocranga@gmail.com>'}></meta>
                <meta
                    name="description"
                    content={
                        'Interceptly.xyz is a cloud based error tracker solution that helps developers to monitor and debug projects within two clicks.'
                    }
                />
            </Head>
            <Toolbar />
            <Typography variant="h3" fontWeight={700} align="center" mb={2}>
                Application Performance Monitoring
            </Typography>
            <Typography variant="body2" align="center" color={grey[700]}>
                Interceptly is a cloud based Application Performance Monitoring tool that helps developers to log issues and events and
                easily visualize them.
            </Typography>
            <Stack direction="row" justifyContent={'center'} spacing={2} mt={4}>
                <Button variant="contained" disableElevation size={sizes()} href="signup">
                    Try it for free
                </Button>
                <Button variant="outlined" size={sizes()} href="/documentation">
                    Go to documentation
                </Button>
            </Stack>
            <Box
                sx={{
                    mt: 6,
                    mb: 6,
                    pre: {
                        margin: '0px',
                        border: '1px solid',
                        borderRadius: '0px 0px 8px 8px',
                        borderColor: grey[300],
                        background: grey[100]
                    },
                    '& .MuiTab-root': {
                        typography: theme.typography.body2
                    }
                }}
            >
                <Tabs
                    value={language}
                    onChange={handleChange}
                    variant="scrollable"
                    aria-label="scrollable language selector"
                    sx={{
                        borderRight: '1px solid',
                        borderLeft: '1px solid',
                        borderTop: '1px solid',
                        borderRadius: '8px 8px 0px 0px',
                        borderColor: grey[300]
                    }}
                >
                    {languages.map((e, index) => (
                        <Tab key={'language-' + index} label={e.label} />
                    ))}
                </Tabs>
                <SyntaxHighlight language={languages[language].lang}>{languages[language].code}</SyntaxHighlight>
            </Box>
            <Grid container spacing={2} mb={2}>
                {features.map((e, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4}>
                        <Card
                            elevation={0}
                            sx={{
                                border: '1px solid',
                                borderColor: grey[300],
                                ':hover': {
                                    boxShadow: theme.custom.customBoxShadow,
                                    borderColor: theme.palette.primary.main
                                    // cursor: 'pointer'
                                }
                            }}
                        >
                            {e.src && (
                                <Image
                                    width="0"
                                    heigth="0"
                                    sizes="100vw"
                                    src={e.src}
                                    style={{
                                        width: '100%',
                                        height: 'auto'
                                    }}
                                />
                            )}
                            <Stack spacing={1} py={2} px={2}>
                                <Typography variant="body1" fontWeight={600}>
                                    {e.title}
                                </Typography>
                                <Typography variant="body2" color={grey[500]}>
                                    {e.description}
                                </Typography>
                            </Stack>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box
                sx={{
                    width: '100vw',
                    height: 'auto',
                    position: 'relative'
                }}
            >
                <Image
                    width="0"
                    heigth="0"
                    sizes="100vw"
                    src={rocketbg}
                    style={{
                        width: '100%',
                        height: 'auto'
                    }}
                />
                <Image
                    src={rocket}
                    width="180"
                    style={{
                        position: 'absolute',
                        zIndex: 10000,
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                />
            </Box>
            <Box>
                <Typography variant="h6" mb={2}>
                    Live stats
                </Typography>
                <Grid container height="100%" spacing={2}>
                    <Grid item xs={6} sm={3}>
                        <StatBox title="Events" value={stats.eventsCount} />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <StatBox title="Issues" value={stats.issuesCount} />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <StatBox title="Projects" value={stats.projectsCount} />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <StatBox title="Users" value={stats.usersCount} />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

function StatBox({ title, value }) {
    return (
        <Card
            elevation={0}
            sx={{
                height: '100%',
                border: '1px solid',
                borderColor: grey[300],
                ':hover': {
                    boxShadow: theme.custom.customBoxShadow,
                    borderColor: theme.palette.primary.main,
                    cursor: 'pointer'
                }
            }}
        >
            <CardContent>
                <Typography variant="body2" color={grey[500]}>
                    {title}
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                    {value}
                </Typography>
            </CardContent>
        </Card>
    );
}

export async function getStaticProps() {
    const response = await fetch(Endpoints.baseUrl + Endpoints.stats);
    const stats = await response.json();
    return {
        props: {
            stats
        }
    };
}
