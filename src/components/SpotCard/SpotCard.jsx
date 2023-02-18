import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    width: "400px",
    marginBottom: "50px",
    marginRight: "20px",
  },
  media: {
    height: 250,
  },
});

const SpotCard = ({
  id,
  imageUrls,
  title,
  description,
  price,
  noOfReviews,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/spots/${id}`);
  };

  return (
    <Card className={classes.card} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imageUrls[0]}
          title="Movie Title"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Price: {price}$ per day
          </Typography>
          <Typography variant="h6" color="textSecondary" sx={{ mt: 5 }}>
            No of Reviews Available: {noOfReviews}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SpotCard;
