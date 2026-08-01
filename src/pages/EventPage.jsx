import { Heading, Text, Image, Card, Button, HStack } from "@chakra-ui/react";
import {
  formatDate,
  formatTime,
  categoryHelper,
} from "../utils/dateformatter.js";
import { useContext } from "react";
import { EventContext } from "../context/EventContext";
import { useParams, useNavigate } from "react-router-dom";

export const EventPage = () => {
  const { eventId } = useParams();
  const { events, categories } = useContext(EventContext);
  const event = events.find((event) => event.id === Number(eventId));
  if (!event) {
    return <Heading>Loading...</Heading>;
  }
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.error("Failed to delete event");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const date = formatDate(event.startTime);
  const startTime = formatTime(event.startTime);
  const endTime = formatTime(event.endTime);
  const categoryNames = categoryHelper(event.categoryIds, categories);

  return (
    <Card.Root overflow="hidden">
      <Image
        src={event.image}
        alt={event.title}
        objectFit="cover"
        w="100%"
        h="400px"
      />
      <Card.Body>
        <Heading size="2xl">{event.title}</Heading>
        <Text mt={3}> {categoryNames}</Text>
        <Text mt={3}>{event.description} </Text>
        <Text mt={3}>{event.location}</Text>
        <Text mt={3}>Date: {date}</Text>
        <Text mt={3}>
          Time {startTime}-{endTime}
        </Text>
        <HStack gap={4} mt={3} px={4} py={2}>
          <Button mt={3} colorPalette="blue">
            Edit Event
          </Button>
          <Button mt={3} colorPalette="red" onClick={handleDelete}>
            Delete Event
          </Button>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
};
