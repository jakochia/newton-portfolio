const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Create transporter for emails
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Submit contact form
exports.submitContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Save to database
        const contact = await Contact.create({
            name,
            email,
            subject,
            message
        });

        // Send email notification
        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({
            success: true,
            message: 'Message sent successfully',
            data: contact
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error sending message',
            error: error.message
        });
    }
};

// Get all contact messages (admin)
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching contacts',
            error: error.message
        });
    }
};

// Update contact status
exports.updateContactStatus = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact message not found'
            });
        }

        res.json({
            success: true,
            message: 'Contact status updated',
            data: contact
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating contact',
            error: error.message
        });
    }
};