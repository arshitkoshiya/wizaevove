import React, { useState, forwardRef } from "react";
import { Snackbar, Alert, AlertProps, Slide } from "@mui/material";

type NotificationType = "success" | "error" | "warning" | "info";

interface SnackbarNotificationProps {
  message: string;
  severity: NotificationType;
  open: boolean;
  onClose: () => void;
  autoHideDuration?: number; // Default duration for auto-hide
}

// Transition for Snackbar
const SlideTransition = (props: any) => {
  return <Slide {...props} direction="up" />;
};

// Reusable Snackbar Component
const SnackbarNotification: React.FC<SnackbarNotificationProps> = ({
  message,
  severity,
  open,
  onClose,
  autoHideDuration = 3000,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert onClose={onClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNotification;
