import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/loader";
import { useAlert } from "react-alert";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { addItemsToCart } from "../../actions/cartAction";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import Alert from "@mui/material/Alert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const id = useParams();
  const { product, error, loading } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to manage success message

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    console.log(quantity);
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id.id, quantity));

    setShowSuccessMessage(true);
    toast.success("Success message!"); // Show success message
  };

  const submitReviewToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    console.log(myForm);
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id.id);

    console.log(myForm);
    dispatch(newReview(myForm));

    setOpen(false);
  };
  console.log(product.reviews);
  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      console.log(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      setShowSuccessMessage(true);
      toast.success("Success message!"); // Show success message
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id.id, error, alert, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {" "}
          <div className="ProductDetails">
            <div>
              {product.images &&
                product.images.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={item.url}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span>({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={
                      product.Stock < 1
                        ? true
                        : false || quantity === product.Stock
                        ? true
                        : false
                    }
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="reviewHeading">Reviews</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
          {/* Display success message if showSuccessMessage is true */}
          {showSuccessMessage && (
            <p className="successMessage">Item Added To Cart</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
