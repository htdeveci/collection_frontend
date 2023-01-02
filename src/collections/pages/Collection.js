import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import classes from "./Collection.module.css";
import Card from "../../shared/components/UIElements/Card";
import Image from "../../shared/components/UIElements/Image";
import { REQUEST_TYPE, useHttpClient } from "../../shared/hooks/http-hook";

const Collection = () => {
  const [loadedCollection, setLoadedCollection] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const collectionId = useParams().collectionId;

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const responseData = await sendRequest(`/collections/${collectionId}`);
        setLoadedCollection(responseData);
      } catch (err) {}
    };

    fetchCollection();
  }, [sendRequest]);

  return (
    <>
      {error && <p>{error}</p>}
      {loadedCollection && (
        <>
          <h1 className={classes.collectionName}>{loadedCollection.name}</h1>
          <div className={classes.itemArea}>
            {loadedCollection.itemList.map((item) => {
              return (
                <Card className={classes.itemCard} key={item.id}>
                  <Link to={`/item/${item.id}`}>
                    <div>
                      <Image
                        className={classes.image}
                        src={item.coverPicture}
                        borderRadius={0}
                        alt={item.name}
                      />
                      <p>{item.name}</p>
                    </div>
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

export default Collection;
