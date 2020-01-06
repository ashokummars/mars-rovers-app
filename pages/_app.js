import React from 'react';
import {Provider} from 'react-redux';
import App, {Container} from 'next/app';
import withRedux from 'next-redux-wrapper';
import MetaTags from 'react-meta-tags';
import { makeStore } from '../store';
import Layout from '../components/layout';

export default withRedux(makeStore, {debug: true})(
    class MyApp extends App {
        static async getInitialProps({Component, ctx}) {
            // Keep in mind that this will be called twice on server, one for page and second for error page
            await new Promise(res => {
                setTimeout(() => {
                    ctx.store.dispatch({type: 'TOE', payload: 'was set in _app'});
                    res();
                }, 200);
            });

            return {
                pageProps: {
                    // Call page-level getInitialProps
                    ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
                    // Some custom thing for all pages
                    pathname: ctx.pathname,
                },
            };
        }

        render() {
            const {Component, pageProps, store} = this.props;
            return (
                <Container>
                    <Provider store={store}>
                        <MetaTags>
                            <title>Mars Rovers App</title>
                            <meta name="description" content="Mars Rovers App" />
                            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                        </MetaTags>
                        <div className="nasa-rover">
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </div>
                    </Provider>
                    <style>{`
                        div.nasa-imagery-search-app{
                            margin: auto;
                            display: table;
                        }

                        div.nasa-rover{
                            font-family: sans-serif;
                            border: 1px solid #000;
                            padding: 18px;
                        }
                    `}
                    </style>
                </Container>
            );
        }
    },
);