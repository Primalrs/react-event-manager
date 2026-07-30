import { createContext, useState, useEffect } from "react";

export const EventContext = createContext();
export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const eventsResponse = await fetch("http://localhost:3000/events");
      const eventsData = await eventsResponse.json();
      const categoriesResponse = await fetch(
        "http://localhost:3000/categories",
      );
      const categoriesData = await categoriesResponse.json();
      setEvents(eventsData);
      setCategories(categoriesData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <EventContext.Provider value={{ events, categories, loading, error }}>
      {children}
    </EventContext.Provider>
  );
};
