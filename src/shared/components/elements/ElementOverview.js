import { Link, useNavigate } from "react-router-dom";

import classes from "./ElementOverview.module.css";
// import Card from "../UIElements/Card";
import Image from "../UIElements/Image";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { IMAGE_BASE_URL } from "../../utils/global-constants";
import { Favorite } from "@mui/icons-material";
import { useState } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

const ElementOverview = ({
  type,
  id,
  coverPicture,
  elementName,
  elementDescription,
  showEditActions,
  editHandler,
  deleteHandler,
  showFavoriteActions,
  favoriteCount: favoriteCountProp = 0,
  favoriteStatus: favoriteStatusProp,
  isElementHidden = false,
}) => {
  const imageUrl = coverPicture.replaceAll("\\", "/");
  const navigate = useNavigate();
  const [favoriteStatus, setFavoriteStatus] = useState(favoriteStatusProp);
  const [favoriteCount, setFavoriteCount] = useState(favoriteCountProp);
  const theme = useTheme();
  const { sendRequest } = useHttpClient();

  const cardClickHandler = () => {
    navigate(`${type === "collection" ? "/collection/" : "/item/"}${id}`);
  };

  const toggleFavoriteHandler = async () => {
    setFavoriteStatus((state) => !state);
    try {
      const responseData = await sendRequest(
        `/${type === "collection" ? "collections" : "items"}/favorite/${id}`,
        "PATCH",
        null,
        true
      );
      setFavoriteCount(responseData.favoriteCount);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Card>
        <CardActionArea>
          <CardMedia
            sx={{ height: 200 }}
            image={IMAGE_BASE_URL + imageUrl}
            title={imageUrl.split("/")[2]}
            onClick={cardClickHandler}
          />

          <CardContent onClick={cardClickHandler}>
            <Stack direction="row" justifyContent="space-between">
              <Box>
                <Typography variant="subtitle1">{elementName}</Typography>
                <Typography variant="subtitle2">
                  {elementDescription}
                </Typography>
              </Box>

              {isElementHidden && (
                <VisibilityOffRoundedIcon
                  fontSize="small"
                  color="disabled"
                  sx={{ alignSelf: "flex-end" }}
                />
              )}
            </Stack>
          </CardContent>
        </CardActionArea>

        {showEditActions && (
          <CardActions sx={{ justifyContent: "space-between" }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Button type="button" onClick={editHandler}>
                Edit
              </Button>

              <Button type="button" onClick={deleteHandler} color="error">
                Delete
              </Button>
            </Stack>

            {showFavoriteActions && (
              <Stack direction="row" spacing={0} alignItems="center">
                <Typography
                  color="text"
                  variant="caption"
                  sx={{ paddingTop: 0.3 }}
                >
                  {favoriteCount}
                </Typography>
                <IconButton
                  aria-label="add to favorites"
                  onClick={toggleFavoriteHandler}
                >
                  <Favorite
                    fontSize="small"
                    sx={{
                      color: favoriteStatus
                        ? theme.palette.error.main
                        : "white",
                    }}
                  />
                </IconButton>
              </Stack>
            )}
          </CardActions>
        )}

        {!showEditActions && showFavoriteActions && (
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Stack direction="row" spacing={0} alignItems="center">
              <Typography
                color="text"
                variant="caption"
                sx={{ paddingTop: 0.3 }}
              >
                {favoriteCount}
              </Typography>
              <IconButton
                aria-label="add to favorites"
                onClick={toggleFavoriteHandler}
              >
                <Favorite
                  fontSize="small"
                  sx={{
                    color: favoriteStatus ? theme.palette.error.main : "white",
                  }}
                />
              </IconButton>
            </Stack>
          </CardActions>
        )}
      </Card>
    </>
  );
};

export default ElementOverview;
