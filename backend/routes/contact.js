const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// Create email transporter
const transporter = nodemailer.createTransporter({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Contact form submission
router.post("/", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Email content
        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER, // Your email
            subject: `New Portfolio Message from ${name}`,
            text: `
Name: ${name}
Email: ${email}
Message: ${message}
            `,
            html: `
<h3>New Message from Your Portfolio</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${message}</p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.json({
            success: true,
            message: "Message sent successfully! You should receive an email notification."
        });

    } catch (error) {
        console.error("Email error:", error);
        res.status(500).json({
            success: false,
            message: "Error sending message"
        });
    }
});

router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Contact API is working!"
    });
});

module.exports = router;
