import { ChakraProvider, Box, Grid, theme, VStack } from "@chakra-ui/react";
import Home from "../Home";

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack>
            <Home />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}
