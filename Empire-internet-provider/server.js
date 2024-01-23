console.log('Starting the server...');
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

// Temporary storage for messages
let messages = [];

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'empireinternet602@gmail.com', 
        pass: 'lzfaqnydgzjzrfst'
    }
});

app.use(bodyParser.json());
app.use(express.static('public'));


//defaut Endpoint
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/Index.html')
})

app.get('/payment', (req, res) => {
    res.sendFile(__dirname + '/public/payment.html')
})
// Endpoint for form submission (contact form)
app.post('/submit-contact-form', async (req, res) => {
    const { name, email, message } = req.body;

    // Store the form submission
    messages.push({ name, email, message });

    // Send email for contact form
    const contactMailOptions = {
        from: 'empireinternet602@gmail.com',
        to: 'empireinternet602@gmail.com', // Admin email address for contact form
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    try {
        await transporter.sendMail(contactMailOptions);
        console.log('Contact form email sent successfully');
    } catch (error) {
        console.error('Error sending contact form email:', error);
    }

    // Send a response back to the client
    res.json({ success: true, message: 'Contact form submitted successfully!' });
});

// Endpoint for form submission (payment form)
app.post('/submit-payment-form', async (req, res) => {
   const formData = req.body
    console.log('Form submitted:',formData);
    const { Name, Area_Location, Payment_category, Payment_option, payment, cardNumber, Mpesanumber, PaypalEmail } = req.body;

    // Store the form submission
    messages.push({ Name, Area_Location, Payment_category, Payment_option, payment, cardNumber, Mpesanumber, PaypalEmail });

    // Send email for payment form
    const paymentMailOptions = {
        from: 'empireinternet602@gmail.com',
        to: 'empireinternet602@gmail.com', // Admin email address for payment form
        subject: 'New Payment Form Submission',
        text: `Name: ${Name}\nArea Location: ${Area_Location}\nPayment Category: ${Payment_category}\nPayment Option: ${Payment_option}\nPayment: ${payment}\nCard Number: ${cardNumber}\nM-Pesa Number: ${Mpesanumber}\nPaypal Email: ${PaypalEmail}`
    };

    try {
        await transporter.sendMail(paymentMailOptions);
        console.log('Payment form email sent successfully');
        // Send a response back to the client
        // res.json({ success: true, message: 'Payment form submitted successfully!' });
       res.send('<h1>Payment form submitted successfully!!</h1>');
    } catch (error) {
        console.error('Error sending payment form email:', error);
    }

    
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
