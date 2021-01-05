import {useCallback} from 'react';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';
import {
    Heading,
    Text,
    Flex,
    Spinner,
    Button,
    Box,
    useColorMode,
    List,
    SimpleGrid,
    Stack,
    Skeleton,
    ListItem,
    Divider,
    ListIcon,
    FormControl,
    FormLabel,
    Switch,
} from '@chakra-ui/react';
import {useDashboard, useMembers, useBirthdaysByMonth} from '../graphql/hooks';
import {useAuth} from '../utils/auth';
import {useSearch} from '../utils/search';

import {withApollo} from '../graphql/apollo';
import App from '../components/App';
import MemberCard from '../components/MemberCard';
import EmptySearch from '../components/EmptySearch';
import {useState, useEffect} from 'react';
import Lottie from 'react-lottie';
import {reportSmart} from '../utils/ReportSmartMembers';
import {css} from '@emotion/react';
import animationData from '../components/party5.json';
import {useRouter} from 'next/router';

const defaultValues = {
    nr: true,
    name: true,
    cellphone: false,
    birth: false,
    email: false,
    is_member_or_assist: false,
    obs: false,
    gender: false,
    member_at: false,
};

const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
};

const Dashboard = () => {
    const {userId, loading: loadingUser} = useAuth();

    const router = useRouter();

    if (typeof window !== 'undefined' && !userId) {
        router.push('/signin');
    }

    const {data, loading} = useDashboard();
    const {data: dataReport, loading: loadingReport} = useMembers();

    const [pointer, setPointer] = useState(new Date().getMonth() + 1);
    const {birthdays, loadingBirthdays} = useBirthdaysByMonth(pointer);
    const {colorMode} = useColorMode();
    const [reportValues, setReportValues] = useState(defaultValues);
    const [isStopped, setIsStopped] = useState(false);

    const handleCheckChange = (field) => (event) => {
        setReportValues({...reportValues, [field]: event.target.checked});
    };
    const handleGeneratePdf = useCallback(() => {
        let {members} = dataReport;

        reportSmart(members, reportValues);
    }, [dataReport]);

    const {nr, name, cellphone, birth, email, obs, gender, member_at, is_member_or_assist} = reportValues;

    const [months, setMonths] = useState([
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ]);

    const onChangeMonth = (pointer) => {
        setPointer(pointer);
        setIsStopped(false);
    };

    const time = useCallback(
        () =>
            setTimeout(() => {
                setIsStopped(true);
            }, 4000),
        [isStopped]
    );

    useEffect(() => {
        time();
    }, [pointer]);

    const renderRelatorio = () => (
        <Box
            boxShadow="lg"
            borderWidth="1px"
            borderRadius={8}
            p={4}
            mb={2}
            mt={[1, 8]}
            bg={colorMode === 'light' ? 'white' : 'gray.800'}
        >
            <Text as="b" color="tomato">
                Relatórios
            </Text>
            <SimpleGrid columns={{sm: 1, md: 2}} spacing={2} mb={8} mt={8}>
                <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="nr" mb="0">
                        Número
                    </FormLabel>
                    <Switch id="nr" size="md" isChecked={nr} onChange={handleCheckChange('nr')} value="nr" />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="name" mb="0">
                        Nome
                    </FormLabel>
                    <Switch id="name" size="md" isChecked={name} onChange={handleCheckChange('name')} value="name" />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="email" mb="0">
                        Email
                    </FormLabel>
                    <Switch
                        id="email"
                        size="md"
                        isChecked={email}
                        onChange={handleCheckChange('email')}
                        value="email"
                    />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="cellphone" mb="0">
                        Celular
                    </FormLabel>
                    <Switch
                        id="cellphone"
                        size="md"
                        isChecked={cellphone}
                        onChange={handleCheckChange('cellphone')}
                        value="cellphone"
                    />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="gender" mb="0">
                        Sexo
                    </FormLabel>
                    <Switch
                        id="gender"
                        size="md"
                        isChecked={gender}
                        onChange={handleCheckChange('gender')}
                        value="gender"
                    />
                </FormControl>

                <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="birth" mb="0">
                        Aniversário
                    </FormLabel>
                    <Switch
                        id="birth"
                        size="md"
                        isChecked={birth}
                        onChange={handleCheckChange('birth')}
                        value="birth"
                    />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="member_at" mb="0">
                        Data de Membresia
                    </FormLabel>
                    <Switch
                        id="member_at"
                        size="md"
                        isChecked={member_at}
                        onChange={handleCheckChange('member_at')}
                        value="member_at"
                    />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="obs" mb="0">
                        Observação
                    </FormLabel>
                    <Switch id="obs" size="md" isChecked={obs} onChange={handleCheckChange('obs')} value="obs" />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="is_member_or_assist" mb="0">
                        Tipo de Membresia
                    </FormLabel>
                    <Switch
                        id="is_member_or_assist"
                        size="md"
                        isChecked={is_member_or_assist}
                        onChange={handleCheckChange('is_member_or_assist')}
                        value="is_member_or_assist"
                    />
                </FormControl>
            </SimpleGrid>
            <Button isLoading={loadingReport} colorScheme="teal" onClick={handleGeneratePdf}>
                Gerar Relatório
            </Button>
        </Box>
    );

    return (
        <App width="full" maxWidth="1280px" mx="auto" px={6} py={6}>
            <Text fontWeight="bold" fontSize="sm">
                {'Dashboard '}
            </Text>
            <Divider mt={4} />

            {loading ? (
                <SimpleGrid columns={{sm: 1, md: 4}} spacing={6} mt={6}>
                    {[1, 2, 3, 4].map((_, index) => (
                        <Box
                            boxShadow="lg"
                            key={index}
                            borderWidth="1px"
                            borderBottomWidth="2px"
                            borderRadius={8}
                            h={200}
                            p={4}
                            mb={2}
                            bg={colorMode === 'light' ? 'white' : 'gray.800'}
                            d="row"
                        >
                            {[1, 2, 3, 4, 5].map((_, index) => (
                                <Skeleton key={index} mt={2} height="20px" width="100%" align="center" />
                            ))}
                        </Box>
                    ))}
                </SimpleGrid>
            ) : (
                <SimpleGrid columns={{sm: 2, md: 3, lg: 4}} spacing={6} mt={8}>
                    <Flex
                        borderWidth="1px"
                        borderBottomWidth="2px"
                        borderRadius={8}
                        boxShadow="lg"
                        p={8}
                        bg={colorMode === 'light' ? 'white' : 'gray.800'}
                        direction="column"
                    >
                        <Text as="h3" fontWeight="bold">
                            Membros
                        </Text>
                        <Divider mb={2} pt={1} />
                        <Text as="small">Ativos: {data.MEMBERS_ACTIVE}</Text>
                        <Text as="small">Inativos: {data.MEMBERS_INACTIVE}</Text>
                    </Flex>
                    <Flex
                        borderWidth="1px"
                        borderBottomWidth="2px"
                        borderRadius={8}
                        boxShadow="lg"
                        p={8}
                        bg={colorMode === 'light' ? 'white' : 'gray.800'}
                        direction="column"
                    >
                        <Text as="h3" fontWeight="bold">
                            Assistentes
                        </Text>
                        <Divider mb={2} pt={1} />
                        <Text as="small">Ativos: {data.ASSISTENTS_ACTIVE}</Text>
                        <Text as="small">Inativos: {data.ASSISTENTS_INACTIVE}</Text>
                    </Flex>

                    <Flex
                        borderWidth="1px"
                        borderBottomWidth="2px"
                        borderRadius={8}
                        boxShadow="lg"
                        p={8}
                        bg={colorMode === 'light' ? 'white' : 'gray.800'}
                        direction="column"
                    >
                        <Text as="h3" fontWeight="bold">
                            Gênero
                        </Text>
                        <Divider mb={2} pt={1} />
                        <Box as="small">Masculino: {data.MALE}</Box>
                        <Box as="small">Feminino: {data.FEMALE}</Box>
                    </Flex>

                    <Flex
                        borderWidth="1px"
                        borderBottomWidth="2px"
                        borderRadius={8}
                        boxShadow="lg"
                        p={8}
                        bg={colorMode === 'light' ? 'white' : 'gray.800'}
                        direction="column"
                    >
                        <Text as="h3" fontWeight="bold">
                            Faixa Etária
                        </Text>
                        <Divider mb={2} p={1} />
                        <Text as="small">Idosos: {data.ANCIENT_ACTIVE}</Text>
                        <Text as="small">Adutos: {data.ADULT_ACTIVE}</Text>
                        <Text as="small">Jovens: {data.YOUNG_ACTIVE}</Text>
                        <Text as="small">Adolescentes: {data.TEEN_ACTIVE}</Text>
                        <Text as="small">Crianças: {data.CHILDREEN_ACTIVE}</Text>
                    </Flex>
                </SimpleGrid>
            )}

            {loadingBirthdays ? (
                <SimpleGrid columns={[1, 2]} spacing={8}>
                    <Box
                        borderWidth="1px"
                        borderRadius={8}
                        p={4}
                        mb={2}
                        mt={8}
                        bg={colorMode === 'light' ? 'white' : 'gray.800'}
                    >
                        <Text as="b" color="tomato">
                            Aniversariantes
                        </Text>
                        <Flex mt={4} align="center">
                            <Button
                                bg={colorMode === 'light' ? 'white' : 'gray.800'}
                                mr={4}
                                disabled={pointer === 1}
                                onClick={() => onChangeMonth(pointer - 1)}
                            >
                                <FaArrowLeft />
                            </Button>

                            <Heading as="h2" size="md">
                                {months[pointer - 1]}
                            </Heading>
                            <Button
                                bg={colorMode === 'light' ? 'white' : 'gray.800'}
                                ml={4}
                                disabled={pointer === 12}
                                onClick={() => {
                                    onChangeMonth(pointer + 1);
                                }}
                            >
                                <FaArrowRight />
                            </Button>
                        </Flex>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
                            <Skeleton key={index} mt={4} height="20px" width="80%" align="center" />
                        ))}
                    </Box>
                    {renderRelatorio()}
                </SimpleGrid>
            ) : (
                <SimpleGrid columns={[1, 2]} spacing={8}>
                    <Box
                        boxShadow="lg"
                        borderWidth="1px"
                        borderRadius={8}
                        p={4}
                        mb={2}
                        mt={8}
                        bg={colorMode === 'light' ? 'white' : 'gray.800'}
                    >
                        <Box
                            css={css`
                                position: absolute;
                                top: 45%;
                                display: ${isStopped ? 'none' : 'block'};
                                z-index: 999;
                            `}
                        >
                            <Lottie options={defaultOptions} height={400} width={300} />
                        </Box>

                        <Text as="b" color="tomato">
                            Aniversariantes
                        </Text>
                        <Flex mt={4} align="center">
                            <Button
                                bg={colorMode === 'light' ? 'white' : 'gray.800'}
                                mr={4}
                                disabled={pointer === 1}
                                onClick={() => onChangeMonth(pointer - 1)}
                            >
                                <FaArrowLeft />
                            </Button>

                            <Heading as="h2" size="md">
                                {months[pointer - 1]}
                            </Heading>
                            <Button
                                bg={colorMode === 'light' ? 'white' : 'gray.800'}
                                ml={4}
                                disabled={pointer === 12}
                                onClick={() => {
                                    onChangeMonth(pointer + 1);
                                }}
                            >
                                <FaArrowRight />
                            </Button>
                        </Flex>
                        <Flex mt={4} align="center">
                            <List>
                                {birthdays?.byMonth.map(({id, day, name}) => (
                                    <ListItem key={id}>
                                        {day} - {name}
                                    </ListItem>
                                ))}
                            </List>
                        </Flex>
                    </Box>
                    {renderRelatorio()}
                </SimpleGrid>
            )}
        </App>
    );
};

export default withApollo(Dashboard, {
    ssr: false,
});
