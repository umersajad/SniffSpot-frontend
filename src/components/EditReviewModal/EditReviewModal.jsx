import { Button, Modal, TextField } from "@material-ui/core";
import React from "react";
import { updateReviewHandler } from "../../modules/reviews/service";
import { useStyles } from "./style/style";

const EditReviewModal = ({ isOpen, onClose, reviewContent, reviewId }) => {
  const classes = useStyles();
  const [content, setContent] = React.useState(reviewContent);

  const handleTextChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async () => {
    const values = new FormData();
    values.append("content", content);
    const response = await updateReviewHandler(values, reviewId);
    if (response.data) {
      window.location.reload();
    } else {
      console.log(response.error?.message);
    }
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose} className={classes.modal}>
      <div className={classes.paper}>
        <h2>Edit a Review</h2>
        <TextField
          label="Content"
          value={content}
          onChange={handleTextChange}
          className={classes.textField}
        />
        <div className={classes.actions}>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditReviewModal;
