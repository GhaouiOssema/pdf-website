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
import IMG_2 from "../assets/carousel2.jpg";
import IMG_3 from "../assets/carrousel1.jpg";
import IMG_4 from "../assets/carrousel4.jpg";

const data = [
  {
    src: IMG_4,
    title: "Suivi centralisé",
    description: "Enregistrement automatique des rapports.",
    class: "bg-red-400 object-fit bg-no-repeat",
  },
  {
    src: IMG_2,
    title: "Gagnez du temps",
    description: "simplifie le processus de maintenance.",
    class: "bg-blue-400 object-fit bg-no-repeat",
  },
  {
    src: IMG_3,
    title: "Suivi centralisé",
    description: "suivre l'historique de chaque machine.",
    class: "bg-green-400 object-fit bg-no-repeat",
  },
];

const DefaultCarousel = () => {
  return (
    <Card variant="outlined" sx={{ width: "100%", p: 0 }}>
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
                  <Typography level="body-sm" sx={{ fontSize: "xs" }}>
                    {item.description}
                  </Typography>
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
