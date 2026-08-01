import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage } from "./pages/EventPage";
import { EventsPage } from "./pages/EventsPage";
import { Provider as ChakraProvider } from "./components/ui/provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { EventProvider } from "./context/EventContext";
import { Toaster } from "./components/ui/toaster";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        // loader: postListLoader,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        // loader: postLoader,
        // action: addComment,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EventProvider>
      <ChakraProvider>
        <Toaster />
        <RouterProvider router={router} />
      </ChakraProvider>
    </EventProvider>
  </React.StrictMode>,
);
