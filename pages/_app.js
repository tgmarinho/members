import {Global, css} from '@emotion/react';
import {extendTheme, ChakraProvider} from '@chakra-ui/react';
import {DefaultSeo} from 'next-seo';
import React from 'react';
import seo from '../seo.config';
import {ProvideAuth} from '../utils/auth';
import {ProvideSearch} from '../utils/search';

const config = {
    useSystemColorMode: false,
    initialColorMode: 'dark',
};

const customTheme = extendTheme({config});

const App = ({Component, pageProps}) => (
    <ProvideAuth>
        <ChakraProvider theme={customTheme}>
            <Global
                styles={css`
                    #__next {
                        height: 100%;
                    }
                `}
            />
            <ProvideSearch>
                <DefaultSeo {...seo} />
                <Component {...pageProps} />
            </ProvideSearch>
        </ChakraProvider>
    </ProvideAuth>
);

export default App;
