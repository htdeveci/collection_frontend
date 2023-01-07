import { Link } from "react-router-dom";

import classes from "./CollectionOverview.module.css";
import Card from "../../shared/components/UIElements/Card";
import Image from "../../shared/components/UIElements/Image";
import Button from "../../shared/components/FormElements/Button";

const CollectionOverview = (props) => {
  return (
    <Card>
      <Link className={classes.link} to={`/collection/${props.collectionId}`}>
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

export default CollectionOverview;
