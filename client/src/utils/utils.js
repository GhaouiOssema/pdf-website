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

export function truncateText(text, maxLength) {
  const words = text.split(" ");

  let truncatedText = "";
  let currentLength = 0;

  for (const word of words) {
    if (currentLength + word.length <= maxLength) {
      truncatedText += word + " ";
      currentLength += word.length + 1;
    } else {
      break;
    }
  }

  return truncatedText.trim() + (currentLength < text.length ? "..." : "");
}

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
  whiteSpace: "normal",
  wordWrap: "break-word",
};

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { lg: 600, md: 600, sm: 500, xs: 350 },
  bgcolor: "background.paper",
  border: "2px solid white",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};
