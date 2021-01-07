import {format, parseISO} from 'date-fns';
import {useColorMode, Box, Badge, Text, Flex, Stack, Checkbox, CheckboxGroup, useToast} from '@chakra-ui/react';
import Link from 'next/link';
import {withAuthModal} from './Auth';
import {withEditMemberModal} from './AddMemberModalRef';
import {FLIP_MEMBER_STATUS} from '../graphql/mutations';
import {useMutation} from '@apollo/react-hooks';
import {GET_MEMBERS_QUERY} from '../graphql/queries';
import {useCallback} from 'react';

const badgeColors = {
    Membro: 'blue',
    Assistente: 'orange',
};

const MemberCard = ({userId, id, name, cellphone, gender, status, birth, is_member_or_assist, openModalEditMember}) => {
    const {colorMode} = useColorMode();
    const toast = useToast();
    const [flipMemberStatus] = useMutation(FLIP_MEMBER_STATUS);

    const onFlipStatus = (status) => {
        flipMemberStatus({
            variables: {
                id,
                status,
            },
        })
            .then(({data}) => {
                const name = data?.update_members?.returning[0]?.name;
                toast({
                    title: 'Status do membro atualizado!',
                    description: `Membro ${name} foi inativado.`,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
            })
            .catch((error) => {
                console.error(error);
                toast({
                    title: 'Ops! Ocorreu um erro.',
                    description: `Erro ao atualizar status do usuário.`,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            });
    };

    const renderBirth = useCallback((birth) => {
        try {
            if (birth) {
                const dateFormatted = format(parseISO(birth), 'dd/MM');
                return dateFormatted;
            }
        } catch (error) {
            return 'Aniversário não informado.';
        }
    }, []);

    return (
        <Box
            borderWidth="1px"
            borderLeftWidth="11px"
            borderLeftColor={gender === 'masculino' ? '#42A5F5' : '#EC407A'}
            borderRadius={8}
            p={1}
            mb={2}
            bg={colorMode === 'light' ? 'white' : 'gray.800'}
            _hover={{backgroundColor: colorMode === 'light' ? 'gray.200' : 'gray.700'}}
        >
            <Flex>
                <Checkbox
                    p={2}
                    size="lg"
                    colorScheme="orange"
                    onChange={() => onFlipStatus(!status)}
                    isChecked={status}
                ></Checkbox>

                <Stack ml={3} mt={2} mb={2} w="100%" pr={4} onClick={() => openModalEditMember()}>
                    <Flex align="baseline">
                        <Badge colorScheme={badgeColors[is_member_or_assist]}>{is_member_or_assist}</Badge>
                    </Flex>
                    <Flex align="center" justify="space-between">
                        <Text fontSize="xl" fontWeight="semibold" lineHeight="short">
                            {name}
                        </Text>
                        <Box>
                            <Text fontSize="sm" fontWeight="semibold" lineHeight="short">
                                🥳
                            </Text>
                            <Text fontSize="sm" fontWeight="semibold" lineHeight="short">
                                {renderBirth(birth)}
                            </Text>
                        </Box>
                    </Flex>
                    <Text color="gray.400">{cellphone}</Text>
                </Stack>
            </Flex>
        </Box>
    );
};

export default withEditMemberModal(MemberCard);
