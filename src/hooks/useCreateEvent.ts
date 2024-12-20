import { useState } from "react";

const useCreateEvent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createEvent = async (eventData: any) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
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
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/events/createEvent`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create event");
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

  return { createEvent, loading, error };
};

export default useCreateEvent;
