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
  styled,
  Pagination,
  Stack,
  PaginationItem,
} from "@mui/material";
import styles from "./homepage.module.css";
import useFetchAllEvents from "../hooks/useFetchAllEvents";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useState } from "react";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import useUpdateEventStatus from "../hooks/useEventStatusUpdate";

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

// Styled Button for Circular Shape
const CircularButton = styled(Button)<{ colorType: "start" | "end" }>(
  ({ colorType }) => ({
    borderRadius: "5px",
    width: "40px",
    height: "15px",
    padding: "15px",
    fontSize: "10px",
    backgroundColor: colorType === "start" ? "#A6FFB3" : "#FF7575",
    color: colorType === "start" ? "black" : "white",
  })
);

const HomePage = () => {
  const [page, setPage] = useState(1);
  const { events, errorOnFetchEvent, loadingEvents, pagination } =
    useFetchAllEvents(page, 8);

  const { updateEventStatus, updatedEvent, loading, error } =
    useUpdateEventStatus();

  const [state, setState] = useState<"start" | "end">("start");

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value); // Update page when user clicks on pagination
  };

  const handleClick = (id: string, status: string) => {
    updateEventStatus(id,status).then(()=>{
      console.log('updatedEvent ', updatedEvent )
    })
    setState((prevState) => (prevState === "start" ? "end" : "start"));
  };

  if (loadingEvents) return <CircularProgress />;
  if (errorOnFetchEvent) return <div>Error: {error}</div>;

  return (
    <>
      <AppBar position="sticky" className={styles.appBar}>
        <Toolbar className={styles.toolbar}>
          <img
            src="/img/Wiza-Logo.png"
            alt="Wiza Logo"
            className="login-logo"
            height={40}
            width={90}
            style={{ margin: 0 }}
          />
          <Button color="inherit" className={styles.button}>
            My Button
          </Button>
        </Toolbar>
      </AppBar>

      <div className={styles.main_container}>
        <div className={styles.headingText}>
          <Typography variant="h5" gutterBottom>
            Liste de tous les <span style={{ color: "red" }}>événements</span>
          </Typography>
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
                      colorType={state}
                      onClick={() => {
                        handleClick(event._id, event.status);
                      }}
                    >
                      {state === "start" ? "Start" : "End"}
                    </CircularButton>
                  </CustomTableCellAction>
                  <CustomTableCellAction>
                    <BorderColorIcon />
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
    </>
  );
};

export default HomePage;
