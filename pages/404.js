import {Box, Flex, Heading, Text, Button} from '@chakra-ui/react';
import NextLink from 'next/link';

export const Container = (props) => <Box width="full" maxWidth="1280px" mx="auto" px={6} {...props} />;

const Header = ({onSignIn}) => (
    <Box as="header" width="full" height="4rem">
        <Box width="full" mx="auto" px={6} pr={[1, 6]} height="100%">
            <Flex size="100%" p={[0, 6]} pl={[0, 4]} align="center" justify="space-between">
                <Box as="a" d="block" href="/" aria-label="members, Back to homepage">
                    <Heading>Members</Heading>
                </Box>
                <Flex align="center">
                    <Button onClick={onSignIn} variant="ghost">
                        {'Entrar'}
                    </Button>
                    <NextLink href="/members" passHref>
                        <Button as="a">{'Membros'}</Button>
                    </NextLink>
                </Flex>
            </Flex>
        </Box>
    </Box>
);

const ErrorPage = ({onSignIn}) => {
    return (
        <Box h="100vh">
            <Header onSignIn={onSignIn} />
            <Box as="section" pt={40} pb={24}>
                <Container>
                    <Box maxW="xl" mx="auto" textAlign="center">
                        <Heading as="h1" size="xl" fontWeight="black">
                            Ops! Página não encontrada!
                        </Heading>

                        <Text opacity="0.7" fontSize="lg" mt="6">
                            Clique no botão abaixo.
                        </Text>

                        <Box mt="6">
                            <NextLink href="/" passHref>
                                <Button size="lg" as="a" colorScheme="teal">
                                    Voltar para Home
                                </Button>
                            </NextLink>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default ErrorPage;
