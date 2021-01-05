import {useToast} from '@chakra-ui/react';
import {useAuth} from '../utils/auth';
import Auth from '../components/Auth';
import {useRouter} from 'next/router';

export default () => {
    const auth = useAuth();
    const toast = useToast();
    const router = useRouter();

    const signUp = ({email, pass}) => {
        auth.signup(email, pass)
            .then(() => {
                toast({
                    title: 'Sucesso! 🚀',
                    description: 'Sua conta foi criada!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                router.push('/signin');
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

    return <Auth type="Criar a Conta" onSubmit={signUp} />;
};
