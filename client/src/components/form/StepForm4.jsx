import React, { useState } from "react";
import TextField from "@mui/material/TextField";

const StepForm4 = () => {
  const [formData, setFormData] = useState({
    input7: "",
    input8: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <div>
      <TextField
        name="input7"
        label="Input 7"
        value={formData.input7 || ""}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        name="input8"
        label="Input 8"
        value={formData.input8 || ""}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
    </div>
  );
};

export default StepForm4;
