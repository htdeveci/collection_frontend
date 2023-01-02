import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import classes from "./Item.module.css";
import Image from "../../shared/components/UIElements/Image";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

const Item = (props) => {
  const itemId = useParams().itemId;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedItem, setLoadedItem] = useState();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const responseData = await sendRequest(`/items/${itemId}`);
        setLoadedItem(responseData);
      } catch (err) {}
    };

    fetchItem();
  }, [sendRequest]);

  return (
    <>
      <ImageUpload buttonTitle="ADD PHOTO" />
      {loadedItem && (
        <>
          <h2>{loadedItem.name}</h2>
          <p>{loadedItem.description}</p>
        </>
      )}
    </>
  );
};

export default Item;
