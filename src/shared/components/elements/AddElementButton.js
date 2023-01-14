import { IoAddCircleOutline } from "react-icons/io5";

import classes from "./AddElementButton.module.css";
import Card from "../UIElements/Card";

const AddElementButton = (props) => {
  return (
    <Card className={classes.container} onClick={props.onClick}>
      <IoAddCircleOutline size={"88px"} />
      <p>{props.buttonName}</p>
    </Card>
  );
};

export default AddElementButton;
