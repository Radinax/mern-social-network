const express = require("express");
const router = express.Router();

// @route  GET api/posts/test
// @desc   Tests post route
// @access Public
router.get("/tests", (req, res) =>
  res.json({
    msg: "Post works"
  })
);

module.exports = router;
