import {useToast} from '@chakra-ui/react';
import {useAuth} from '../utils/auth';
import Auth from '../components/Auth';
import {useRouter} from 'next/router';

export default () => {
    const auth = useAuth();
    const toast = useToast();
    const router = useRouter();

    const signIn = ({email, pass}) => {
        auth.signin(email, pass)
            .then(() => {
                router.push('/members');
            })
            .catch((error) => {
                toast({
                    title: 'Ops! Ocorreu um erro.',
                    description: error.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            });
    };

    return <Auth type="Entrar" onSubmit={signIn} />;
};
