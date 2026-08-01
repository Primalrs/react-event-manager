import {
  Heading,
  Text,
  Image,
  Card,
  Button,
  HStack,
  Dialog,
  Input,
  Field,
  Textarea,
  Checkbox,
  CheckboxGroup,
  VStack,
  Fieldset,
} from "@chakra-ui/react";
import {
  formatDate,
  formatTime,
  categoryHelper,
  formatDateTimeLocal,
} from "../utils/dateformatter.js";
import { useContext, useState } from "react";
import { EventContext } from "../context/EventContext";
import { useParams, useNavigate } from "react-router-dom";
import { toaster } from "../components/ui/toaster";

export const EventPage = () => {
  const { eventId } = useParams();
  const { events, setEvents, categories } = useContext(EventContext);
  const navigate = useNavigate();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editStartTime, setEditStartTime] = useState("");
  const [editEndTime, setEditEndTime] = useState("");
  const [editCategoryIds, setEditCategoryIds] = useState([]);

  const event = events.find((event) => event.id === Number(eventId));

  // Hooks must all be above this return
  if (!event) {
    return <Heading>Loading...</Heading>;
  }

  // Display values
  const date = formatDate(event.startTime);
  const startTime = formatTime(event.startTime);
  const endTime = formatTime(event.endTime);
  const categoryNames = categoryHelper(event.categoryIds, categories);

  const handleOpenEdit = () => {
    setEditTitle(event.title);
    setEditDescription(event.description);
    setEditLocation(event.location);
    setEditImage(event.image);
    setEditStartTime(formatDateTimeLocal(event.startTime));
    setEditEndTime(formatDateTimeLocal(event.endTime));
    setEditCategoryIds(event.categoryIds);
    setIsEditOpen(true);
  };
  const handleSave = async () => {
    const updatedEvent = {
      ...event,
      title: editTitle,
      description: editDescription,
      location: editLocation,
      image: editImage,
      startTime: new Date(editStartTime).toISOString(),
      endTime: new Date(editEndTime).toISOString(),
      categoryIds: editCategoryIds,
    };

    try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      });
      if (response.ok) {
        toaster.create({
          title: "Event updated",
          description: "The event was updated successfully.",
          type: "success",
        });

        setEvents((prevEvents) =>
          prevEvents.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)),
        );

        setIsEditOpen(false);
      } else {
        toaster.create({
          title: "Update failed",
          description: "The event could not be updated.",
          type: "error",
        });
      }

      console.log(response);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseEdit = () => {
    setIsEditOpen(false);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?",
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toaster.create({
          title: "Event deleted",
          description: "The event was deleted successfully.",
          type: "success",
        });

        navigate("/");
      } else {
        toaster.create({
          title: "Delete failed",
          description: "The event could not be deleted.",
          type: "error",
        });
      }
    } catch (error) {
      toaster.create({
        title: "Network error",
        description: "Could not connect to the server.",
        type: "error",
      });

      console.error(error);
    }
  };

  return (
    <>
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

          <Text mt={3}>{categoryNames}</Text>
          <Text mt={3}>{event.description}</Text>
          <Text mt={3}>{event.location}</Text>
          <Text mt={3}>Date: {date}</Text>
          <Text mt={3}>
            Time {startTime} - {endTime}
          </Text>

          <HStack gap={4} mt={3}>
            <Button colorPalette="blue" onClick={handleOpenEdit}>
              Edit Event
            </Button>

            <Button colorPalette="red" onClick={handleDelete}>
              Delete Event
            </Button>
          </HStack>
        </Card.Body>
      </Card.Root>

      <Dialog.Root
        open={isEditOpen}
        onOpenChange={(details) => {
          if (!details.open) handleCloseEdit();
        }}
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Edit Event</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <Field.Root>
                <Field.Label>Title</Field.Label>
                <Input
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </Field.Root>

              <Field.Root mt={4}>
                <Field.Label>Description</Field.Label>
                <Textarea
                  required
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
              </Field.Root>

              <Fieldset.Root mt={4}>
                <Fieldset.Legend>Categories</Fieldset.Legend>

                <CheckboxGroup
                  value={editCategoryIds.map(String)}
                  onValueChange={(values) =>
                    setEditCategoryIds(values.map(Number))
                  }
                >
                  <VStack align="start" gap={2}>
                    {categories.map((category) => (
                      <Checkbox.Root
                        key={category.id}
                        value={category.id.toString()}
                      >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label>{category.name}</Checkbox.Label>
                      </Checkbox.Root>
                    ))}
                  </VStack>
                </CheckboxGroup>
              </Fieldset.Root>
              <Field.Root mt={4}>
                <Field.Label>Location</Field.Label>
                <Input
                  required
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                />
              </Field.Root>

              <Field.Root mt={4}>
                <Field.Label>Image URL</Field.Label>
                <Input
                  required
                  value={editImage}
                  onChange={(e) => setEditImage(e.target.value)}
                />
              </Field.Root>

              <Field.Root mt={4}>
                <Field.Label>Start Time</Field.Label>
                <Input
                  required
                  type="datetime-local"
                  value={editStartTime}
                  onChange={(e) => setEditStartTime(e.target.value)}
                />
              </Field.Root>

              <Field.Root mt={4}>
                <Field.Label>End Time</Field.Label>
                <Input
                  required
                  type="datetime-local"
                  value={editEndTime}
                  onChange={(e) => setEditEndTime(e.target.value)}
                />
              </Field.Root>
            </Dialog.Body>

            <Dialog.Footer>
              <Button variant="outline" onClick={handleCloseEdit}>
                Cancel
              </Button>

              <Button colorPalette="blue" onClick={handleSave}>
                Save
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
};
