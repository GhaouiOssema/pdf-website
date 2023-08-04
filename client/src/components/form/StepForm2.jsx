import React, { useState } from "react";
import TextField from "@mui/material/TextField";

const StepForm2 = () => {
  const [formData, setFormData] = useState({
    input3: "",
    input4: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <div>
      <TextField
        name="input3"
        label="Input 3"
        value={formData.input3 || ""}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        name="input4"
        label="Input 4"
        value={formData.input4 || ""}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
    </div>
  );
};

export default StepForm2;
