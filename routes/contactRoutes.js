// // const express = require("express");
// // const router = express.Router();
// // const { sendMessage } = require("../controllers/contactController");

// // router.post("/", sendMessage);

// // module.exports = router;

// const express = require("express");
// const Contact = require("../models/Contact");
// const auth = require("../middleware/authMiddleware");
// const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     await Contact.create(req.body);
//     res.json({ success: true });
//   } catch {
//     res.status(500).json({ success: false });
//   }
// });

// router.get("/", auth, async (req, res) => {
//   const messages = await Contact.find().sort({ createdAt: -1 });
//   res.json(messages);
// });

// router.delete("/:id", auth, async (req, res) => {
//   await Contact.findByIdAndDelete(req.params.id);
//   res.json({ success: true });
// });

// module.exports = router;


// const express = require("express");
// const nodemailer = require("nodemailer");
// const Contact = require("../models/Contact");

// const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const { name, email, subject, message } = req.body;

//     if (!name || !email || !message) {
//       return res.json({ success: false, msg: "All fields required" });
//     }

//     await Contact.create({ name, email, subject, message });

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//       }
//     });

//     await transporter.sendMail({
//       from: `"HAM Software Solutions" <${process.env.EMAIL_USER}>`,
//       to: process.env.EMAIL_USER,
//       subject: "📩 New Contact Message",
//       html: `
//         <h3>New Contact Message</h3>
//         <p><b>Name:</b> ${name}</p>
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Subject:</b> ${subject || "N/A"}</p>
//         <p>${message}</p>
//       `
//     });

//     res.json({ success: true });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false });
//   }
// });

// module.exports = router;

const express = require("express");
const nodemailer = require("nodemailer");
const Contact = require("../models/Contact");

const router = express.Router();

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, msg: "All fields are required." });
    }

    // Save message to database
    await Contact.create({ name, email, subject, message });

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // Use App Password for Gmail
      }
    });

    // Email to admin
    await transporter.sendMail({
      from: `"HAM Software Solutions" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📩 New Contact Message: ${subject || "No Subject"}`,
      html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject || "N/A"}</p>
        <p><b>Message:</b><br>${message}</p>
      `
    });

    // Confirmation email to user
    await transporter.sendMail({
      from: `"HAM Software Solutions" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting HAM Software Solutions",
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for reaching out! We have received your message and will get back to you shortly.</p>
        <hr>
        <p>— HAM Software Solutions</p>
      `
    });

    res.status(200).json({ success: true, msg: "Message sent successfully." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Server error. Please try again later." });
  }
});

module.exports = router;
