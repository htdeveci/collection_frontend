import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";

import classes from "./Collection.module.css";
import Card from "../../shared/components/UIElements/Card";
import Image from "../../shared/components/UIElements/Image";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import DisplayProfileOrCollection from "../../shared/components/elements/DisplayProfileOrCollection";

const Collection = () => {
  const collectionId = useParams().collectionId;
  const [collection, setCollection] = useState(null);
  const { error, sendRequest } = useHttpClient();

  const fetchCollection = useCallback(async () => {
    const responseData = await sendRequest(`/collections/${collectionId}`);
    setCollection(responseData);
  }, [collectionId, sendRequest]);

  useEffect(() => {
    fetchCollection();
  }, []);

  return (
    <DisplayProfileOrCollection
      type="collection"
      id={collectionId}
      data={collection}
      setData={setCollection}
      dataError={error}
      updateData={fetchCollection}
    />
  );
};

export default Collection;
