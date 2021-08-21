import {
  ChakraProvider,
  Box,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../Home";
import Navigation from "../Navigation";
import Results from "../Results";

const theme = extendTheme(withDefaultColorScheme({ colorScheme: "teal" }));

export default function App() {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Box h="100vh">
          <Navigation />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/results">
              <Results />
            </Route>
          </Switch>
        </Box>
      </ChakraProvider>
    </Router>
  );
}
