import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";

export const Root = () => {
  return (
    <Box maxW="1400px" mx="auto" px={4}>
      <Navigation />
      <Outlet />
    </Box>
  );
};
