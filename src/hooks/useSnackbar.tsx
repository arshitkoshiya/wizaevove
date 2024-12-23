import { useState } from "react";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
}

const useSnackbar = () => {
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });

  const showSnackbar = (message: string, severity: SnackbarState["severity"]) => {
    setSnackbarState({ open: true, message, severity });
  };

  const closeSnackbar = () => {
    setSnackbarState((prevState) => ({ ...prevState, open: false }));
  };

  return {
    snackbarState,
    showSnackbar,
    closeSnackbar,
  };
};

export default useSnackbar;
