import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  Pagination,
  Stack,
  PaginationItem,
} from "@mui/material";
import { Logout } from "@mui/icons-material"; // Import Logout icon from Material UI
import Cookies from "js-cookie";
import styles from "./homepage.module.css";
import useFetchAllEvents from "../hooks/useFetchAllEvents";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import useUpdateEventStatus from "../hooks/useEventStatusUpdate";
import CreateModel from "../models/createModel";
import useFetchEventById, { Event } from "../hooks/useGetEventById";
import SnackbarNotification from "../components/SnackbarNotification";
import useSnackbar from "../hooks/useSnackbar";
import { useNavigate, useRoutes } from "react-router-dom";
import DownloadExcel from "../components/DownloadExcel";

// Styled Components
const CustomTableRow = styled(TableRow)(({ theme }) => ({
  padding: "10px",
  "& > th:first-child": {
    borderTopLeftRadius: "30px",
    borderBottomLeftRadius: "30px",
  },
  "& > th:last-child": {
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px",
  },
}));

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  border: "none",
  fontWeight: "bold",
  background: "#F5F6FD",
}));

const CustomTableCellAction = styled(TableCell)(({ theme }) => ({
  textAlign: "center",
  backgroundColor: "white",
}));
const TableCellData = styled(TableCell)(({ theme }) => ({
  backgroundColor: "white",
}));

const CustomTableCellActionHeader = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  background: "#F5F6FD",
  textAlign: "center",
  border: "none",
}));

const CircularButton = styled(Button)<{ colorType: "primary" | "warning" }>(
  ({ colorType }) => ({
    borderRadius: "5px",
    width: "40px",
    height: "15px",
    padding: "15px",
    fontSize: "10px",
    backgroundColor: colorType === "primary" ? "#A6FFB3" : "#FF7575",
    color: colorType === "primary" ? "black" : "white",
    "&:disabled": {
      backgroundColor: "#e0e0e0", // Gray background for disabled state
      color: "#9e9e9e", // Light gray text for disabled state
    },
  })
);

const HomePage = () => {
  const [openModal, setOpenModal] = useState(false); // Modal open state
  const [events, setEvents] = useState<Event[]>([]); // Modal open state
  const [type, setType] = useState<string>("Create");
  const router = useNavigate();

  const { fetchEventById, eventData } = useFetchEventById();
  const { snackbarState, showSnackbar, closeSnackbar } = useSnackbar();

  const handleModalClose = () => {
    setOpenModal(false); // Close the modal
  };

  const handleModalOpen = (type: string, id?: string) => {
    setType(type);
    setOpenModal(true); // Open the modal

    if (type == "Edit") {
      fetchEventById(id || "");
    }
  };

  const [page, setPage] = useState(1);
  const { eventsData, loadingEvents, errorOnFetchEvent, pagination } =
    useFetchAllEvents(page, 8); // Pass the page and limit

  const { updateEventStatus, error } = useUpdateEventStatus();

  const handleCreateEvent = (eventData: any) => {
    if (eventData) {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventData.eventId ? { ...event, ...eventData } : event
        )
      );
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value); // Update page when user clicks on pagination
  };

  const handleClick = async (eventId: string, currentStatus: string) => {
    // Call backend to update event status
    try {
      const res = await updateEventStatus(eventId, currentStatus); // Assume this function updates the event status

      // Update the local UI state (optional: refetch events or directly modify state)
      // For example:
      if (!res) {
        showSnackbar("No users registered for this event", "error");
      }
      if (res) {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === eventId ? { ...event, status: res.status } : event
          )
        );
      }
    } catch (error) {
      console.error("Failed to update event status:", error);
    }
  };

  useEffect(() => {
    if (eventsData) {
      setEvents(eventsData);
    }
  }, [eventsData]);

  if (loadingEvents) return <CircularProgress />;
  if (errorOnFetchEvent) return <div>Error: {error}</div>;

  return (
    <div>
      <AppBar
        position="sticky"
        className={styles.appBar}
        sx={{
          bgcolor: "#F5F6FD",
          color: "black",
        }}
      >
        <Toolbar className={styles.toolbar}>
          <img
            src="/image/WizaEvove.PNG"
            alt="Wiza Logo"
            className="login-logo"
            height={50}
            width={130}
            style={{ margin: 0 }}
          />
          <Button
            color="inherit"
            className={styles.logoutButton}
            onClick={() => {
              Cookies.remove("authToken");
              showSnackbar("logout success", "success");
              router("/");
            }}
            startIcon={<Logout />}
          >
            déconnecter
          </Button>
        </Toolbar>
      </AppBar>

      <div className={styles.main_container}>
        <div className={styles.mainHeader}>
          <Typography variant="h5" gutterBottom>
            Liste de tous les <span style={{ color: "red" }}>événements</span>
          </Typography>
          <div>
            <Button
              variant="contained"
              className={styles.createButton}
              onClick={() => handleModalOpen("Create")}
            >
              créer un événement
            </Button>
            {/* <Button variant="contained" className={styles.expoterButtons}>
              Exporter
            </Button> */}
            <DownloadExcel />
          </div>
        </div>

        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table>
            <TableHead>
              <CustomTableRow>
                <CustomTableCell>Nom de l'événement</CustomTableCell>
                <CustomTableCell>Types d'événements</CustomTableCell>
                <CustomTableCell>Location</CustomTableCell>
                <CustomTableCell>From Date</CustomTableCell>
                <CustomTableCell>To date</CustomTableCell>
                <CustomTableCellActionHeader>
                  Action d'événements
                </CustomTableCellActionHeader>
                <CustomTableCellActionHeader>
                  Modifier
                </CustomTableCellActionHeader>
              </CustomTableRow>
            </TableHead>
            <TableBody className={styles.tableBody}>
              {events.map((event) => (
                <TableRow key={event._id}>
                  <TableCellData>{event.nameOfEvent}</TableCellData>
                  <TableCellData>{event.typeOfEvent}</TableCellData>
                  <TableCellData>{event.location}</TableCellData>
                  <TableCellData>
                    {`${new Date(event.fromDate).toLocaleDateString()} | ${
                      event.fromTime
                    }`}
                  </TableCellData>
                  <TableCellData>
                    {`${new Date(event.toDate).toLocaleDateString()} | ${
                      event.toTime
                    }`}
                  </TableCellData>
                  <CustomTableCellAction>
                    <CircularButton
                      colorType={
                        event.status === "Ongoing"
                          ? "warning"
                          : event.status === "Scheduled"
                          ? "primary"
                          : "warning"
                      } // Adjust button color dynamically
                      onClick={() => {
                        if (event._id && event.status) {
                          handleClick(event?._id, event.status);
                        }
                      }} // Pass event ID and status to handleClick
                      disabled={event.status === "Completed"} // Disable button if status is 'completed'
                    >
                      {event.status === "Scheduled"
                        ? "Start"
                        : event.status === "Ongoing"
                        ? "End"
                        : "Ended"}{" "}
                      {/* Dynamically set button text */}
                    </CircularButton>
                  </CustomTableCellAction>

                  <CustomTableCellAction>
                    <BorderColorIcon
                      onClick={() => handleModalOpen("Edit", event._id)}
                    ></BorderColorIcon>
                  </CustomTableCellAction>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack
          spacing={2}
          sx={{
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pagination
            variant="outlined"
            color="primary"
            onChange={handlePageChange}
            count={pagination.totalPages}
            page={pagination.currentPage}
            renderItem={(item) => (
              <PaginationItem
                {...item}
                sx={{
                  "&.Mui-selected": {
                    color: "white",
                    backgroundColor: "red",
                    borderColor: "red",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(255, 0, 0, 0.1)",
                  },
                }}
                slots={{
                  previous: () => <WestIcon />,
                  next: () => <EastIcon />,
                }}
              />
            )}
          />
        </Stack>
      </div>

      <CreateModel
        open={openModal}
        onClose={handleModalClose}
        onActionComplete={handleCreateEvent}
        type={type}
        event={eventData || undefined}
      />
      <SnackbarNotification
        message={snackbarState.message}
        severity={snackbarState.severity}
        open={snackbarState.open}
        onClose={closeSnackbar}
      />
    </div>
  );
};

export default HomePage;
