import {
  Heading,
  SimpleGrid,
  Box,
  Input,
  Checkbox,
  CheckboxGroup,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { EventContext } from "../context/EventContext";
import { EventCard } from "../components/EventCard";
import { EventSkeleton } from "../components/EventSkeleton";

export const EventsPage = () => {
  const { events, loading, error, categories } = useContext(EventContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryIds.length === 0 ||
      categoryIds.some((id) => event.categoryIds.includes(id));

    return matchesSearch && matchesCategory;
  });
  if (loading) {
    return (
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 3 }}
        spacing={8}
        rowGap={8}
        px={{ base: 2, md: 4, lg: 6 }}
        py={{ base: 2, md: 4, lg: 6 }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <EventSkeleton key={index} />
        ))}
      </SimpleGrid>
    );
  }

  if (error) {
    return <Heading>Error: {error}</Heading>;
  }

  return (
    <>
      <Heading mb={4}>List of events</Heading>
      <Box
        w={{ base: "100%", md: "70%", lg: "50%", xl: "33%" }}
        mx="auto"
        mb={6}
      >
        <Input
          width="100%"
          position="center"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <CheckboxGroup
          value={categoryIds.map(String)}
          onValueChange={(values) => setCategoryIds(values.map(Number))}
        >
          <HStack align="start" gap={2}>
            <Text>Filter by categories:</Text>
            {categories.map((category) => (
              <Checkbox.Root key={category.id} value={category.id.toString()}>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>{category.name}</Checkbox.Label>
              </Checkbox.Root>
            ))}
          </HStack>
        </CheckboxGroup>{" "}
      </Box>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 3 }}
        spacing={8}
        rowGap={8}
        px={{ base: 2, md: 4, lg: 6 }}
        py={{ base: 2, md: 4, lg: 6 }}
      >
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </SimpleGrid>
    </>
  );
};
