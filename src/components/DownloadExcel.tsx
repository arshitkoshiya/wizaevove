import { Button } from "@mui/material";
import React from "react";
import * as XLSX from "xlsx";
import styles from "../pages/homepage.module.css";
import useFetchAllEvents from "../hooks/useFetchAllEvents";
import useDownloadEvents from "../hooks/useDownloadEvents";

interface DataRow {
  id: number;
  name: string;
  age: number;
  email: string;
}

const DownloadExcel: React.FC = () => {
  const { fetchDownloadEvents, loadingDownloadEvents } = useDownloadEvents();

  const handleDownload = async () => {
    // Create a worksheet from the data
    const eventsData: any = await fetchDownloadEvents();
    if (!loadingDownloadEvents) {
      const worksheet = XLSX.utils.json_to_sheet(eventsData);

      // Create a workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      // Generate a binary string for the Excel file
      XLSX.writeFile(workbook, "Wiza_Evove.xlsx");
    }
  };

  return (
    <Button
      variant="contained"
      className={styles.expoterButtons}
      onClick={handleDownload}
      disabled={loadingDownloadEvents}
    >
      Exporter
    </Button>
  );
};

export default DownloadExcel;
