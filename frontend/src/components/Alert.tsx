import { Alert as MuiAlert, AlertColor } from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";

export const Alert = () => {
  const [detail, setDetail] = useState<{
    severity?: AlertColor;
    title?: string;
    message?: string;
  }>({
    severity: undefined,
    title: "",
    message: "",
  });
  useEffect(() => {
    const handleCustomEvent = (event: any) => {
      setDetail(event.detail);
    };

    // Add event listener for the custom event
    document.addEventListener("renderComponent", handleCustomEvent);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("renderComponent", handleCustomEvent);
    };
  }, []);

  return detail?.severity ? (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <MuiAlert severity={detail.severity}>
        <AlertTitle>{detail.title}</AlertTitle>
        {detail.message}
      </MuiAlert>
    </Stack>
  ) : null;
};
