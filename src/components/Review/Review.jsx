import { Card, CardContent, Typography, Button } from "@material-ui/core";
import React, { useState } from "react";
import EditReviewModal from "../EditReviewModal/EditReviewModal";
import { useStyles } from "./style/style";

const Review = ({ reviewUserId, authorName, text, reviewId }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = async () => {
    setShowModal(false);
  };
  const userId = localStorage.getItem("userId");

  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContainer}>
        <div>
          <Typography variant="h6" className={classes.title}>
            {authorName}
          </Typography>
          <Typography variant="body1" className={classes.content}>
            {text}
          </Typography>
        </div>
        {userId == reviewUserId && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              className={classes.editButton}
              variant="contained"
              color="primary"
              sx={{ m: 50 }}
              onClick={handleClick}
            >
              Edit
            </Button>
            {showModal && (
              <EditReviewModal
                isOpen={true}
                onClose={handleClose}
                reviewContent={text}
                reviewId={reviewId}
              />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Review;
