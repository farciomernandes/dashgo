import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { useQuery } from 'react-query';

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { SideBar } from "../../components/Sidebar";

export default function UserList(){

    const {data, isLoading, error} = useQuery('users', async ()=>{//salva em cache os dados dessa requisicao em "users"
        const response = await fetch("http://localhost:3000/api/users");
        const data = await response.json();

        return data;
    }); 

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
                { isLoading ? (
                    <Flex justify="center">
                        <Spinner />
                    </Flex>
                ) : error ? ( //Execute isso se nao esta no loading e se acoteceu erro
                    <Flex justify="center">
                        <Text>Falha ao obter dados dos usuários.</Text>
                    </Flex>
                ) : (
                    <>

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
                
                    </>
                )}
                </Box>

            </Flex>

        </Box>
    );
}