require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('Testing with password: aggdedsxynqjutsp');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

transporter.verify(function(error, success) {
    if (error) {
        console.log('❌ Failed:', error.message);
        console.log('Password used:', process.env.EMAIL_PASS);
        console.log('Password length:', process.env.EMAIL_PASS?.length);
    } else {
        console.log('✅ SUCCESS! Gmail authentication working!');
        
        // Send test email
        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: '🎉 Portfolio Email Test SUCCESS!',
            text: 'Your portfolio contact form is now working! You will receive this when visitors contact you.',
            html: '<h2>🎉 Portfolio Email Test SUCCESS!</h2><p>Your portfolio contact form is now working perfectly!</p>'
        })
        .then(() => console.log('✅ Test email sent! Check your Gmail inbox.'))
        .catch(err => console.log('Email send error:', err));
    }
});
