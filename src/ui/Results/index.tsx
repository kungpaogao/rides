import { Box, Button, Flex, Grid, Input } from "@chakra-ui/react";
import ResultItem from "./ResultItem";

export default function Results() {
  return (
    <Flex direction="column" h="full">
      <Grid templateColumns={{ md: "repeat(4, 1fr)" }} gap={3} p="3">
        <Input placeholder="From" />
        <Input placeholder="To" />
        <Input placeholder="Date" />
        <Button>Search</Button>
      </Grid>
      <Flex flex="1" wrap="wrap">
        {/* TODO: move this full screen modal when screen is too small */}
        <Box
          borderRight={{ md: "1px" }}
          borderColor="gray.200"
          p="3"
          w={{ base: "full", md: "auto" }}
        >
          Filter Section
        </Box>
        <Box flex="1" w={{ base: "full", md: "auto" }} p="3">
          Main content
          <ResultItem />
        </Box>
      </Flex>
    </Flex>
  );
}
