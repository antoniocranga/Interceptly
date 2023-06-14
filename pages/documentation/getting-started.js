import { AnchorOutlined } from '@mui/icons-material';
import { Breadcrumbs, Link, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import AnchorLink from '../../src/components/documentation/AnchorLink';
import Code from '../../src/components/documentation/Code';
import theme from '../../src/theme';
import SyntaxHighlight from '../../src/utils/SyntaxHighlight';
import Head from 'next/head';

export default function GettingStarted() {
    const code = `
  try{
    //do some work
  }
  catch(Exception e){
    //call Interceptly
  }
  `;
    return (
        <Stack spacing={4}>
            <Head>
                <title></title>
                <meta
                    name="description"
                    content={
                        'Interceptly.xyz is a cloud based error tracker solution that helps developers to monitor and debug projects within two clicks.'
                    }
                />
            </Head>
            <Breadcrumbs aria-label="breadcrumb">
                <Link href="/documentation" color="inherit" underline="hover">
                    Documentation
                </Link>
                <Link href="/documentation/getting-started" color="text.primary" underline="hover" aria-current="page">
                    Getting started
                </Link>
            </Breadcrumbs>
            <Typography variant="h4" fontWeight={600}>
                Getting Started
            </Typography>
            <Typography variant="body1">Welcome to {process.env.NEXT_PUBLIC_APP_NAME} documentation!</Typography>
            <Typography variant="body1">
                {process.env.NEXT_PUBLIC_APP_NAME} is a quick and simple application performance monitoring that helps tracking the issues
                that may appear during usage of your application/service.
            </Typography>
            <Box id="create-project">
                <AnchorLink href="/documentation/getting-started#create-project" label="Create a project" />
                <Typography variant="body1">
                    Visit <Code href={`${process.env.NEXT_PUBLIC_HOST_NAME}/dashboard`}>{process.env.NEXT_PUBLIC_HOST_NAME}/dashboard</Code> and create a new project by pressing on the card. 
                </Typography>
            </Box>
            <Box id="setup">
                <AnchorLink href="/documentation/getting-started#setup" label="Setup" />
                <Typography variant="body1">
                    {process.env.NEXT_PUBLIC_APP_NAME} works in any environment that can handle an API request to our service. 
                </Typography>
                <SyntaxHighlight>{code}</SyntaxHighlight>
            </Box>
        </Stack>
    );
}
