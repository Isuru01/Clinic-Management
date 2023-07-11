import { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  TextField,
  Box,
  Button,
  Autocomplete,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import QualificationTable from "../tables/QualificationTable.jsx";
import { Loader } from "../../pages/index.js";
import { useAllSpec } from "../../hooks/useSpecialization.mjs";
import { useCreateDoc } from "../../hooks/useDoctor.mjs";
import { useCreateSession } from "../../hooks/useSession.mjs";

const DoctorForm = () => {
  //state for the form
  const [form, setForm] = useState({
    docFName: "",
    docLName: "",
    docEmail: "",
    docPhone: "",
    docGender: "",
    docHospital: "",
    docLiscense: "",
    docActiveYears: "",
    docQualification: [],
    docSpecialization: "",
    description: "",
  });

  const [qualifications, setQualifications] = useState([]);

  const { data: specSet, isLoading } = useAllSpec({
    onError: (error) => {},
    onSuccess: (message) => {},
  });

  const mutation = useCreateDoc({
    onError: (error) => {},
    onSuccess: (message) => {},
  });

  const handleChange = (name, value) => {
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  console.log(form);

  if (isLoading || !specSet) return <Loader />;

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutateAsync({ ...form, docQualification: qualifications });
  };

  const specializations = specSet.map((spec) => ({
    label: spec.categoryHeader,
  }));

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            name="docFName"
            variant="outlined"
            label="First Name"
            value={form.docFName}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
          <TextField
            fullWidth
            name="docLName"
            variant="outlined"
            label="Last Name"
            value={form.docLName}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </Box>

        <TextField
          name="docLiscense"
          variant="outlined"
          label="Medical Liscense"
          value={form.docLiscense}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />

        <TextField
          name="docEmail"
          variant="outlined"
          label="Email"
          value={form.docEmail}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />

        <TextField
          name="docPhone"
          variant="outlined"
          label="Mobile No"
          value={form.docPhone}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />

        <TextField
          name="docHospital"
          variant="outlined"
          label="Primary Hospital"
          value={form.docHospital}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />

        <TextField
          name="docActiveYears"
          variant="outlined"
          type="number"
          label="Active Since"
          value={form.docActiveYears}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />

        <Autocomplete
          id="controllable-states-demo"
          value={form.specialization}
          onChange={(event, newValue) =>
            handleChange("docSpecialization", newValue.label)
          }
          options={specializations}
          renderInput={(params) => (
            <TextField {...params} label="Specialization" />
          )}
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            name="docGender"
            label="Gender"
            value={form.docGender}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          >
            <MenuItem value="M">Male</MenuItem>
            <MenuItem value="F">Female</MenuItem>
          </Select>
        </FormControl>

        <QualificationTable data={qualifications} fn={setQualifications} />

        <TextField
          name="description"
          label="Description"
          multiline
          rows={4}
          isOption
          variant="outlined"
          value={form.description}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default DoctorForm;
