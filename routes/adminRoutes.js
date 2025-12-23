// const express = require("express");
// const jwt = require("jsonwebtoken");
// const router = express.Router();

// router.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   if (
//     email === process.env.ADMIN_EMAIL &&
//     password === process.env.ADMIN_PASSWORD
//   ) {
//     const token = jwt.sign({ email }, process.env.JWT_SECRET, {
//       expiresIn: "1d"
//     });

//     return res.json({ success: true, token });
//   }

//   res.status(401).json({ success: false, msg: "Invalid credentials" });
// });

// module.exports = router;

const express = require("express");
const jwt = require("jsonwebtoken");
const Contact = require("../models/Contact");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// =====================
// ADMIN LOGIN
// =====================
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({ success: true, token });
  }

  res.status(401).json({ success: false, msg: "Invalid credentials" });
});

// =====================
// GET ALL CONTACT MESSAGES
// =====================
router.get("/messages", auth, async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 });
  res.json(messages);
});

module.exports = router;
