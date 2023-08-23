import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import List from "@mui/joy/List";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemButton from "@mui/joy/ListItemButton";
import IMG_1 from "../assets/img_1.png";

const data = [
  {
    src: IMG_1,
    title: "Night view",
    description: "4.21M views",
    class: "bg-red-400 object-fit bg-no-repeat",
  },
  {
    src: IMG_1,
    title: "Lake view",
    description: "4.74M views",
    class: "bg-blue-400 object-fit bg-no-repeat",
  },
  {
    src: IMG_1,
    title: "Mountain view",
    description: "3.98M views",
    class: "bg-green-400 object-fit bg-no-repeat",
  },
];

const DefaultCarousel = () => {
  return (
    <Card variant="outlined" sx={{ width: 280, p: 0 }}>
      <List sx={{ py: "var(--ListDivider-gap)" }}>
        {data.map((item, index) => (
          <React.Fragment key={item.title}>
            <ListItem>
              <ListItemButton sx={{ gap: 2 }}>
                <AspectRatio sx={{ flexBasis: 120 }}>
                  <img
                    src={`${item.src}?w=120&fit=crop&auto=format`}
                    srcSet={`${item.src}?w=120&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    className={item.class}
                  />
                </AspectRatio>
                <ListItemContent>
                  <Typography fontWeight="md">{item.title}</Typography>
                  <Typography level="body-sm">{item.description}</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
            {index !== data.length - 1 && <ListDivider />}
          </React.Fragment>
        ))}
      </List>
    </Card>
  );
};

export default DefaultCarousel;
