import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import MainLayout from '../layouts/MainLayout';
import { useRouter } from 'next/router';
import { AppWrapper } from '../src/utils/AppContext';
import AppLoader from '../src/utils/AppLoader';
import { SnackbarProvider } from 'notistack';
import { GlobalStyles } from '@mui/material';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    const router = useRouter();
    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <SnackbarProvider maxSnack={3}>
                    <AppWrapper>
                        <AppLoader>
                            <MainLayout type={router.pathname.startsWith('/dashboard/') ? 'dashboard' : 'website'}>
                                <Component {...pageProps} />
                            </MainLayout>
                        </AppLoader>
                    </AppWrapper>
                </SnackbarProvider>

            </ThemeProvider>
        </CacheProvider>
    );
}
