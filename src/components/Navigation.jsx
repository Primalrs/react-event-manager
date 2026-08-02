import { Flex, Link } from "@chakra-ui/react";
import { useState } from "react";
import { AddEventModal } from "./AddEventModal";

export const Navigation = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  return (
    <nav>
      <Flex gap={2}>
        <Link href="/">Events</Link>
        <Link onClick={() => setIsAddOpen(true)}>Add Event</Link>
        <Link href="/about">About</Link>{" "}
        <AddEventModal open={isAddOpen} onClose={() => setIsAddOpen(false)} />
      </Flex>
    </nav>
  );
};
