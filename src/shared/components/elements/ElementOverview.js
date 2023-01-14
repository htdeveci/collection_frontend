import { Link } from "react-router-dom";

import classes from "./ElementOverview.module.css";
import Card from "../UIElements/Card";
import Image from "../UIElements/Image";
import Button from "../FormElements/Button";

const ElementOverview = (props) => {
  return (
    <Card>
      <Link
        className={classes.link}
        to={`${props.type === "collection" ? "/collection/" : "/item/"}${
          props.id
        }`}
      >
        <div className={classes.collection}>
          <Image
            src={props.coverPicture}
            borderRadius={0}
            alt={props.collectionName}
          />
          <p>{props.collectionName}</p>
        </div>
      </Link>
      {props.showActions && (
        <div className={classes.actions}>
          <Button
            small
            type="button"
            onClick={props.editHandler.bind(null, props.collectionId)}
          >
            Edit
          </Button>
          <Button
            small
            type="button"
            onClick={props.deleteHandler.bind(null, props.collectionId)}
            inverse
          >
            Delete
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ElementOverview;
