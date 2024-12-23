import { useState } from "react";
import axios from "axios";

// Define TypeScript types for the response
interface UpdateEventStatusResponse {
  message: string;
  ResultData: Event[];
}

interface Event {
  _id: string;
  nameOfEvent: string;
  location: string;
  fromDate: string;
  toDate: string;
  fromTime: string;
  toTime: string;
  typeOfEvent: string;
  eventImage: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// Custom hook for updating event status
const useUpdateEventStatus = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to update the status
  const updateEventStatus = async (id: string, status: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put<UpdateEventStatusResponse>(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/events/eventStatusUpdate/${id}/${status}`
      );
      return response.data.ResultData[0];
    } catch (err: any) {
      setError(
        err.message || "An error occurred while updating the event status"
      ); // Set error message if request fails
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  };

  return { updateEventStatus, loading, error };
};

export default useUpdateEventStatus;
