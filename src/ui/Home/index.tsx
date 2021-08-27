import {
  Container,
  Heading,
  Stack,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Button,
  VStack,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useState } from "react";
import { FiMapPin } from "react-icons/fi";
import DayPickerInput from "../DayPickerInput";

export default function Home() {
  const dateFormat = "M/d/yyyy";
  const [date, setDate] = useState(format(new Date(), dateFormat));

  return (
    <Container maxW="5xl">
      <VStack pt="5">
        <Heading my="3" fontWeight={600} fontSize="5xl" lineHeight="110%">
          Find a ride
        </Heading>
        <Box w="max" borderWidth="1px" rounded="md" p="6" boxShadow="base">
          {date}
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
            <DayPickerInput
              date={date}
              setDate={setDate}
              inputProps={{ size: "lg" }}
            />
            <Button>Search</Button>
          </Stack>
        </Box>
      </VStack>
    </Container>
  );
}
