import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

// import classes from "./Collection.module.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import DisplayProfileOrCollection from "../../shared/components/elements/DisplayProfileOrCollection";
import ShareButtons from "../../shared/components/share/ShareButtons";
import { useSelector } from "react-redux";

const Collection = () => {
  // const loggedInUserId = useSelector((state) => state.auth.userId);
  const collectionId = useParams().collectionId;
  const [collection, setCollection] = useState(null);
  const { error, sendRequest } = useHttpClient();

  const fetchCollection = useCallback(async () => {
    try {
      const responseData = await sendRequest(`/collections/${collectionId}`);
      setCollection(responseData);
    } catch (err) {
      setCollection(null);
      console.log(err);
    }
  }, [collectionId, sendRequest]);

  useEffect(() => {
    fetchCollection();
  }, [fetchCollection]);

  return (
    <>
      <DisplayProfileOrCollection
        type="collection"
        id={collectionId}
        data={collection}
        setData={setCollection}
        dataError={error}
        updateData={fetchCollection}
      />
      <ShareButtons iconSize={40} color="orange" />
    </>
  );
};

export default Collection;
