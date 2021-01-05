import {Fragment, useRef, useState, useEffect} from 'react';
import {
    useColorMode,
    Switch,
    Text,
    Flex,
    Divider,
    Icon,
    Stack,
    Skeleton,
    Box,
    InputGroup,
    InputLeftElement,
    Input,
} from '@chakra-ui/react';
import {useMembers} from '../graphql/hooks';
import {useAuth} from '../utils/auth';
import {useSearch} from '../utils/search';
import {withApollo} from '../graphql/apollo';
import App from '../components/App';
import MemberCard from '../components/MemberCard';
import {AddMember} from '../components/AddMemberModalRef';
import EmptySearch from '../components/EmptySearch';
import {useRouter} from 'next/router';

const useKeyPress = (targetKey) => {
    const [keyPressed, setKeyPressed] = useState(false);

    const downHandler = ({key}) => {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    };

    const upHandler = ({key}) => {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);

        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, []);

    return keyPressed;
};

const MembersPage = () => {
    const {userId, signout} = useAuth();
    const [statusMember, setStatusMember] = useState(true);
    const router = useRouter();
    const inputRef = useRef();

    if (typeof window !== 'undefined' && !userId) {
        router.push('/signin');
    }

    const slashPress = useKeyPress('/');

    if (slashPress) {
        inputRef.current.focus();
    }

    const {search, onSearch, genderFilteres} = useSearch();
    const {data, loading} = useMembers();
    const {colorMode} = useColorMode();
    const matchesSearch = (member) => member.name.toLowerCase().includes(search.toLowerCase());
    const allMembers = data ? data?.members : [];
    const matchesStatus = (member) => member.status === statusMember;
    const filteredMembers = allMembers.filter(matchesSearch).filter(matchesStatus); //.filter(matchesGender);

    return (
        <App width="full" maxWidth="1280px" mx="auto" px={6} py={6}>
            <Text mb={2} fontSize="sm">
                <b>{`Membros ${statusMember ? 'Ativos' : 'Inativos'}`}</b>
            </Text>
            <Divider mt={4} />
            <InputGroup width="100%" mt={8} mb={4} align="center">
                <InputLeftElement children={<Icon name="search" color="gray.500" />} />
                <Input
                    type="text"
                    onChange={onSearch}
                    value={search}
                    size="lg"
                    ref={inputRef}
                    autoFocus={slashPress}
                    focusBorderColor="blue.500"
                    placeholder={`Procurar por membros (Digite "/" para focar)`}
                    bg={colorMode === 'light' ? 'white' : 'gray.700'}
                />
            </InputGroup>

            <Stack direction="row" align="center" mb={8}>
                <Text as="b">Filtro por membros Inativos/Ativos: </Text>
                <Switch
                    defaultIsChecked={true}
                    colorScheme="blue"
                    size="md"
                    isChecked={statusMember}
                    onChange={() => setStatusMember(!statusMember)}
                />
            </Stack>

            {loading && !userId ? (
                <Stack>
                    {[1, 2, 3, 4, 5, 6].map((_, index) => (
                        <Box
                            key={index}
                            borderWidth="1px"
                            borderLeftWidth="11px"
                            borderLeftColor={index % 2 === 0 ? '#42A5F5' : '#EC407A'}
                            borderRadius={8}
                            p={1}
                            mb={2}
                            bg={colorMode === 'light' ? 'white' : 'gray.800'}
                            _hover={{backgroundColor: colorMode === 'light' ? 'gray.200' : 'gray.700'}}
                        >
                            <Skeleton height="20px" />
                            <Skeleton mt={2} height="20px" />
                            <Skeleton mt={2} height="20px" />
                            <Skeleton mt={2} height="20px" />
                        </Box>
                    ))}
                </Stack>
            ) : (
                <Fragment>
                    {filteredMembers.length && userId ? (
                        filteredMembers.map((member) => <MemberCard key={member.id} userId={userId} {...member} />)
                    ) : (
                        <EmptySearch />
                    )}
                    <Flex justify="flex-end" as="i" color="gray.500">
                        {`Exibindo ${filteredMembers.length} de ${allMembers.length} total de membros`}
                    </Flex>
                    <Flex mt={8} display={['block', 'none', 'none', 'none']}>
                        <AddMember />
                    </Flex>
                </Fragment>
            )}
        </App>
    );
};

export default withApollo(MembersPage, {
    ssr: false,
});
