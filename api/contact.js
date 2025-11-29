// api/contact.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransporter({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        try {
            const { name, email, message } = req.body;

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
                subject: `New Message from ${name}`,
                text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
            };

            await transporter.sendMail(mailOptions);

            res.json({
                success: true,
                message: "Message sent successfully! I'll get back to you soon."
            });

        } catch (error) {
            console.error("Email error:", error);
            res.status(500).json({
                success: false,
                message: "Error sending message. Please try again."
            });
        }
    } else {
        res.json({ success: true, message: "Contact API is working!" });
    }
};
