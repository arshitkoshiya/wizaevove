import { useState, useEffect } from 'react';
import axios from 'axios';

// Define TypeScript types for event data
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

const useFetchAllEvents = (page: number = 1, size: number = 5) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    pageSize: size,
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<FetchEventsResponse>(
          `http://10.37.57.113:8080/api/events/getAllEvents?page=${page}&limit=${size}`
        );
        setEvents(response.data.data.events); // Set the events data
        setPagination(response.data.data.pagination); // Set pagination data
      } catch (err: any) {
        setError(err.message); // Set error message if request fails
      } finally {
        setLoading(false); // Set loading to false when the fetch is complete
      }
    };

    fetchEvents();
  }, [page, size]); // Re-fetch events when `page` or `size` changes

  return { events, loadingEvents : loading, errorOnFetchEvent : error, pagination };
};

export default useFetchAllEvents;
