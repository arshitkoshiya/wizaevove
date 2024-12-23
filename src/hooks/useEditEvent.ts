import { useState } from "react";

const useEditEvent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editEvent = async (eventData: any) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("eventId", eventData.eventId); // Include the ID in the FormData
    formData.append("status", eventData.status); // Include the ID in the FormData
    formData.append("nameOfEvent", eventData.name);
    formData.append("location", eventData.location);
    formData.append("fromDate", eventData.fromDate.toISOString());
    formData.append("toDate", eventData.toDate.toISOString());
    formData.append("fromTime", eventData.fromTime);
    formData.append("toTime", eventData.toTime);
    formData.append("typeOfEvent", eventData.typeOfEvent);

    if (eventData.eventImage) {
      formData.append("eventImage", eventData.eventImage);
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/events/editEvent`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit event");
      }

      const result = await response.json();
      return result;
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { editEvent, loading, error };
};

export default useEditEvent;
