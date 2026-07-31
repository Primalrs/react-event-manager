import { Heading, SimpleGrid } from "@chakra-ui/react";
import { useContext } from "react";
import { EventContext } from "../context/EventContext";
import { EventCard } from "../components/EventCard";

export const EventsPage = () => {
  const { events, loading, error } = useContext(EventContext);

  if (loading) {
    return <Heading>Loading...</Heading>;
  }

  if (error) {
    return <Heading>Error: {error}</Heading>;
  }

  return (
    <>
      <Heading mb={4}>List of events</Heading>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 3 }}
        spacing={8}
        rowGap={8}
        px={{ base: 2, md: 4, lg: 6 }}
        py={{ base: 2, md: 4, lg: 6 }}
      >
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </SimpleGrid>
    </>
  );
};
