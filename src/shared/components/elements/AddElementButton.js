import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import { IoAddCircleOutline } from "react-icons/io5";

import classes from "./AddElementButton.module.css";

const AddElementButton = (props) => {
  return (
    <Card onClick={props.onClick} className={classes.container}>
      <CardActionArea style={{ flex: 1 }}>
        <CardContent className={classes.container} sx={{ rowGap: 5 }}>
          <IoAddCircleOutline size={"100px"} />
          <Typography variant="p">{props.buttonName}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AddElementButton;
