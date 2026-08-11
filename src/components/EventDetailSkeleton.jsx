import { Card, Skeleton, SkeletonText, Stack, HStack } from "@chakra-ui/react";

export const EventDetailSkeleton = () => {
  return (
    <Card.Root overflow="hidden">
      <Skeleton height="400px" />

      <Card.Body>
        <Stack gap={3}>
          <Skeleton height="32px" width="40%" />

          <Skeleton height="16px" width="20%" />

          <SkeletonText noOfLines={1} width="60%" />

          <Skeleton height="16px" width="25%" />
          <Skeleton height="16px" width="25%" />
          <Skeleton height="16px" width="25%" />

          <HStack gap={4} mt={3}>
            <Skeleton height="40px" width="100px" />
            <Skeleton height="40px" width="110px" />
          </HStack>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};
