import { Link, useNavigate } from "react-router-dom";

import classes from "./ElementOverview.module.css";
// import Card from "../UIElements/Card";
import Image from "../UIElements/Image";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { IMAGE_BASE_URL } from "../../utils/global-constants";

const ElementOverview = ({
  type,
  id,
  coverPicture,
  elementName,
  elementDescription,
  editHandler,
  deleteHandler,
  showActions,
}) => {
  const imageUrl = coverPicture.replaceAll("\\", "/");
  const navigate = useNavigate();

  const cardClickHandler = () => {
    navigate(`${type === "collection" ? "/collection/" : "/item/"}${id}`);
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
            <Typography variant="subtitle1">{elementName}</Typography>
            <Typography variant="subtitle2">{elementDescription}</Typography>
          </CardContent>
        </CardActionArea>

        {showActions && (
          <CardActions>
            <Button type="button" onClick={editHandler}>
              Edit
            </Button>

            <Button type="button" onClick={deleteHandler} color="error">
              Delete
            </Button>
          </CardActions>
        )}
      </Card>
    </>
  );
};

export default ElementOverview;
