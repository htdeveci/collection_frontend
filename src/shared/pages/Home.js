import { useEffect, useState } from "react";

import classes from "./Home.module.css";
import { useHttpClient } from "../hooks/http-hook";
import CollectionOverview from "../../collections/components/CollectionOverview";

const Home = () => {
  const [loadedCollections, setLoadedCollections] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const responseData = await sendRequest("/collections");
        setLoadedCollections(responseData.collections);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCollections();
  }, [sendRequest]);

  return (
    <div className={classes.collectionsContainer}>
      {loadedCollections &&
        loadedCollections.map((collection) => {
          return (
            <CollectionOverview
              key={collection.id}
              collectionId={collection.id}
              collectionName={collection.name}
              coverPicture={collection.coverPicture}
            />
          );
        })}
    </div>
  );
};

export default Home;
