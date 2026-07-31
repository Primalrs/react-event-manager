export const formatDate = (dateString) => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
export const formatTime = (timeString) => {
  const time = new Date(timeString);

  return time.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
export const categoryHelper = (categoryIds, categories) => {
  return categoryIds
    .map((categoryId) => {
      const category = categories.find(
        (category) => category.id === categoryId,
      );

      return category.name;
    })
    .filter(Boolean)
    .join(", ");
};
