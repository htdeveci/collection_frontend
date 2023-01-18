import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import classes from "./Item.module.css";
import Image from "../../shared/components/UIElements/Image";
import { useHttpClient } from "../../shared/hooks/http-hook";

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

  return (
    <>
      {loadedItem && (
        <>
          <Image
            src={loadedItem.coverPicture}
            alt={loadedItem.coverPicture.split("\\")[2]}
            height={300}
            className={classes.image}
          />
          <div className={classes.center}>
            <h2>{loadedItem.name}</h2>
            <p>{loadedItem.description}</p>
            <p>
              {"a piece of "}
              <Link to={`/collection/${loadedItem.collectionId.id}`}>
                {loadedItem.collectionId.name}
              </Link>
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default Item;
