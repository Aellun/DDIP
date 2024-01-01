const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3001;

// Temporary storage for messages
let messages = [];

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'empireinternet602@gmail.com', // Your email address
        pass: 'lzfaqnydgzjzrfst'   // Your email password
    }
});

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/submit-form', async (req, res) => {
    const { name, email, message } = req.body;

    // Store the form submission (you would replace this with database logic)
    messages.push({ name, email, message });

    // Send email
    const mailOptions = {
        from: 'empireinternet602@gmail.com',
        to: 'empireinternet602@gmail.com', // Admin email address
        subject: 'New Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }

    // Send a response back to the client
    res.json({ success: true, message: 'Form submitted successfully!' });
});

app.get('/messages', (req, res) => {
    // Provide an endpoint to retrieve stored messages
    res.json({ messages });
});

app.get('/', (req, res) => {
    res.send('Hello, this is the root route!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
