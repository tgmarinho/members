import React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';
import {ColorModeScript} from '@chakra-ui/react';

const BodyScripts = () => (
    <>
        <script src="https://www.gstatic.com/firebasejs/8.2.0/firebase.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js"></script>
    </>
);

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return {...initialProps};
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta title="Members | Gerenciador de Membros." />
                    <link rel="icon" sizes="96x96" href="/favicon/favicon.ico" />
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                    />

                    <meta name="application-name" content="Members" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                    <meta name="apple-mobile-web-app-title" content="Members App" />
                    <meta name="description" content="App de Gerenciamento de Membros" />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="mobile-web-app-capable" content="yes" />
                    {/* <meta name="msapplication-config" content="/static/icons/browserconfig.xml" /> */}
                    <meta name="msapplication-TileColor" content="#2B5797" />
                    <meta name="msapplication-tap-highlight" content="no" />
                    <meta name="theme-color" content="#06092B" />

                    <link rel="apple-touch-icon" sizes="180x180" href="/images/icon-192x192.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon.ico" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon.ico" />

                    <link rel="manifest" href="/manifest.json" />
                    {/* <link rel="mask-icon" href="/static/icons/safari-pinned-tab.svg" color="#5bbad5" /> */}
                    <link rel="shortcut icon" href="/static/icons/favicon.ico" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

                    {/* <meta name="twitter:card" content="summary" />
                    <meta name="twitter:url" content="https://yourdomain.com" />
                    <meta name="twitter:title" content="PWA App" />
                    <meta name="twitter:description" content="Best PWA App in the world" />
                    <meta
                        name="twitter:image"
                        content="https://yourdomain.com/static/icons/android-chrome-192x192.png"
                    />
                    <meta name="twitter:creator" content="@DavidWShadow" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="PWA App" />
                    <meta property="og:description" content="Best PWA App in the world" />
                    <meta property="og:site_name" content="PWA App" />
                    <meta property="og:url" content="https://yourdomain.com" />
                    <meta property="og:image" content="https://yourdomain.com/static/icons/apple-touch-icon.png" /> */}

                    <link rel="manifest" href="/manifest.json" />
                    <link href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css" rel="stylesheet" />
                </Head>
                <body>
                    <ColorModeScript />
                    <Main />
                    <NextScript />
                    {process.env.NODE_ENV === `production` && <BodyScripts />}
                </body>
            </Html>
        );
    }
}

export default MyDocument;
