import { useEffect, useState } from "react";

import classes from "./Home.module.css";
import { useHttpClient } from "../hooks/http-hook";
import ElementOverview from "../components/elements/ElementOverview";
import { useSelector } from "react-redux";

const Home = () => {
  const userId = useSelector((store) => store.auth.userId);
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
  /* 
  useEffect(() => {

  }, []);
 */
  return (
    <div className={classes.collectionsContainer}>
      {loadedCollections &&
        loadedCollections.map((collection) => {
          return (
            <ElementOverview
              key={collection.id}
              id={collection.id}
              type="collection"
              elementName={collection.name}
              elementDescription={collection.description}
              coverPicture={collection.coverPicture}
              showFavoriteActions={!!userId}
              favoriteStatus={collection.favoriteByUserList.includes(userId)}
              favoriteCount={collection.favoriteByUserList.length}
              isElementHidden={collection.visibility === "self"}
            />
          );
        })}
    </div>
  );
};

export default Home;
