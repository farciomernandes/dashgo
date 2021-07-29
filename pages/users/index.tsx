import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { SideBar } from "../../components/Sidebar";

export default function UserList(){

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    return(
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px={["1", "6"]}>
                <SideBar />
                <Box flex="1" borderRadius={8} bg="gray.800" p={["3", "8"]} >
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">Usuários </Heading>

                       <Link href="/users/create" passHref>
                            <Button 
                              as="a" 
                              size="sm" 
                              fontSize="sm" 
                              colorScheme="pink"
                              leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                              >
                                Criar novo usuário
                            </Button>
                       </Link>
                    </Flex>
                
                    <Table colorScheme="whiteAlpha">
                        <Thead>
                            <Tr>
                                <Th px={["0", "4", "6"]} color="gray.300" w="300">
                                    <Checkbox colorScheme="pink"></Checkbox>
                                </Th>
                                <Th> Usuário </Th>
                                {isWideVersion && <Th>Data de cadastro</Th> }
                                <Th w="8"></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td px={["0", "4", "6"]}>
                                    <Checkbox colorScheme="pink"></Checkbox>
                                </Td>
                                <Td>
                                    <Box>
                                        <Text fontWeight="bold">Macio Fernandes</Text>
                                        <Text fontSize="sm" color="gray.300">farciomernandes@gmail.com</Text>
                                    </Box>
                                </Td>
                                {isWideVersion && <Td>04 de abril de 2021</Td>}

                                <Td>
                                    {isWideVersion && 
                                        <Button 
                                        as="a" 
                                        size="sm" 
                                        fontSize="sm" 
                                        colorScheme="purple"
                                        leftIcon={<Icon as={RiPencilLine} fontSize="18"  />}
                                        >
                                           Editar
                                       </Button>
                                    }
                                </Td>
                            </Tr>
                       
                        </Tbody>
                    </Table>
                    <Pagination />
                </Box>

            </Flex>

        </Box>
    );
}