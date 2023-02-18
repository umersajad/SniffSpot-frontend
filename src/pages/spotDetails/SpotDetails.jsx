import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  CardMedia,
  Container,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { spotDetailsHandler } from "../../modules/spots/service";
import { useNavigate, useParams } from "react-router-dom";
import { createReviewHandler } from "../../modules/reviews/service";
import Review from "../../components/Review/Review";

export const SpotDetails = () => {
  const navigate = useNavigate();
  const [spot, setSpot] = useState({});
  const userId = localStorage.getItem("userId");
  const [content, setContent] = useState("");
  let { id } = useParams();

  const handleReview = async () => {
    const values = new FormData();
    values.append("content", content);
    const response = await createReviewHandler(values, spot.id);
    if (response.data) {
      handleSpotDetails();
      setContent("");
    } else {
      console.log(response.error?.message);
    }
  };

  const handleSpotDetails = async () => {
    const response = await spotDetailsHandler(id);
    if (response.data) {
      setSpot(response.data);
    } else {
      console.log(response.error?.message);
    }
  };

  useEffect(() => {
    handleSpotDetails();
  }, []);

  return (
    <>
      <Container component="main" sx={{ borderBottom: "1px solid", mb: 2 }}>
        <Typography variant="h4" sx={{ textAlign: "center", mt: 5 }}>
          {spot.title}
        </Typography>
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          style={{ backgroundColor: "blue" }}
        >
          {spot.image_urls &&
            spot.image_urls.map((imageUrl) => {
              return (
                <CardMedia
                  component="img"
                  image={imageUrl}
                  title="Spot Image"
                  height="500px"
                  sx={{ objectFit: "contain", pb: 3 }}
                />
              );
            })}
        </Carousel>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: "10px",
          }}
        >
          <div>
            <Typography variant="body1">{spot.description}</Typography>
            <Typography variant="body1">Price: ${spot.price}</Typography>
          </div>
          {userId == spot.user_id && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                height="40"
                onClick={() => navigate(`/spots/edit/${spot.id}`)}
              >
                Edit Spot
              </Button>
            </div>
          )}
        </div>
      </Container>
      <Container component="main">
        <Typography variant="h3" sx={{ pb: 3 }}>
          Reviews:
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextField
            label="Add a Review"
            variant="outlined"
            sx={{ pb: 5, width: "85%" }}
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            sx={{ height: "50px", width: "100px", p: 3.5 }}
            onClick={handleReview}
          >
            Add a Review
          </Button>
        </div>
        {spot.reviews &&
          spot.reviews.map((review) => {
            return (
              <Review
                key={review.id}
                reviewUserId={review.user_id}
                authorName={review.username}
                text={review.content}
                reviewId={review.id}
              />
            );
          })}
      </Container>
    </>
  );
};
