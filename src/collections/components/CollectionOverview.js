import { Link } from "react-router-dom";

import classes from "./CollectionOverview.module.css";
import Card from "../../shared/components/UIElements/Card";
import Image from "../../shared/components/UIElements/Image";

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
    </Card>
  );
};

export default CollectionOverview;
