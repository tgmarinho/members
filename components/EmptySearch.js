import {Stack, Text, Flex, Icon} from '@chakra-ui/react';
import React from 'react';

const EmptySearch = () => {
    return (
        <Flex justify="center" textAlign="center" mb={8} py={12}>
            <Stack align="center">
                <Icon name="search" size="64px" color="gray.500" />
                <Text fontSize="xl" fontWeight="bold" mt={4}>
                    Nenhum membro encontrado!
                </Text>
                <Text color="gray.400">Nenhum membro encontrado com o termpo buscado.</Text>
            </Stack>
        </Flex>
    );
};

export default EmptySearch;
