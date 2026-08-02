import { Card, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";

export const EventSkeleton = () => {
  return (
    <Card.Root overflow="hidden" shadow="md">
      <Skeleton height="250px" />

      <Card.Body>
        <Stack gap={3}>
          <Skeleton height="24px" width="60%" />

          <SkeletonText noOfLines={1} />

          <SkeletonText noOfLines={3} />

          <SkeletonText noOfLines={1} />

          <SkeletonText noOfLines={1} />

          <SkeletonText noOfLines={1} />
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};
