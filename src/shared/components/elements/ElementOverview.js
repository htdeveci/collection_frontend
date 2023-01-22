import { Link } from "react-router-dom";

import classes from "./ElementOverview.module.css";
import Card from "../UIElements/Card";
import Image from "../UIElements/Image";
import Button from "../FormElements/Button";

const ElementOverview = ({
  type,
  id,
  coverPicture,
  collectionName,
  editHandler,
  deleteHandler,
  showActions,
}) => {
  return (
    <Card>
      <Link
        className={classes.link}
        to={`${type === "collection" ? "/collection/" : "/item/"}${id}`}
      >
        <div className={classes.collection}>
          <Image src={coverPicture} borderRadius={0} alt={collectionName} />
          <p>{collectionName}</p>
        </div>
      </Link>
      {showActions && (
        <div className={classes.actions}>
          <Button small type="button" onClick={editHandler}>
            Edit
          </Button>
          <Button small type="button" onClick={deleteHandler} inverse>
            Delete
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ElementOverview;
