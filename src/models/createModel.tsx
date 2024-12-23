import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  InputAdornment,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import styles from "./CreateModel.module.css";
import useCreateEvent from "../hooks/useCreateEvent"; // Import custom hook
import useEditEvent from "../hooks/useEditEvent";
import { Event } from "../hooks/useGetEventById";

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  type: string;
  event?: any;
  onActionComplete: (eventData: any) => void; // Callback for both create and edit
}

const CreateModel: React.FC<any> = ({
  open,
  onClose,
  type,
  event,
  onActionComplete,
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
  const [id, setId] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const {
    createEvent,
    loading: creating,
    error: createError,
  } = useCreateEvent();

  const { editEvent, loading: updating, error: updateError } = useEditEvent();


  useEffect(() => {
    if (type === "Edit" && event) {
      setEventName(event.nameOfEvent);
      setEventLocation(event.location);
      setFromDate(new Date(event.fromDate).toISOString().split("T")[0]);
      setToDate(new Date(event.toDate).toISOString().split("T")[0]);
      setFromTime(event.fromTime);
      setToTime(event.toTime);
      setEventType(event.typeOfEvent);
      setEventImage(event.eventImage);
      setSelectedFileName(event.eventImage.split("/").pop() || "");
      setId(event._id ?? "");
      setStatus(event.status ?? "");
    }
  }, [type, event]);

  const handleAction = async () => {
    try {
      const eventData = {
        eventId: id,
        status: status,
        name: eventName,
        location: eventLocation,
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
        fromTime,
        toTime,
        typeOfEvent: eventType,
        eventImage,
      };

      if (type === "Create") {
        await createEvent(eventData);
        handleClose(); // Reset fields and close dialog
      } else if (type === "Edit" && event?._id) {
        await editEvent(eventData);
        handleClose(); // Reset fields and close dialog
      }

      onActionComplete(eventData);
    } catch (err) {
      console.error(
        `Error ${type === "Create" ? "creating" : "updating"} event:`,
        err
      );
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEventImage(e.target.files[0]);
      setSelectedFileName(e.target.files[0].name);
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedFileName("");
    setEventImage("");
    setEventType("");
    setToTime("");
    setFromTime("");
    setToDate("");
    setFromDate("");
    setEventLocation("");
    setEventName("");
  };

  return (
    <Dialog open={open}>
      <div className={styles.mainDialog}>
        <DialogTitle className={styles.dialogTitle}>
          {type === "Create" ? (
            <>
              Créer un <span style={{ color: "red" }}>événement</span>
            </>
          ) : (
            <>
              Modifier <span style={{ color: "red" }}>l'événement</span>
            </>
          )}
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
              <TextField
                className={styles.textField}
                label="Image de l'événement"
                fullWidth
                value={selectedFileName}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <label htmlFor="image-upload">
                        <ImageIcon
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            document.getElementById("image-upload")
                          }
                        />
                      </label>
                    </InputAdornment>
                  ),
                  startAdornment: eventImage && (
                    <InputAdornment position="start">
                      <img
                        src={
                          typeof eventImage === "string"
                            ? eventImage
                            : URL.createObjectURL(eventImage)
                        }
                        alt="Preview"
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          marginRight: 8,
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className={styles.CloseButton}>
            Annuler
          </Button>

          <Button
            onClick={handleAction}
            className={styles.submitButton}
            variant="contained"
            disabled={creating || updating}
          >
            {creating || updating
              ? `${type === "Create" ? "Création" : "Modification"}...`
              : `${type === "Create" ? "Créer" : "Modifier"} l'événement`}
          </Button>
        </DialogActions>
        {(createError || updateError) && (
          <p style={{ color: "red" }}>{createError || updateError}</p>
        )}
      </div>
    </Dialog>
  );
};

export default CreateModel;
