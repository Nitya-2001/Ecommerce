import { Rating } from "@material-ui/lab";
import React from "react";
import profilePng from "../../images/Profile.png";
import { useSelector } from "react-redux";

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  const { user } = useSelector((state) => state.user);
  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
