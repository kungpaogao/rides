import {
  Container,
  Heading,
  Text,
  Stack,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Button,
} from "@chakra-ui/react";
import { FiCalendar, FiMapPin } from "react-icons/fi";

export default function Home() {
  return (
    <Container maxW="5xl">
      <Stack align="center">
        <Heading fontWeight={600} fontSize="6xl" lineHeight="110%">
          <Text>Find a ride</Text>
        </Heading>
        <Box w="max" borderWidth="1px" rounded="md" p="6" boxShadow="base">
          <Stack spacing={3}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                h="full"
                children={<Icon as={FiMapPin} />}
              />
              <Input placeholder="From" size="lg" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                h="full"
                children={<Icon as={FiMapPin} />}
              />
              <Input placeholder="To" size="lg" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                h="full"
                children={<Icon as={FiCalendar} />}
              />
              <Input placeholder="Date" size="lg" />
            </InputGroup>
            <Button>Search</Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
