const Review = require('../Models/reviewModel');
const AllProduct = require('../Models/allproductModel');

const addReview = async (req, res) => {
  console.log("Incoming address:", req.body);
  try {
    const { productId, rating, comment } = req.body;
    const alreadyReviewed = await Review.findOne({ product: productId, user: req.user._id });
    if (alreadyReviewed) {
      return res.status(400).json({ message: "You already reviewed this product" });
    }

    const review = new Review({
      product: productId,
      user: req.user._id,
      rating,
      comment
    });

    await review.save();

    const stats = await Review.aggregate([
      { $match: { product: review.product } },
      { $group: { _id: "$product", avgRating: { $avg: "$rating" }, count: { $sum: 1 } } }
    ]);

    await AllProduct.findByIdAndUpdate(productId, {
      averageRating: stats[0].avgRating,
      reviewCount: stats[0].count
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReviewsByProduct = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addReview,
  getReviewsByProduct
};
