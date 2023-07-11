import { useState } from "react";
import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
} from "@mui/material";

const QualificationTable = ({ data, fn }) => {
  const [qualification, setQualification] = useState({
    qualification: "",
    institute: "",
    year: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setQualification((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    fn((prev) => [...prev, qualification]);

    setQualification({
      qualification: "",
      institute: "",
      year: "",
    });
  };

  const rows = data?.map((row) => (
    <TableRow
      key={row.name}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="right">{row.qualification}</TableCell>
      <TableCell align="right">{row.institute}</TableCell>
      <TableCell align="right">{row.year}</TableCell>
    </TableRow>
  ));

  return (
    <Paper>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          name="qualification"
          variant="outlined"
          label="Qualification"
          value={qualification.qualification}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          name="institute"
          variant="outlined"
          label="Institute"
          value={qualification.institute}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          name="year"
          variant="outlined"
          label="Year"
          value={qualification.year}
          onChange={handleChange}
        />

        <Button
          variant="contained"
          sx={{ width: "200px" }}
          onClick={handleSubmit}
        >
          Add
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Qualification</TableCell>
              <TableCell align="right">Institute</TableCell>
              <TableCell align="right">Year</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default QualificationTable;
