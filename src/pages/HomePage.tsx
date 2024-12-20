import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import styles from "./homepage.module.css";
import useFetchAllEvents from "../hooks/useFetchAllEvents";

// Sample data for the table
const rows = [
  { id: 1, name: "John Doe", age: 28, job: "Software Engineer" },
  { id: 2, name: "Jane Smith", age: 34, job: "Product Manager" },
  { id: 3, name: "Sam Johnson", age: 22, job: "Designer" },
];

const HomePage = () => {
  const { events, loading, error } = useFetchAllEvents();

  if (loading) return <CircularProgress />; // Show loading spinner while data is being fetched
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      {/* Top bar with logo and button */}
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
            src="/img/Wiza-Logo.png"
            alt="Wiza Logo"
            className="login-logo"
            height={45}
            width={25}
            style={{ margin: 0 }}
          />
          <Button color="inherit" className={styles.button}>
            My Button
          </Button>
        </Toolbar>
      </AppBar>
      {/* Text Section */}
      <div className={styles.main_container}>
        <Typography variant="h5" gutterBottom>
          Liste de tous les <span style={{ color: "red" }}>événements</span>
        </Typography>

        {/* Material UI Table */}
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
                {/* <TableCell>Event Image</TableCell> */}
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
                  {/* <TableCell>
                    <img
                      src={event.eventImage}
                      alt={event.nameOfEvent}
                      width="100"
                    />
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default HomePage;
