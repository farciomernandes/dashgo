import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { SideBar } from "../../components/SideBar";

export default function UserList(){
    return(
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <SideBar />
                <Box flex="1" borderRadius={8} bg="gray.800" p="8" >
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">Usuários </Heading>

                        <Button 
                         as="a" 
                         size="sm" 
                         fontSize="sm" 
                         colorScheme="pink"
                         leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                         >
                            Criar novo usuário
                        </Button>
                    </Flex>
                
                    <Table colorScheme="whiteAlpha">
                        <Thead>
                            <Tr>
                                <Th px="6" color="gray.300" w="300">
                                    <Checkbox colorScheme="pink"></Checkbox>
                                </Th>
                                <Th> Usuário </Th>
                                <Th>Data de cadastro</Th>
                                <Th w="8"></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td pt="6">
                                    <Checkbox colorScheme="pink"></Checkbox>
                                </Td>
                                <Td>
                                    <Box>
                                        <Text fontWeight="bold">Macio Fernandes</Text>
                                        <Text fontSize="sm" color="gray.300">farciomernandes@gmail.com</Text>
                                    </Box>
                                </Td>
                                <Td>
                                    04 de abril de 2021
                                </Td>

                                <Td>
                                    <Button 
                                     as="a" 
                                     size="sm" 
                                     fontSize="sm" 
                                     colorScheme="purple"
                                     leftIcon={<Icon as={RiPencilLine} fontSize="18"  />}
                                     >
                                        Editar
                                    </Button>
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