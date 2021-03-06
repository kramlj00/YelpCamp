const Review = require("../models/review");
const CampGround = require("../models/campground");

module.exports.createReview = async (req, res) => {
  const campground = await CampGround.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  req.flash("success", "Created new review");
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  // pull operator will take reviewId and pull anything with that id out of reviews which is the array of Ids
  await CampGround.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Successfully deleted review");
  res.redirect(`/campgrounds/${id}`);
};
