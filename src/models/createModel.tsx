import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import styles from "./CreateModel.module.css";
import useCreateEvent from "../hooks/useCreateEvent"; // Import custom hook

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (eventData: {
    name: string;
    location: string;
    fromDate: Date;
    toDate: Date;
    fromTime: string;
    toTime: string;
    typeOfEvent: string;
    eventImage: string | File;
  }) => void;
}

const CreateModel: React.FC<EventModalProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [eventName, setEventName] = useState<string>("");
  const [eventLocation, setEventLocation] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [fromTime, setFromTime] = useState<string>("");
  const [toTime, setToTime] = useState<string>("");
  const [eventType, setEventType] = useState<string>("");
  const [eventImage, setEventImage] = useState<string | File>("");
  const [selectedFileName, setSelectedFileName] = useState<string>("");


  const { createEvent, loading, error } = useCreateEvent(); // Hook for API call

  const handleCreateEvent = async () => {
    try {
      const eventData = {
        name: eventName,
        location: eventLocation,
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
        fromTime: fromTime,
        toTime: toTime,
        typeOfEvent: eventType,
        eventImage: eventImage,
      };

      await createEvent(eventData); // Call the hook
      onCreate(eventData);
      onClose(); // Close the modal
    } catch (err) {
      console.error("Error creating event:", err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEventImage(e.target.files[0]);
      setSelectedFileName(e.target.files[0].name); // Set to File object
    }
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <div className={styles.mainDialog}>
        <DialogTitle className={styles.dialogTitle}>
          Créer un <span style={{ color: "red" }}>événement</span>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                className={styles.textField}
                label="Nom de l'événement"
                fullWidth
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                className={styles.textField}
                label="Lieu de l'événement"
                fullWidth
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                className={styles.textField}
                label="Date de début de l'événement"
                type="date"
                fullWidth
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                className={styles.textField}
                label="Date de fin de l'événement"
                type="date"
                fullWidth
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                className={styles.textField}
                label="Heure de début de l'événement"
                type="time"
                fullWidth
                value={fromTime}
                onChange={(e) => setFromTime(e.target.value)}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                className={styles.textField}
                label="Heure de fin de l'événement"
                type="time"
                fullWidth
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                className={styles.textField}
                label="Type d'événement"
                fullWidth
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                component="label"
                className={styles.uploadButton}
              >
                Télécharger l'image de l'événement
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
              {eventImage && (
                <p style={{ marginTop: "8px" }}>
                  Fichier sélectionné: {selectedFileName}
                </p>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} className={styles.CloseButton}>
            Annuler
          </Button>
          <Button
            onClick={handleCreateEvent}
            className={styles.submitButton}
            variant="contained"
            disabled={loading}
          >
            {loading ? "Création..." : "Créer l'événement"}
          </Button>
        </DialogActions>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </Dialog>
  );
};

export default CreateModel;
