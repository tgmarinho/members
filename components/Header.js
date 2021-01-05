import {Box, Flex, IconButton, useColorMode, Heading} from '@chakra-ui/react';
import {FiSun, FiMoon} from 'react-icons/fi';

import MobileNav from './MobileNav';

const Header = () => {
    const {colorMode, toggleColorMode} = useColorMode();

    const bg = {light: 'white', dark: 'gray.800'};

    return (
        <Box
            pos="fixed"
            as="header"
            top="0"
            zIndex="4"
            bg={bg[colorMode]}
            left="0"
            right="0"
            borderBottomWidth="1px"
            width="full"
            height="5rem"
        >
            <Box width="full" mx="auto" px={6} pr={[1, 6]} height="100%">
                <Flex size="100%" p={[0, 6]} pl={[0, 4]} align="center" justify="space-between">
                    <Box as="a" d="block" href="/" aria-label="members, Back to homepage">
                        <Heading>Members</Heading>
                    </Box>

                    <Flex align="center" color="gray.500">
                        <IconButton
                            aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
                            variant="ghost"
                            colorScheme="blue"
                            fontSize="20px"
                            onClick={toggleColorMode}
                            icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
                        />
                        <MobileNav />
                    </Flex>
                </Flex>
            </Box>
        </Box>
    );
};

export default Header;
