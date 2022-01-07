import {
  AspectRatio,
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";

export default function Profile() {
  const rating = 3;
  const numRatings = 25;

  const numTrips = 3;

  return (
    <Container maxW="5xl" p="6">
      <VStack>
        <Box background="gray.300" w="52" h="52" rounded="full"></Box>
        <Heading>Andrew Gao</Heading>
        <Text display="flex" alignItems="center">
          {Array.from({ length: rating }).map(() => (
            <Icon as={FaStar} mr="1" />
          ))}
          {Array.from({ length: 5 - rating }).map(() => (
            <Icon as={FaRegStar} mr="1" />
          ))}
          ({numRatings})
        </Text>
        <Text display="flex" alignItems="center">
          Verified email <Icon as={FiCheckCircle} ml="1" />
        </Text>
        <Text>Joined August 2021</Text>

        <Heading as="h3" size="lg">
          About
        </Heading>
        <Text>College of Arts & Sciences</Text>
        <Text>Computer science</Text>
        <Text>Class of 2022</Text>

        <Heading as="h3" size="lg">
          Previous Trips ({numTrips})
        </Heading>
        <PreviousTrip />
        <PreviousTrip />
        <PreviousTrip />
      </VStack>
    </Container>
  );
}

function PreviousTrip() {
  return (
    <Box w="full" rounded="md" border="1px" borderColor="gray.200" p="3">
      <Heading as="h4" size="md">
        New York to Boston
      </Heading>
      <Text>Driver/Passenger</Text>
      <Text>Positive/negative experience</Text>
    </Box>
  );
}
