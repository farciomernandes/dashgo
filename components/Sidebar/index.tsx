import { Box, DrawerHeader, DrawerOverlay, Drawer, DrawerCloseButton, DrawerContent, useBreakpointValue, DrawerBody } from "@chakra-ui/react";
import React from "react";
import { useSiderbarDrawer } from "../../contexts/SidebarDrawerContext";
import { SidebarNav } from "./SidebarNav";

export function SideBar(){

    const { isOpen, onClose } = useSiderbarDrawer();

    const isDrawerSidebar = useBreakpointValue({
        base: true,
        lg: false
    })

    if(isDrawerSidebar){
        return(
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay>
                <DrawerContent bg="gray.800" p="4">
                    <DrawerCloseButton me="6" />
                    <DrawerHeader>Navegação</DrawerHeader>

                    <DrawerBody>
                        <SidebarNav />
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    )
}

    return(
        <Box as="aside" w="64" mr="8">
            <SidebarNav />
        </Box>
    )
}