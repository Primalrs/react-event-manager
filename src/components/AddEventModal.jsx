import {
  Button,
  Dialog,
  Input,
  Field,
  Textarea,
  Checkbox,
  CheckboxGroup,
  VStack,
  Fieldset,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { EventContext } from "../context/EventContext";
import { toaster } from "./ui/toaster";

export const AddEventModal = ({ open, onClose }) => {
  const { categories, setEvents } = useContext(EventContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const handleSave = async () => {
    const newEvent = {
      title,
      description,
      location,
      image,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      categoryIds,
      createdBy: 1,
    };

    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      const createdEvent = await response.json();
      if (response.ok) {
        toaster.create({
          title: "Event created",
          description: "The event was created successfully.",
          type: "success",
        });
        setEvents((prevEvents) => [createdEvent, ...prevEvents]);

        onClose();
      } else {
        toaster.create({
          title: "Creation failed",
          description: "The event could not be created.",
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
    <Dialog.Root
      open={open}
      onOpenChange={(details) => {
        if (!details.open) {
          onClose();
        }
      }}
    >
      <Dialog.Backdrop />

      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Add Event</Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            <Field.Root>
              <Field.Label>Title</Field.Label>
              <Input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field.Root>

            <Field.Root mt={4}>
              <Field.Label>Description</Field.Label>
              <Textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Field.Root>

            <Fieldset.Root mt={4}>
              <Fieldset.Legend>Categories</Fieldset.Legend>

              <CheckboxGroup
                value={categoryIds.map(String)}
                onValueChange={(values) => setCategoryIds(values.map(Number))}
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
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Field.Root>

            <Field.Root mt={4}>
              <Field.Label>Image URL</Field.Label>
              <Input
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Field.Root>

            <Field.Root mt={4}>
              <Field.Label>Start Time</Field.Label>
              <Input
                required
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </Field.Root>

            <Field.Root mt={4}>
              <Field.Label>End Time</Field.Label>
              <Input
                required
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </Field.Root>
          </Dialog.Body>

          <Dialog.Footer>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button onClick={handleSave} colorPalette="blue">
              Save
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
