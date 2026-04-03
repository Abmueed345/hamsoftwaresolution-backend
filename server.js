// // // const express = require("express");
// // // const mongoose = require("mongoose");
// // // const cors = require("cors");
// // // require("dotenv").config();

// // // const app = express();

// // // // Middleware
// // // app.use(cors());
// // // app.use(express.json());

// // // // Routes
// // // app.use("/api/contact", require("./routes/contactRoutes"));

// // // // MongoDB
// // // mongoose.connect(process.env.MONGO_URI)
// // //   .then(() => console.log("MongoDB Connected"))
// // //   .catch(err => console.log(err));

// // // // Server
// // // const PORT = process.env.PORT || 5000;
// // // app.listen(PORT, () => {
// // //   console.log(`Server running on port ${PORT}`);
// // // });


// // const express = require("express");
// // const cors = require("cors");
// // const dotenv = require("dotenv");
// // const mongoose = require("mongoose");
// // const nodemailer = require("nodemailer");

// // dotenv.config();

// // const app = express();

// // // =====================
// // // MIDDLEWARE
// // // =====================
// // app.use(cors());
// // app.use(express.json());

// // // =====================
// // // MONGODB CONNECT
// // // =====================
// // mongoose.connect(process.env.MONGO_URI)
// //   .then(() => console.log("✅ MongoDB Connected"))
// //   .catch(err => console.error("❌ MongoDB Error:", err));

// // // =====================
// // // SCHEMA
// // // =====================
// // const ContactSchema = new mongoose.Schema({
// //   name: String,
// //   email: String,
// //   subject: String,
// //   message: String,
// //   createdAt: {
// //     type: Date,
// //     default: Date.now
// //   }
// // });

// // const Contact = mongoose.model("Contact", ContactSchema);

// // // =====================
// // // CONTACT API
// // // =====================
// // app.post("/api/contact", async (req, res) => {
// //   try {
// //     const { name, email, subject, message } = req.body;

// //     if (!name || !email || !message) {
// //       return res.json({ success: false, msg: "All fields required" });
// //     }

// //     // Save to MongoDB
// //     await Contact.create({ name, email, subject, message });

// //     // =====================
// //     // EMAIL SETUP
// //     // =====================
// //     const transporter = nodemailer.createTransport({
// //       service: "gmail",
// //       auth: {
// //         user: process.env.EMAIL_USER,
// //         pass: process.env.EMAIL_PASS
// //       }
// //     });

// //     await transporter.sendMail({
// //       from: `"HAM Software Solutions" <${process.env.EMAIL_USER}>`,
// //       to: process.env.EMAIL_USER,
// //       subject: "📩 New Contact Message",
// //       html: `
// //         <h3>New Contact Message</h3>
// //         <p><b>Name:</b> ${name}</p>
// //         <p><b>Email:</b> ${email}</p>
// //         <p><b>Subject:</b> ${subject || "N/A"}</p>
// //         <p><b>Message:</b><br>${message}</p>
// //       `
// //     });

// //     res.json({ success: true, msg: "Message sent successfully" });

// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ success: false, msg: "Server Error" });
// //   }
// // });

// // // =====================
// // // SERVER START
// // // =====================
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`🚀 Server running on http://localhost:${PORT}`);
// // });


// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const nodemailer = require("nodemailer");
// const jwt = require("jsonwebtoken");

// dotenv.config();

// const app = express();

// // =====================
// // MIDDLEWARE
// // =====================
// app.use(cors());
// app.use(express.json());

// // =====================
// // MONGODB CONNECT
// // =====================
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch(err => console.error("❌ MongoDB Error:", err));

// // =====================
// // SCHEMA
// // =====================
// const ContactSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   subject: String,
//   message: String,
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// const Contact = mongoose.model("Contact", ContactSchema);

// // =====================
// // HOME ROUTE (FIX Cannot GET /)
// // =====================
// app.get("/", (req, res) => {
//   res.send("HAM Software Solutions Backend is Running 🚀");
// });

// // =====================
// // CONTACT API (FORM)
// // =====================
// app.post("/api/contact", async (req, res) => {
//   try {
//     const { name, email, subject, message } = req.body;

//     if (!name || !email || !message) {
//       return res.json({ success: false, msg: "All fields required" });
//     }

//     // Save to MongoDB
//     await Contact.create({ name, email, subject, message });

//     // EMAIL SEND
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
//         <p><b>Message:</b><br>${message}</p>
//       `
//     });

//     res.json({ success: true, msg: "Message sent successfully" });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, msg: "Server Error" });
//   }
// });

// // =====================
// // ADMIN LOGIN
// // =====================
// app.post("/api/admin/login", (req, res) => {
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

//   res.status(401).json({ success: false, msg: "Invalid Credentials" });
// });

// // =====================
// // AUTH MIDDLEWARE
// // =====================
// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ msg: "No Token" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.admin = decoded;
//     next();
//   } catch {
//     res.status(401).json({ msg: "Invalid Token" });
//   }
// };

// // =====================
// // ADMIN: GET ALL CONTACTS
// // =====================
// app.get("/api/admin/messages", authMiddleware, async (req, res) => {
//   const messages = await Contact.find().sort({ createdAt: -1 });
//   res.json(messages);
// });

// // =====================
// // ADMIN: DELETE MESSAGE
// // =====================
// app.delete("/api/admin/messages/:id", authMiddleware, async (req, res) => {
//   await Contact.findByIdAndDelete(req.params.id);
//   res.json({ success: true });
// });

// // =====================
// // SERVER START
// // =====================
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });


// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch(err => console.log(err));

// app.use("/api/contact", require("./routes/contactRoutes"));
// app.use("/api/admin", require("./routes/adminRoutes"));

// app.get("/", (req, res) => {
//   res.send("HAM Backend Running ✅");
// });

// app.listen(process.env.PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
// });


const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: [
    'https://hamsoftwaresolution-frontend-1.onrender.com',
    'http://localhost:3000'
  ],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected - cluster0.p7bjq2p"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Routes
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// 🟢 Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'HAM Backend Live! 🚀',
    mongodb: mongoose.connection.readyState === 1 ? 'Connected ✅' : 'Disconnected ❌',
    routes: ['/api/health', '/api/contact', '/api/admin'],
    frontend: 'https://hamsoftwaresolution-frontend-1.onrender.com'
  });
});

// 🟢 Test WhatsApp Lead (Temporary)
app.post('/api/send-whatsapp', async (req, res) => {
  try {
    const { phone, message } = req.body;
    console.log(`📱 WhatsApp Lead: ${phone} - ${message}`);
    
    res.json({
      success: true,
      message: 'Lead received! Contact route mein save hoga',
      phone
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🟢 Root
app.get("/", (req, res) => {
  res.json({
    message: "HAM Backend Running ✅",
    apis: {
      health: '/api/health',
      whatsapp: '/api/send-whatsapp',
      contact: '/api/contact',
      admin: '/api/admin'
    },
    frontend: 'https://hamsoftwaresolution-frontend-1.onrender.com'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Frontend: https://hamsoftwaresolution-frontend-1.onrender.com`);
});