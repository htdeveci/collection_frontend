import { useEffect, useState } from "react";

import classes from "./Home.module.css";
import { useHttpClient } from "../hooks/http-hook";
import ElementOverview from "../components/elements/ElementOverview";

const Home = () => {
  const [loadedCollections, setLoadedCollections] = useState();
  const { sendRequest } = useHttpClient();

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
            <ElementOverview
              key={collection.id}
              id={collection.id}
              type="collection"
              collectionName={collection.name}
              coverPicture={collection.coverPicture}
            />
          );
        })}
    </div>
  );
};

export default Home;
