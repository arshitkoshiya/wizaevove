import { useState } from "react";
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

const useDownloadEvents = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDownloadEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get<any>(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/api/events/getEventsForDownload`
      );
      return await response.data.data.events;
    } catch (err: any) {
      setError(err.message); // Set error message if request fails
    } finally {
      setLoading(false); // Set loading to false when the fetch is complete
    }
  };

  return {
    fetchDownloadEvents,
    loadingDownloadEvents: loading,
    errorOnDownloadEvents: error,
  };
};

export default useDownloadEvents;
