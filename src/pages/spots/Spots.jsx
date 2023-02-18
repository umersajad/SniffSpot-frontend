import React, { useEffect, useState } from "react";
import { spotListingHandler } from "../../modules/spots/service";
import { Pagination } from "@mui/material";
import SpotCard from "../../components/SpotCard/SpotCard";
import { useStyles } from "./style/Spot";

export const Spots = () => {
  const classes = useStyles();
  const [spots, setSpots] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  useEffect(() => {
    const handleSPotListing = async () => {
      const response = await spotListingHandler(currentPage);
      if (response.data) {
        setSpots(response.data.spots);
        setPages(response.data.total_pages);
      } else {
        console.log(response.error?.message);
      }
    };
    handleSPotListing();
  }, [currentPage]);
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  return (
    <div className={classes.root}>
      {spots &&
        spots.map((spot) => {
          return (
            <SpotCard
              key={spot.id}
              imageUrls={spot.image_urls}
              title={spot.title}
              description={spot.description}
              price={spot.price}
              id={spot.id}
              noOfReviews={spot.no_of_reviews}
            />
          );
        })}
      <div className={classes.PaginationContainer}>
        <Pagination
          color="primary"
          count={pages}
          page={currentPage}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
};
