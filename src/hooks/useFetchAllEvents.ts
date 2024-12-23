import { useState, useEffect } from "react";
import axios from "axios";

// Define TypeScript types for event data
export interface Event {
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

interface FetchEventsResponse {
  message: string;
  data: {
    events: Event[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      pageSize: number;
    };
  };
}

const useFetchAllEvents = (page: number = 1, limit: number = 10) => {
  const [eventsData, setEventsData] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    pageSize: limit,
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<FetchEventsResponse>(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/events/getAllEvents?page=${page}&limit=${limit}`
        );
        setEventsData(response.data.data.events); // Set the events data
        setPagination(response.data.data.pagination); // Set pagination data
      } catch (err: any) {
        setError(err.message); // Set error message if request fails
      } finally {
        setLoading(false); // Set loading to false when the fetch is complete
      }
    };

    fetchEvents();
  }, [page, limit]); // Re-fetch events when `page` or `limit` changes

  return {
    eventsData,
    loadingEvents: loading,
    errorOnFetchEvent: error,
    pagination,
  };
};

export default useFetchAllEvents;
