import { HStack, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Navigation() {
  return (
    <HStack
      w="full"
      p="3"
      boxShadow="base"
      borderBottom="1px"
      borderColor="gray.300"
    >
      <Link as={RouterLink} to="/">
        Home
      </Link>
      <Link as={RouterLink} to="/results">
        Results
      </Link>
      <Link as={RouterLink} to="/profile">
        Profile
      </Link>
    </HStack>
  );
}
