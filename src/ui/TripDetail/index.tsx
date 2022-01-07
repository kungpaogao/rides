import {
  AspectRatio,
  Box,
  Button,
  Container,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function TripDetail() {
  return (
    <Container maxW="5xl" p="6">
      <VStack align="left">
        {/* Trip detail section */}
        <Heading>Boston to New York</Heading>
        <Heading as="h3" size="md" fontWeight="normal" pb="6">
          August 30, 2021 at 3:00pm
        </Heading>
        <AspectRatio ratio={5 / 1}>
          <Box w="full" h="full" rounded="md" background="gray.300">
            Map support coming soon
          </Box>
        </AspectRatio>
        {/* Rider detail section */}
        <Text pt="6">
          <b>Driver:</b> <Link>Andrew Gao (ag974)</Link>
        </Text>
        <Text>
          <b>Passengers (2/4):</b> <Link>John Smith (js577)</Link>,{" "}
          <Link>Chris Jones (cj225)</Link>
        </Text>
        <Text pb="6">
          <b>Notes:</b> None provided.
        </Text>
        {/* Action section */}
        <Button>Join ride</Button>
        <Button variant="outline">Edit ride</Button>
        <Button colorScheme="red">Leave ride</Button>
      </VStack>
    </Container>
  );
}
