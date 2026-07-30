import { Heading } from "@chakra-ui/react";
import { useContext } from "react";
import { EventContext } from "../context/EventContext";

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

      {events.map((event) => (
        <p key={event.id}>{event.title}</p>
      ))}
    </>
  );
};
