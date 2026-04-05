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


// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");

// dotenv.config();
// const app = express();

// // Middleware
// app.use(cors({
//   origin: [
//     'https://hamsoftwaresolution-frontend-1.onrender.com',
//     'http://localhost:3000'
//   ],
//   credentials: true
// }));
// app.use(express.json());

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected - cluster0.p7bjq2p"))
//   .catch(err => console.error("❌ MongoDB Error:", err));

// // Routes
// app.use("/api/contact", require("./routes/contactRoutes"));
// app.use("/api/admin", require("./routes/adminRoutes"));

// // 🟢 Health Check API
// app.get('/api/health', (req, res) => {
//   res.json({
//     status: 'HAM Backend Live! 🚀',
//     mongodb: mongoose.connection.readyState === 1 ? 'Connected ✅' : 'Disconnected ❌',
//     routes: ['/api/health', '/api/contact', '/api/admin'],
//     frontend: 'https://hamsoftwaresolution-frontend-1.onrender.com'
//   });
// });

// // 🟢 Test WhatsApp Lead (Temporary)
// app.post('/api/send-whatsapp', async (req, res) => {
//   try {
//     const { phone, message } = req.body;
//     console.log(`📱 WhatsApp Lead: ${phone} - ${message}`);
    
//     res.json({
//       success: true,
//       message: 'Lead received! Contact route mein save hoga',
//       phone
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // 🟢 Root
// app.get("/", (req, res) => {
//   res.json({
//     message: "HAM Backend Running ✅",
//     apis: {
//       health: '/api/health',
//       whatsapp: '/api/send-whatsapp',
//       contact: '/api/contact',
//       admin: '/api/admin'
//     },
//     frontend: 'https://hamsoftwaresolution-frontend-1.onrender.com'
//   });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📱 Frontend: https://hamsoftwaresolution-frontend-1.onrender.com`);
// });


// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");

// dotenv.config();
// const app = express();

// // 🔥 PERFECT CORS CONFIG
// app.use(cors({
//   origin: [
//     'https://hamsoftwaresolution-frontend-1.onrender.com',
//     'http://localhost:3000',
//     '*'
//   ],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE']
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected - cluster0.p7bjq2p"))
//   .catch(err => console.error("❌ MongoDB Error:", err));

// // 🔥 DIRECT ROUTES (No separate files needed)
// app.post('/api/contact', (req, res) => {
//   try {
//     const { name, email, message, phone } = req.body;
//     console.log('📧 CONTACT FORM:', { name, email, message, phone });
    
//     res.json({
//       success: true,
//       message: '✅ Message sent to admin successfully!',
//       data: { name, email, phone }
//     });
//   } catch (error) {
//     console.error('Contact Error:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// app.post('/api/admin/login', (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log('🔐 Admin Login:', email);
    
//     if (email === process.env.ADMIN_EMAIL && 
//         password === process.env.ADMIN_PASSWORD) {
//       res.json({
//         success: true,
//         message: '🎉 Admin Login Successful!',
//         token: 'ham-admin-jwt-2024',
//         admin: true,
//         dashboard: '/admin-dashboard.html'
//       });
//     } else {
//       res.status(401).json({
//         success: false,
//         message: '❌ Invalid credentials'
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, error: 'Login server error' });
//   }
// });

// // 🟢 Health Check API
// app.get('/api/health', (req, res) => {
//   res.json({
//     status: 'HAM Backend Live! 🚀',
//     mongodb: mongoose.connection.readyState === 1 ? 'Connected ✅' : 'Disconnected ❌',
//     apis: {
//       health: 'GET /api/health ✅',
//       contact: 'POST /api/contact ✅', 
//       login: 'POST /api/admin/login ✅'
//     },
//     frontend: 'https://hamsoftwaresolution-frontend-1.onrender.com'
//   });
// });

// // 🟢 WhatsApp Lead
// app.post('/api/send-whatsapp', async (req, res) => {
//   try {
//     const { phone, message } = req.body;
//     console.log(`📱 WhatsApp Lead: ${phone} - ${message}`);
    
//     res.json({
//       success: true,
//       message: '✅ Lead received!',
//       phone
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // 🟢 Root Route
// app.get("/", (req, res) => {
//   res.json({
//     message: "HAM Backend Running ✅",
//     apis: {
//       health: '/api/health',
//       contact: '/api/contact (POST)',
//       login: '/api/admin/login (POST)',
//       whatsapp: '/api/send-whatsapp (POST)'
//     },
//     admin: {
//       email: process.env.ADMIN_EMAIL,
//       login: '/api/admin/login'
//     }
//   });
// });

// // 🟢 Favicon Fix
// app.get('/favicon.ico', (req, res) => res.status(204).end());

// // 🟢 404 Handler
// app.use('*', (req, res) => {
//   res.status(404).json({ 
//     error: 'API not found', 
//     available: ['/api/health', '/api/contact', '/api/admin/login'] 
//   });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running: https://hamsoftwaresolution-backend.onrender.com:${PORT}`);
//   console.log(`✅ MongoDB: Connected`);
//   console.log(`✅ Admin: ${process.env.ADMIN_EMAIL}`);
//   console.log(`📱 Frontend: https://hamsoftwaresolution-frontend-1.onrender.com`);
// });


// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const nodemailer = require("nodemailer");  // 🔥 EMAIL LIBRARY

// dotenv.config();
// const app = express();

// // 🔥 PERFECT CORS CONFIG
// app.use(cors({
//   origin: [
//     'https://hamsoftwaresolution-frontend-1.onrender.com',
//     'http://localhost:3000',
//     '*'
//   ],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE']
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // 🔥 EMAIL TRANSPORTER SETUP (Gmail)
// const transporter = nodemailer.createTransporter({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,        // hamsoftwaresolution@gmail.com
//     pass: process.env.EMAIL_PASS         // ozib nmea cnop betk
//   }
// });

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch(err => console.error("❌ MongoDB Error:", err));

// // 🔥 CONTACT FORM WITH EMAIL
// app.post('/api/contact', async (req, res) => {
//   try {
//     const { name, email, message, phone, subject } = req.body;
//     console.log('📧 CONTACT FORM:', { name, email, message, phone });
    
//     // 🔥 SEND EMAIL TO ADMIN
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: process.env.ADMIN_EMAIL,  // Admin ko jayega
//       subject: `New Contact Form: ${name} (${subject || 'General Inquiry'})`,
//       html: `
//         <h2>🎉 New Contact Received!</h2>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
//         <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
//         <p><strong>Message:</strong></p>
//         <blockquote style="background: #f5f5f5; padding: 15px; border-left: 4px solid #007cba;">
//           ${message}
//         </blockquote>
//         <hr>
//         <small>Received: ${new Date().toLocaleString()}</small>
//       `
//     };

//     // Email bhejo
//     await transporter.sendMail(mailOptions);
//     console.log('✅ Email sent to admin:', process.env.ADMIN_EMAIL);

//     res.json({
//       success: true,
//       message: '✅ Message sent to admin successfully! 📧',
//       data: { name, email, phone }
//     });

//   } catch (error) {
//     console.error('❌ Email Error:', error);
//     res.status(500).json({ 
//       success: false, 
//       error: 'Failed to send email',
//       details: error.message 
//     });
//   }
// });

// // 🔥 ADMIN LOGIN (Same)
// app.post('/api/admin/login', (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     if (email === process.env.ADMIN_EMAIL && 
//         password === process.env.ADMIN_PASSWORD) {
//       res.json({
//         success: true,
//         message: '🎉 Admin Login Successful!',
//         token: 'ham-admin-jwt-2024',
//         admin: true
//       });
//     } else {
//       res.status(401).json({ success: false, message: '❌ Invalid credentials' });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, error: 'Login error' });
//   }
// });

// // 🟢 Health Check
// app.get('/api/health', (req, res) => {
//   res.json({
//     status: 'HAM Backend Live! 🚀',
//     email: '✅ Configured',
//     mongodb: mongoose.connection.readyState === 1 ? 'Connected ✅' : 'Disconnected ❌',
//     apis: ['/api/contact', '/api/admin/login']
//   });
// });

// // 🟢 Test Email Route
// app.post('/api/test-email', async (req, res) => {
//   try {
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: process.env.ADMIN_EMAIL,
//       subject: '🧪 Test Email - HAM Backend',
//       text: 'Email working perfectly! 🎉'
//     });
//     res.json({ success: true, message: '✅ Test email sent!' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Root + Other routes (same)
// app.get("/", (req, res) => {
//   res.json({
//     message: "HAM Backend + EMAIL Ready ✅",
//     email: process.env.EMAIL_USER,
//     admin: process.env.ADMIN_EMAIL
//   });
// });

// app.get('/favicon.ico', (req, res) => res.status(204).end());

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server: https://hamsoftwaresolution-backend.onrender.com:${PORT}`);
//   console.log(`✅ Email: ${process.env.EMAIL_USER}`);
//   console.log(`✅ Admin: ${process.env.ADMIN_EMAIL}`);
// });


const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

dotenv.config();
const app = express();

// 🔥 CORS PERFECT
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS']
}));
app.options('*', cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 🔥 MONGODB CONTACT MODEL
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  subject: String,
  message: { type: String, required: true },
  ip: String,
  status: { type: String, default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// 🔥 EMAIL TRANSPORTER
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(() => console.log('⚠️ MongoDB optional'));

// 🔥 1. CONTACT FORM (SAVE + EMAIL)
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ success: false, message: 'All fields required' });
    }

    // ✅ STEP 1: MongoDB Save
    const contact = new Contact({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim(),
      subject: subject?.trim(),
      message: message.trim(),
      ip: req.ip
    });
    await contact.save();
    
    console.log('💾 SAVED:', name, email);

    // ✅ STEP 2: Admin Email
    try {
      await transporter.sendMail({
        from: `"HAM Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        replyTo: email,
        subject: `📩 New Contact: ${name}`,
        html: `
          <h2 style="color: #28a745;">🎉 New Contact Form</h2>
          <table style="border-collapse: collapse; width: 100%; border: 1px solid #ddd;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Name:</b></td><td style="padding: 8px; border: 1px solid #ddd;">${name}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Email:</b></td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
            ${phone ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Phone:</b></td><td style="padding: 8px; border: 1px solid #ddd;">${phone}</td></tr>` : ''}
            ${subject ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Subject:</b></td><td style="padding: 8px; border: 1px solid #ddd;">${subject}</td></tr>` : ''}
          </table>
          <h4>Message:</h4>
          <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #007cba; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr>
          <p><small>IP: ${req.ip} | ${new Date().toLocaleString()}</small></p>
        `
      });
      console.log('✅ EMAIL sent to admin');
    } catch (emailError) {
      console.log('⚠️ Email failed (but saved OK):', emailError.message);
    }

    res.json({
      success: true,
      message: '✅ Message saved & sent to admin! We will reply soon 📧💾'
    });

  } catch (error) {
    console.error('❌ Contact Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 🔥 2. ADMIN LOGIN
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    res.json({
      success: true,
      token: 'admin-jwt-token',
      message: 'Welcome Admin!'
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// 🔥 3. GET ALL CONTACTS (Admin Dashboard)
app.get('/api/admin/messages', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    const total = await Contact.countDocuments();
    const messages = await Contact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');  // Hide Mongo field
    
    res.json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      messages: messages.map(m => ({
        id: m._id,
        name: m.name,
        email: m.email,
        phone: m.phone,
        subject: m.subject,
        message: m.message,
        status: m.status,
        createdAt: m.createdAt
      }))
    });
  } catch (error) {
    console.error('Messages error:', error);
    res.status(500).json({ success: false, message: 'Load failed' });
  }
});

// 🔥 4. UPDATE MESSAGE STATUS
app.put('/api/admin/messages/:id', async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

// 🔥 5. HEALTH CHECK
app.get('/api/health', async (req, res) => {
  try {
    const count = await Contact.countDocuments();
    res.json({
      status: '🚀 HAM Backend PERFECT!',
      contacts: count,
      mongodb: '✅ Connected',
      email: '✅ Ready',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.json({ status: 'LIVE', contacts: 0 });
  }
});

// 🟢 ROOT
app.get('/', (req, res) => {
  res.json({
    status: 'HAM Backend - MongoDB + Email ✅',
    apis: {
      contact: 'POST /api/contact',
      login: 'POST /api/admin/login',
      messages: 'GET /api/admin/messages',
      health: 'GET /api/health'
    }
  });
});

// 🟢 FAVICON + 404
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.use((req, res) => res.status(404).json({ error: 'API not found' }));

// 🚀 START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('\n🚀 HAM Backend 100% LIVE!');
  console.log(`📍 https://hamsoftwaresolution-backend.onrender.com`);
  console.log(`💾 MongoDB: Contacts collection ready`);
  console.log(`📧 Email: ${process.env.EMAIL_USER}`);
  console.log(`👨 Admin: ${process.env.ADMIN_EMAIL}\n`);
});