import { Box, Button, Checkbox, Flex, Heading, Icon, Link, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import NextLink from "next/link";
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { SideBar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";


export default function UserList({ users }){
    const [ page, setPage ] = useState(1);
    const { data, isLoading, isFetching ,error } = useUsers(page, {
        initialData: users,
    });

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })



async function handlePrefetchUser(userId: number){
    await queryClient.prefetchQuery(['user', userId], async()=>{
        const response = await api.get(`users/${userId}`);

        return response.data;
    }, {
        staleTime: 1000 * 60 * 10 //10 minutos
    });
}


   

    return(
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px={["1", "6"]}>
                <SideBar />
                <Box flex="1" borderRadius={8} bg="gray.800" p={["3", "8"]} >
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">
                            Usuários 

                            { !isLoading && isFetching && <Spinner size="sm" color="gray.5000" ml={4} /> }
                        </Heading>

                       <NextLink href="/users/create" passHref>
                            <Button 
                              as="a" 
                              size="sm" 
                              fontSize="sm" 
                              colorScheme="pink"
                              leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                              >
                                Criar novo usuário
                            </Button>
                       </NextLink>
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
                                {data.users.map(user=> {
                                  return(
                                      <Tr key={user.id}>
                                      <Td px={["0", "4", "6"]}>
                                          <Checkbox colorScheme="pink"></Checkbox>
                                      </Td>
                                      <Td>
                                          <Box>
                                             <Link color="purple.400" onMouseEnter={()=>handlePrefetchUser(Number(user.id))}>
                                              <Text fontWeight="bold">{user.name}</Text>
                                             </Link>
                                              <Text fontSize="sm" color="gray.300">{user.email}</Text>
                                          </Box>
                                      </Td>
                                      {isWideVersion && <Td>{user.createdAt}</Td>}  
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
                                  )
                                })}
                            </Tbody>
                        </Table>
                        <Pagination
                          totalCountOfRegisters={data.totalCount}
                          currentPage={page}
                          onPageChange={setPage}
                        />
                    </>
                )}
                </Box>

            </Flex>

        </Box>
    );
}

export const getServerSideProps: GetServerSideProps = async()=>{
    const { users, totalCount } = await getUsers(1);
    return {
        props: {
            users
        }
    }
}