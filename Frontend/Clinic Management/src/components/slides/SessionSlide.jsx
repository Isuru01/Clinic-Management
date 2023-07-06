import { Box } from "@mui/material";
import SessionTable from "../tables/SessionTable";
import SessionForm from "../forms/SessionForm";

const SessionSlide = ({ action }) => {
  return (
    <Box>
      <Box
        sx={{
          p: 2,
          margin: "auto",
          backgroundColor: "#fffff",
          minHeight: "100vh",
        }}
      >
        {action === "create" && <SessionForm />}
        {!action && <SessionTable />}
      </Box>
    </Box>
  );
};

export default SessionSlide;
