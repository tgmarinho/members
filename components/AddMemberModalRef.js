import React, {Fragment} from 'react';
import {css} from '@emotion/react';
import {useForm, Controller} from 'react-hook-form';
import {useMutation} from '@apollo/react-hooks';
import {
    useDisclosure,
    Modal,
    Box,
    Flex,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Button,
    Switch,
    Stack,
    SimpleGrid,
    useToast,
} from '@chakra-ui/react';
import CustomMaskedInput from './CustomMaskedInput';
import {GET_MEMBERS_QUERY} from '../graphql/queries';
import {CREATE_MEMBER_MUTATION, UPDATE_MEMBER_MUTATION} from '../graphql/mutations';
import {withAuthModal} from './Auth';
import {useAuth} from '../utils/auth';

const defaultValues = {
    email: '',
    name: '',
    birth: null,
    cellphone: '',
    address: '',
    status: true,
    obs: '',
    gender: 'masculino',
    member_at: null,
    is_member_or_assist: 'Membro',
    last_update_at: new Date().setHours(0, 0, 0, 0),
};

const MemberContent = ({register, errors, control, buttonLabel, loading, onClose, ...rest}) => (
    <Stack {...rest}>
        <Input name="id" hidden ref={register} />
        <ModalHeader>Cadastro de Membro</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
            <SimpleGrid columns={{sm: 1, md: 2}} spacing={10}>
                <FormControl isInvalid={errors.name && errors.name.message}>
                    <FormLabel>Nome *</FormLabel>
                    <Input
                        name="name"
                        ref={register({
                            required: 'Informe o nome.',
                        })}
                        placeholder="Thiago Marinho"
                    />
                    <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.email && errors.email.message}>
                    <FormLabel>Email</FormLabel>
                    <Input name="email" placeholder="site@empresa.com" ref={register} type="email" />
                    <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.birth && errors.birth.message}>
                    <FormLabel>Data de Nascimento</FormLabel>
                    <Input name="birth" type="date" ref={register} />
                    {/* <Input name="birth" type="text" ref={register} pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}" /> */}
                    {/* <Controller
                        as={<CustomMaskedInput />}
                        control={control}
                        mask="9999-99-99"
                        name="birth"
                        ref={register}
                        transform={{
                            input: (value) => {
                                console.log.value('input: ', value);
                                return value === null ? '' : value.toString();
                            },
                            output: (e) => {
                                const output = e.target.value;
                                console.log('output: ', e.target.value);
                                // if(e.target.value.length > )
                                return output;
                            },
                        }}
                    /> */}

                    {/* <Controller as={CustomDatePicker} control={control} valueName="selected" name="birth" /> */}

                    <FormErrorMessage>{errors.birth && errors.birth.message}</FormErrorMessage>
                </FormControl>

                <FormControl as="fieldset">
                    <FormLabel as="legend">Sexo</FormLabel>
                    <Stack direction="row" spacing={8}>
                        <Stack direction="row" spacing="16px" align="center">
                            <input
                                css={css`
                                    cursor: pointer;
                                    width: 1rem;
                                    height: 1rem;
                                `}
                                id="gender-masc"
                                name="gender"
                                type="radio"
                                value="masculino"
                                ref={register}
                            />
                            <label htmlFor="gender-masc">Masculino</label>
                        </Stack>
                        <Stack direction="row" spacing="16px" align="center">
                            <input
                                css={css`
                                    cursor: pointer;
                                    width: 1rem;
                                    height: 1rem;
                                `}
                                id="gender-fem"
                                name="gender"
                                type="radio"
                                value="feminino"
                                ref={register}
                            />

                            <label htmlFor="gender-fem">Feminino</label>
                        </Stack>
                    </Stack>
                </FormControl>
                <FormControl isInvalid={errors.cellphone && errors.cellphone.message}>
                    <FormLabel>Celular</FormLabel>
                    <Controller
                        as={<CustomMaskedInput />}
                        control={control}
                        mask="(99) 99999-9999"
                        name="cellphone"
                        ref={register}
                        type="number"
                    />

                    <FormErrorMessage>{errors.cellphone && errors.cellphone.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.address && errors.address.message}>
                    <FormLabel>Endereço</FormLabel>
                    <Input name="address" placeholder="Rua Duque de Caxias, 76, Vila" ref={register} />
                    <FormErrorMessage>{errors.address && errors.address.message}</FormErrorMessage>
                </FormControl>

                <FormControl as="fieldset" isInvalid={errors.is_member_or_assist && errors.is_member_or_assist.message}>
                    <FormLabel as="legend">Frequenta como</FormLabel>
                    <Stack direction="row" spacing={8}>
                        <Stack direction="row" spacing="16px" align="center">
                            <input
                                css={css`
                                    cursor: pointer;
                                    width: 1rem;
                                    height: 1rem;
                                `}
                                id="is-membro"
                                name="is_member_or_assist"
                                type="radio"
                                value="Membro"
                                ref={register}
                            />
                            <label htmlFor="is-membro">Membro</label>
                        </Stack>
                        <Stack direction="row" spacing="16px" align="center">
                            <input
                                css={css`
                                    cursor: pointer;
                                    width: 1rem;
                                    height: 1rem;
                                `}
                                id="is-assistente"
                                name="is_member_or_assist"
                                type="radio"
                                value="Assistente"
                                ref={register}
                            />
                            <label htmlFor="is-assistente">Assistente</label>
                        </Stack>
                    </Stack>
                </FormControl>
                <FormControl as="fieldset">
                    <FormLabel as="legend">Inativo / Ativo</FormLabel>
                    <Switch colorScheme="teal" size="md" name="status" ref={register} />
                </FormControl>

                <FormControl isInvalid={errors.member_at && errors.member_at.message}>
                    <FormLabel>Data de Membresia</FormLabel>
                    <Input name="member_at" type="date" ref={register} pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}" />

                    <FormErrorMessage>{errors.member_at && errors.member_at.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.obs && errors.obs.message}>
                    <FormLabel>Observação</FormLabel>
                    <Input name="obs" placeholder="Escreva qualquer coisa..." ref={register} />
                    <FormErrorMessage>{errors.obs && errors.obs.message}</FormErrorMessage>
                </FormControl>
            </SimpleGrid>
        </ModalBody>

        <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button isLoading={loading} type="submit" colorScheme="teal" ml={3}>
                {buttonLabel}
            </Button>
        </ModalFooter>
    </Stack>
);

const MemberModal = ({isOpen, onClose, onSubmit, loading, member, buttonLabel}) => {
    const {handleSubmit, register, control, errors} = useForm({
        defaultValues: member || defaultValues,
    });
    return (
        <Modal motionPreset="slideInBottom" isOpen={isOpen} onClose={onClose} size={10}>
            <ModalOverlay />
            <ModalContent
                css={css`
                    width: 60rem;
                `}
                borderRadius={4}
                size="20px"
            >
                <MemberContent
                    as="form"
                    onSubmit={handleSubmit((data) =>
                        onSubmit(
                            {
                                ...data,
                                last_update_at: new Date(),
                            },
                            onClose
                        )
                    )}
                    register={register}
                    control={control}
                    errors={errors}
                    buttonLabel={buttonLabel}
                    loading={loading}
                    onClose={onClose}
                />
            </ModalContent>
        </Modal>
    );
};

const valid = (member) => {
    let newMember = member;
    if (member.birth === '') {
        newMember.birth = null;
    }
    if (member.member_at === '') {
        newMember.member_at = null;
    }
    return newMember;
};

const withAddMemberModal = (Component) => (props) => {
    const toast = useToast();
    const {userId} = useAuth();
    const {isOpen, onOpen, onClose} = useDisclosure();

    const [createMember, {loading}] = useMutation(CREATE_MEMBER_MUTATION);

    const onCreateMember = (member, onClose) => {
        delete member.id;
        createMember({
            variables: {
                member: valid(member),
            },
            update: (cache, {data}) => {
                const cachedData = cache.readQuery({
                    query: GET_MEMBERS_QUERY,
                    variables: {status: true},
                });

                const newMember = data?.insert_members_one;

                cache.writeQuery({
                    query: GET_MEMBERS_QUERY,
                    variables: {status: true},
                    data: {
                        ...cachedData,
                        members: [newMember, ...cachedData.members],
                    },
                });
            },
        })
            .then(() => {
                toast({
                    title: 'Membro adicionado.',
                    description: 'Membro foi adicionado com sucesso!.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
                onClose();
            })
            .catch((error) => {
                console.error(error);
                toast({
                    title: 'Ops! Ocorreu um erro.',
                    description: 'Erro ao adicionar o membro!',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            });
    };

    const onOpenAddMemberModal = () => {
        onOpen();
    };

    return (
        <Fragment>
            <MemberModal
                isOpen={isOpen}
                onClose={onClose}
                buttonLabel="Criar"
                onSubmit={onCreateMember}
                loading={loading}
            />
            <Button onClick={onOpenAddMemberModal} colorScheme="teal" variant="solid" minH="40px" w="100%">
                Adicionar novo
            </Button>
            <Component openAuthModal={onOpen} {...props} />
        </Fragment>
    );
};

export const withEditMemberModal = (Component) => (props) => {
    const toast = useToast();
    const {userId} = useAuth();
    const {isOpen, onOpen, onClose} = useDisclosure();

    const [updateMember, {loading}] = useMutation(UPDATE_MEMBER_MUTATION);

    const onUpdateMember = (member, onClose) => {
        updateMember({
            variables: {
                memberId: member.id,
                member,
            },
            update: (cache, {data}) => {
                const cachedData = cache.readQuery({
                    query: GET_MEMBERS_QUERY,
                    variables: {status: true},
                });

                const memberUpdated = data?.update_members?.returning[0];

                cache.writeQuery({
                    query: GET_MEMBERS_QUERY,
                    variables: {status: true},
                    data: {
                        ...cachedData,
                        members: [
                            memberUpdated,
                            ...cachedData.members.filter((member) => member.id !== memberUpdated.id),
                        ],
                    },
                });
            },
        })
            .then(() => {
                toast({
                    title: 'Membro atualizado.',
                    description: 'Membro foi atualizado com sucesso!.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
                onClose();
            })
            .catch((error) => {
                console.error(error);

                toast({
                    title: 'Ops! Ocorreu um erro.',
                    description: 'Erro ao atualizar o membro!',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            });
    };

    return (
        <>
            <MemberModal
                isOpen={isOpen}
                onClose={onClose}
                onSubmit={onUpdateMember}
                loading={loading}
                member={props}
                buttonLabel="Atualizar"
            />
            <Component openModalEditMember={onOpen} {...props} />
        </>
    );
};

export const AddMember = withAddMemberModal(MemberModal);
export const EditMember = withEditMemberModal(MemberModal);
