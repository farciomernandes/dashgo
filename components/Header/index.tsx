import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';
import { useSiderbarDrawer } from '../../contexts/SidebarDrawerContext';

import { Logo } from './Logo';
import { NotificationsNav } from './NotificationsNav';
import { Profile } from './Profile';
import { SearchBox } from './SearchBox';

export function Header(){
    const { onOpen } = useSiderbarDrawer();

    const isWideVersion = useBreakpointValue({
        base: false, //Para tela mobile, nao quero inf do perfil
        lg: true //se a tela estiver grande pode retornar true pq quero as inf do perfil
    })

    return(
        <Flex 
        as="header" 
        w="100%" 
        maxWidth={1480}
        h="20"
        mx="auto"
        mt="4"
        px="6"
        align="center"
        >

            {! isWideVersion && (
                 <IconButton
                 aria-label="Open navigation"
                 icon={<Icon as={RiMenuLine}/>}
                 fontSize="24"
                 variant="unstyled"
                 onClick={onOpen}
                 mr="2"
               />
            )}
            
          <Logo />
            {isWideVersion && ( <SearchBox /> )}
           

            <Flex
             align="center"
             ml="auto"
            >
                <NotificationsNav />

               <Profile showProfileData={isWideVersion} />
            </Flex>
        </Flex>
    );
}