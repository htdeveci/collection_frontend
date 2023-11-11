import { Box, Tab, Tabs } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";

import ElementOverview from "../components/elements/ElementOverview";
import { useHttpClient } from "../hooks/http-hook";
import classes from "./Favorites.module.css";

const Favorites = () => {
  const navigate = useNavigate();
  const userId = useSelector((store) => store.auth.userId);
  const [user, setUser] = useState(null);
  const [waitedForStore, setWaitedForStore] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const { sendRequest } = useHttpClient();

  const fetchUser = useCallback(async () => {
    try {
      const responseData = await sendRequest(`/users/${userId}`);
      setUser({
        ...responseData,
        favoriteCollectionList: responseData.favoriteCollectionList.reverse(),
        favoriteItemList: responseData.favoriteItemList.reverse(),
      });
    } catch (err) {
      navigate("/");
      console.log(err);
    }
  }, [userId, sendRequest, navigate]);

  useEffect(() => {
    if (!waitedForStore) {
      setWaitedForStore(true);
      return;
    }
    fetchUser();
  }, [waitedForStore, fetchUser, userId]);

  const tabChangeHandler = (event, index) => {
    setSelectedTabIndex(index);
  };

  const tabIndexChangeHandler = (index) => {
    setSelectedTabIndex(index);
  };

  return (
    <>
      <Tabs
        value={selectedTabIndex}
        onChange={tabChangeHandler}
        textColor="secondary"
        indicatorColor="secondary"
        centered
      >
        <Tab label="Collections" />

        <Tab label="Items" />
      </Tabs>

      <SwipeableViews
        index={selectedTabIndex}
        onChangeIndex={tabIndexChangeHandler}
      >
        <Box className={classes.elementOverviewContainer}>
          {user &&
            user.favoriteCollectionList.map((col) => {
              return (
                <ElementOverview
                  key={col.id}
                  type="collection"
                  id={col.id}
                  elementName={col.name}
                  elementDescription={col.description}
                  coverPicture={col.coverPicture}
                  isElementHidden={col.visibility !== "everyone"}
                  showFavoriteActions
                  favoriteStatus={true}
                  favoriteCount={col.favoriteByUserList.length}
                  onFavoriteStatusChange={fetchUser}
                />
              );
            })}
        </Box>

        <Box className={classes.elementOverviewContainer}>
          {user &&
            user.favoriteItemList.map((item) => {
              return (
                <ElementOverview
                  key={item.id}
                  type="item"
                  id={item.id}
                  elementName={item.name}
                  elementDescription={item.description}
                  coverPicture={item.mediaList[0]}
                  isElementHidden={item.visibility !== "everyone"}
                  showFavoriteActions
                  favoriteStatus={true}
                  favoriteCount={item.favoriteByUserList.length}
                  onFavoriteStatusChange={fetchUser}
                />
              );
            })}
        </Box>
      </SwipeableViews>
    </>
  );
};

export default Favorites;
