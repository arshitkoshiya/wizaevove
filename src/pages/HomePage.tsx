import React, { useState } from "react";
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
} from "@mui/material";
import { Logout } from "@mui/icons-material"; // Import Logout icon from Material UI
import Cookies from "js-cookie";
import styles from "./homepage.module.css";
import useFetchAllEvents from "../hooks/useFetchAllEvents";
import CreateModel from "../models/createModel";

const HomePage = () => {
  const { events, loading, error } = useFetchAllEvents();
  const [openModal, setOpenModal] = useState(false); // Modal open state

  const handleModalClose = () => {
    setOpenModal(false); // Close the modal
  };

  const handleModalOpen = () => {
    setOpenModal(true); // Open the modal
  };

  const handleCreateEvent = (eventData: {
    name: string;
    location: string;
    fromDate: Date;
    toDate: Date;
    fromTime: string;
    toTime: string;
    typeOfEvent: string;
    eventImage: string | File;
  }) => {};

  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error}</div>;

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
            onClick={() => Cookies.remove("authToken")}
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
              onClick={handleModalOpen}
            >
              créer un événement
            </Button>
            <Button variant="contained" className={styles.expoterButtons}>
              Exporter
            </Button>
          </div>
        </div>

        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name of Event</TableCell>
                <TableCell>Type of Event</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>From Date</TableCell>
                <TableCell>To Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event._id}>
                  <TableCell>{event.nameOfEvent}</TableCell>
                  <TableCell>{event.typeOfEvent}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>
                    {`${new Date(event.fromDate).toLocaleDateString()} | ${
                      event.fromTime
                    }`}
                  </TableCell>
                  <TableCell>
                    {`${new Date(event.toDate).toLocaleDateString()} | ${
                      event.toTime
                    }`}
                  </TableCell>
                  <TableCell>{event.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <CreateModel
        open={openModal}
        onClose={handleModalClose}
        onCreate={handleCreateEvent}
      />
    </div>
  );
};

export default HomePage;
