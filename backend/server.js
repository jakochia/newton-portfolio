require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const app = express();

// Connect to database
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("✅ MongoDB Connected Successfully");
        console.log(`📊 Database: ${mongoose.connection.name}`);
    })
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err);
    });

// Middleware
app.use(express.json());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, "..")));

// Create email transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Contact API Route
app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        console.log("📧 Received contact form from:", name);

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const mailOptions = {
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `📱 New Message from ${name}`,
            text: `
Name: ${name}
Email: ${email}
Message: ${message}

Sent from your portfolio website
            `,
            html: `
<div style="font-family: Arial, sans-serif;">
    <h2 style="color: #2563eb;">📱 New Portfolio Message</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
</div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent to:", process.env.EMAIL_USER);

        res.json({
            success: true,
            message: "Message sent successfully! I'll get back to you soon."
        });

    } catch (error) {
        console.error("❌ Email error:", error);
        res.status(500).json({
            success: false,
            message: "Error sending message. Please try again."
        });
    }
});

// API routes
app.get("/api/contact", (req, res) => {
    res.json({ success: true, message: "Contact API is working!" });
});

app.get("/api/projects", (req, res) => {
    res.json({ success: true, message: "Projects API is working!", data: [] });
});

// Serve me.html for all routes (SPA)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "me.html"));
});

// Export for Vercel
module.exports = app;
