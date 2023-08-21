export const infoSteps = [
  {
    label: "Select campaign settings",
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: "Create an ad group",
    description:
      "An ad group contains one or more ads which target a shared set of keywords.",
  },
  {
    label: "Create an ad",
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

export const itemsStyle = {
  display: "flex",
  flexDirection: { lg: "row", md: "row", sm: "column", xs: "column" },
  alignItems: {
    lg: "center",
    md: "center",
    sm: "start",
    xs: "start",
  },
  justifyContent: {
    lg: "space-between",
    md: "space-between",
    sm: "flex-start",
    xs: "flex-start",
  },
  flexWrap: "wrap",
  overflowX: "auto",
};

export const itemTextStyle = {
  border: "1px solid #f3f4f6",
  p: 1.5,
  width: "100%",
  background: "#f3f4f6",
  borderRadius: 2,
};
