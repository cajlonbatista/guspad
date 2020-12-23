
import React from 'react';

import App from 'next/app';

import { Provider } from 'react-redux';
import withRedux from "next-redux-wrapper";
import store from '../store/store';

import '../styles/globals.css';
import 'antd/dist/antd.css';

class MyApp extends App {

  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return { pageProps: pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
