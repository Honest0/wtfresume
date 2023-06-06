import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { appStore } from '../../src/redux/store';
import withReduxStore from '../../src/lib/with-redux-store';
import { ToastContainer } from 'react-toastify';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import Head from 'next/head';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

import 'react-tippy/dist/tippy.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-toastify/dist/ReactToastify.css';
import '../../src/theme/main.scss';

import { Colors } from '@colors';

const theme = {
    colors: {
        ...Colors,
    },
};

class MyApp extends App {
    constructor(props: any) {
        super(props);
        this.persistor = persistStore(props.reduxStore);
    }

    persistor: any;

    render() {
        const { Component, pageProps } = this.props;
        return (
            <>
                <Head>
                    <title>wtfresume | free resume builder</title>
                    <meta name="description" content="A modern real time design and 100% free resume builder."></meta>
                </Head>
                <Provider store={appStore}>
                    <PersistGate loading={<Component {...pageProps} />} persistor={this.persistor}>
                        <ThemeProvider theme={theme}>
                            <Component {...pageProps} />
                        </ThemeProvider>
                    </PersistGate>
                </Provider>
                <ToastContainer />
            </>
        );
    }
}

export default withReduxStore(MyApp);
