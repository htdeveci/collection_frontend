import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import classes from "./Item.module.css";
import Image from "../../shared/components/UIElements/Image";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Card from "../../shared/components/UIElements/Card";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

const Item = () => {
  const itemId = useParams().itemId;
  const { sendRequest } = useHttpClient();
  const [loadedItem, setLoadedItem] = useState();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const responseData = await sendRequest(`/items/${itemId}`);
        setLoadedItem(responseData);
      } catch (err) {}
    };

    fetchItem();
  }, [sendRequest, itemId]);

  const imageClickHandler = () => {};

  return (
    <>
      {loadedItem && (
        <>
          <div className={classes.infoArea}>
            <h2>{loadedItem.name}</h2>
            <p>{loadedItem.description}</p>
            <p>
              {"a piece of "}
              <Link to={`/collection/${loadedItem.collectionId.id}`}>
                {loadedItem.collectionId.name}
              </Link>
            </p>
            {/* <Button>Add Photo</Button> */}
            <ImageUpload buttonTitle="Add Photo" />
          </div>

          <Card className={classes.image} onClick={imageClickHandler}>
            <Link
              to={`/item/${itemId}/media/${
                loadedItem.coverPicture.split("\\")[2]
              }`}
            >
              <Image
                src={loadedItem.coverPicture}
                alt={loadedItem.coverPicture.split("\\")[2]}
              />
            </Link>
          </Card>

          <div className={classes.mediaListContainer}>
            {loadedItem.mediaList.map((media) => {
              return (
                <Card key={media} className={classes.mediaCard}>
                  <Link to={`/item/${itemId}/media/${media.split("\\")[2]}`}>
                    <Image src={media} alt={media.split("\\")[2]} />
                  </Link>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Item;
