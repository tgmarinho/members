import {Drawer, DrawerBody, IconButton, useDisclosure, DrawerOverlay, DrawerContent} from '@chakra-ui/react';
import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {FiMenu} from 'react-icons/fi';

import SideNav from './SideNav';

const useRouteChanged = (callback) => {
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = (url) => {
            callback();
            console.log('App is changing to: ', url);
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events, callback]);
};

const MobileNav = () => {
    const {isOpen, onToggle, onClose} = useDisclosure();

    useRouteChanged(onClose);

    return (
        <>
            <IconButton
                aria-label="Navigation Menu"
                fontSize="20px"
                variant="ghost"
                display={{sm: 'inline-flex', md: 'none'}}
                colorScheme="blue"
                ml={2}
                icon={<FiMenu />}
                onClick={onToggle}
            />
            <Drawer size="xs" isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerBody p={0}>
                        <SideNav contentHeight="100vh" top="0" />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default MobileNav;
