import { Box, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

export default function ResultItem() {
  return (
    <Box w="full" rounded="md" border="1px" borderColor="gray.200" p="6">
      <Flex>
        <Box flex="1">
          <VStack align="flex-start">
            <Text fontWeight="bold" fontSize="xl">
              Boston to New York
            </Text>
            <Text>08/13/2021, 10:00 AM</Text>
            <Text display="flex" alignItems="center">
              abc123 (5 <Icon as={FaStar} ml="1" />)
            </Text>
          </VStack>
        </Box>
        <Box>
          <VStack align="flex-end">
            <Text fontSize="xl" fontWeight="bold">
              $50
            </Text>
            <Text fontSize="lg" display="flex" alignItems="center">
              <Icon as={FiUser} mr="1" />4
            </Text>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}
