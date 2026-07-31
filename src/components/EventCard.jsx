import { Heading, Text, Image, Card } from "@chakra-ui/react";
import {
  formatDate,
  formatTime,
  categoryHelper,
} from "../utils/dateformatter.js";
import { useContext } from "react";
import { EventContext } from "../context/EventContext";

export const EventCard = ({ event }) => {
  const { categories } = useContext(EventContext);
  const date = formatDate(event.startTime);
  const startTime = formatTime(event.startTime);
  const endTime = formatTime(event.endTime);
  const categoryNames = categoryHelper(event.categoryIds, categories);
  return (
    <Card.Root overflow="hidden" shadow="md">
      <Image
        src={event.image}
        alt={event.title}
        objectFit="cover"
        w="100%"
        h="250px"
      />
      <Card.Body>
        <Heading size="md">{event.title}</Heading>
        <Text mt={3}> {categoryNames}</Text>
        <Text mt={3}>{event.description} </Text>
        <Text mt={3}>{event.location}</Text>
        <Text mt={3}>Date: {date}</Text>
        <Text mt={3}>
          Time {startTime}-{endTime}
        </Text>
        <Text mt={3}></Text>
      </Card.Body>
    </Card.Root>
  );
};
