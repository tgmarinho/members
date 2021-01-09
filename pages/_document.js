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
                    <link rel="icon" sizes="96x96" href="/favicons/favicon.ico" />
                    <meta name="theme-color" content="#319795"></meta>
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
