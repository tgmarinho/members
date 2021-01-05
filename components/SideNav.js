import {useColorMode, Stack, Text, Box, Flex} from '@chakra-ui/react';
import React from 'react';
import {MdDashboard, MdPeople} from 'react-icons/md';

import {ComponentLink} from './NavLink';
import {AddMember} from './AddMemberModalRef';
import Filters from './Filters';
import Map from '../icons/Map';

const SideNavLink = ({href, children, icon}) => (
    <ComponentLink href={href}>
        <Flex align="center" p={1}>
            <Box as={icon} mr={3} w="24px" />
            <Text fontWeight="bold">{children}</Text>
        </Flex>
    </ComponentLink>
);

const PageLinks = () => (
    <Stack spacing={0} mb={8}>
        <SideNavLink href="/dashboard" icon={MdDashboard}>
            {'Dashboard'}
        </SideNavLink>
        <SideNavLink href="/members" icon={MdPeople}>
            {'Membros'}
        </SideNavLink>

        {/* <SideNavLink href="/map" icon={Map}>
            {'Map'}
        </SideNavLink> */}
    </Stack>
);

const SideNav = (props) => {
    const {colorMode} = useColorMode();

    return (
        <Box
            backgroundColor={colorMode === 'light' ? 'white' : 'gray.800'}
            position="fixed"
            left="0"
            width="100%"
            height="100%"
            top="0"
            right="0"
            {...props}
        >
            <Box top="4rem" position="relative" overflowY="auto" borderRightWidth="1px">
                <Box>
                    <Flex justify="space-between" direction="column" height="calc(100vh - 4rem)" fontSize="sm" p="6">
                        <PageLinks />
                        {/* <Filters /> */}
                        <AddMember />
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
};

export default SideNav;
