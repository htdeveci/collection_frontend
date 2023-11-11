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
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { IMAGE_BASE_URL } from "../../utils/global-constants";
import { Favorite } from "@mui/icons-material";
import { useState } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import SlideshowRoundedIcon from "@mui/icons-material/SlideshowRounded";

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
  onFavoriteStatusChange = null,
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
      if (onFavoriteStatusChange) onFavoriteStatusChange();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Card sx={{ flex: "0 0 calc(33.3% - 1.333rem)" }}>
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
                <Tooltip title="Start Slide Show">
                  <IconButton color="secondary" size="small">
                    <SlideshowRoundedIcon />
                  </IconButton>
                </Tooltip>

                <Typography
                  color="text"
                  variant="caption"
                  sx={{ paddingTop: 0.3, marginLeft: 1 }}
                >
                  {favoriteCount}
                </Typography>

                <Tooltip title="Add to Favorites">
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
                </Tooltip>
              </Stack>
            )}
          </CardActions>
        )}

        {!showEditActions && showFavoriteActions && (
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Stack direction="row" spacing={0} alignItems="center">
              <Tooltip title="Start Slide Show">
                <IconButton color="secondary" size="small">
                  <SlideshowRoundedIcon />
                </IconButton>
              </Tooltip>

              <Typography
                color="text"
                variant="caption"
                sx={{ paddingTop: 0.3, marginLeft: 1 }}
              >
                {favoriteCount}
              </Typography>

              <Tooltip title="Add to Favorites">
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
              </Tooltip>
            </Stack>
          </CardActions>
        )}
      </Card>
    </>
  );
};

export default ElementOverview;
