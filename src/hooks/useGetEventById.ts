import { useState, useEffect } from "react";
import axios from "axios";

// Define TypeScript type for a single event
export interface Event {
  _id?: string;
  nameOfEvent: string;
  location: string;
  fromDate: string;
  toDate: string;
  fromTime: string;
  toTime: string;
  typeOfEvent: string;
  eventImage: string;
  status?: string;
  createdAt: string;
  updatedAt: string;
}

const useFetchEventById = () => {
  const [eventData, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEventById = async (id: string) => {
    try {
      const response = await axios.get<{ message: string; data: Event }>(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/api/events/getEventsById/${id}`
      );
      setEvent(response.data.data); // Set the event data
    } catch (err: any) {
      setError(err.message); // Set error message if request fails
    } finally {
      setLoading(false); // Set loading to false when the fetch is complete
    }
  };

  return {
    fetchEventById,
    eventData,
    loadingEventById: loading,
    errorOnFetchById: error,
  };
};

export default useFetchEventById;
