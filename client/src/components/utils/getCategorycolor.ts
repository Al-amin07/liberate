export const getCategoryColor = (category: string) => {
  switch (category) {
    case "Work":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Personal":
      return "bg-green-100 text-green-800 border-green-200";
    case "Other":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};
