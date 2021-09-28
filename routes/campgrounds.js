const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const campgrounds = require("../controllers/campgrounds");
const multer = require("multer"); // so we can parse form info
const { storage } = require("../cloudinary");
const upload = multer({ storage }); // destination for the files, in real world we wolud use database like cloudinary

router
  .route("/")
  .get(catchAsync(campgrounds.index))
  // creating new campgrund
  .post(
    isLoggedIn, // so that you can't add new campground from postman
    upload.array("image"), // has to go before validateCampground because it depends on req.body and molter is responsible for adding data onto req.body
    validateCampground,
    catchAsync(campgrounds.createCampground)
  );

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(campgrounds.showCampground))
  .put(
    // update campground
    isLoggedIn,
    isAuthor,
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
