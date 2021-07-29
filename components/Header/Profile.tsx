import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile(){

    return(
        <Flex
        align="center"
       >
           <Box mr="4" textAlign="right">
               <Text>Marcio Fernandes</Text>
               <Text color="gray.300" fontSize="small">
                   farciomernandes@gmail.com
               </Text>
           </Box>

           <Avatar size="md" name="Marcio Fernandes" src="https://github.com/farciomernandes.png" />
       </Flex>
    )
}