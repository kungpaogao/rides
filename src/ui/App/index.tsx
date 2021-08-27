import {
  ChakraProvider,
  Box,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Home = lazy(() => import("../Home"));
const Navigation = lazy(() => import("../Navigation"));
const Profile = lazy(() => import("../Profile"));
const Results = lazy(() => import("../Results"));

const theme = extendTheme(withDefaultColorScheme({ colorScheme: "teal" }));

export default function App() {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Box h="100vh">
          <Suspense fallback="Loading...">
            <Navigation />
          </Suspense>
          <Suspense fallback="Loading...">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/results">
                <Results />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
            </Switch>
          </Suspense>
        </Box>
      </ChakraProvider>
    </Router>
  );
}
