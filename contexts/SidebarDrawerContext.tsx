import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { createContext, ReactNode, useContext } from "react";

interface SidebarDrawerProviderProps{
    children: ReactNode;
}

type SideBarDrawerContextData = UseDisclosureReturn;

const SidebarDrawerContext = createContext({} as SideBarDrawerContextData);

export function SidebarDrawerProvider({ children }: SidebarDrawerProviderProps ){
    const discloser = useDisclosure();
    const router = useRouter();

    useEffect(()=>{
        discloser.onClose();
    },[router.asPath])

    return(
        <SidebarDrawerContext.Provider value={discloser}>
            {children}
        </SidebarDrawerContext.Provider>
    );
}

export const useSiderbarDrawer = () => useContext(SidebarDrawerContext);