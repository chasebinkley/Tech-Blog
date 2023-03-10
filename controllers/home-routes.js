const router = require("express").Router();
const { Post, Comment, User } = require("../models/");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({});
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", { posts, layout: "home" });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
  }
  res.render("login", { layout: "home" });
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
  }
  res.render("signup", { layout: "home" });
});

module.exports = router;