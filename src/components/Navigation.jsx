import { Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { AddEventModal } from "./AddEventModal";

export const Navigation = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <nav>
      <Flex px={6} py={4} gap={4}>
        <Link as={RouterLink} to="/">
          Events
        </Link>

        <Link onClick={() => setIsAddOpen(true)}>Add Event</Link>

        <Link as={RouterLink} to="/about">
          About
        </Link>

        <AddEventModal open={isAddOpen} onClose={() => setIsAddOpen(false)} />
      </Flex>
    </nav>
  );
};
