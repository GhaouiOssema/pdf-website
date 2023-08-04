import React, { useState } from "react";
import TextField from "@mui/material/TextField";

const StepForm3 = () => {
  const [formData, setFormData] = useState({
    input5: "",
    input6: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <div>
      <TextField
        name="input5"
        label="Input 5"
        value={formData.input5 || ""}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        name="input6"
        label="Input 6"
        value={formData.input6 || ""}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
    </div>
  );
};

export default StepForm3;
