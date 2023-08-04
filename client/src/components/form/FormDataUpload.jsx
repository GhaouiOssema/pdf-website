import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StepForm1 from "./StepForm1";
import StepForm2 from "./StepForm2";
// Import other StepForm components here
import axios from "axios";

const steps = [
  {
    label: "Step 1: Fill out Form 1",
    component: StepForm1,
  },
  {
    label: "Step 2: Fill out Form 2",
    component: StepForm2,
  },
];

const FormDataUpload = () => {
  const [activeStep, setActiveStep] = useState(0);
  const formRefs = useRef([]);

  const totalSteps = () => {
    return steps.length;
  };

  const handleNext = async () => {
    if (formRefs.current[activeStep] && formRefs.current[activeStep].current) {
      // Trigger form submission and get the result
      const isFormSubmitted = await formRefs.current[
        activeStep
      ].current.handleSubmit();

      // If the form is submitted successfully, proceed to the next step
      if (isFormSubmitted) {
        const newActiveStep =
          activeStep === totalSteps() - 1 ? activeStep : activeStep + 1;
        setActiveStep(newActiveStep);
      }
    } else {
      // If there's no form component or handleSubmit function, simply move to the next step
      const newActiveStep =
        activeStep === totalSteps() - 1 ? activeStep : activeStep + 1;
      setActiveStep(newActiveStep);
    }
  };

  const handleFormSubmit = async (isFormSubmitted) => {
    if (isFormSubmitted) {
      const newActiveStep =
        activeStep === totalSteps() - 1 ? activeStep : activeStep + 1;
      setActiveStep(newActiveStep);
    }
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const StepComponent = steps[activeStep].component;
  if (!formRefs.current[activeStep]) {
    formRefs.current[activeStep] = React.createRef();
  }

  return (
    <Box sx={{ width: "80%", pt: 20, pl: 5 }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step.label} completed={index < activeStep}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {step.label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === totalSteps() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              {steps[activeStep].label}
            </Typography>
            <StepComponent
              ref={formRefs.current[activeStep]}
              onFormSubmit={handleFormSubmit}
            />
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }}>
                <Button onClick={handleNext} sx={{ mb: 2 }}>
                  {activeStep === totalSteps() - 1 ? "Submit" : "Next"}
                </Button>
              </Box>
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
};

export default FormDataUpload;
