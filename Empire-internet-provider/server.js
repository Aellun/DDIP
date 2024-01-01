const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/submit-form', (req, res) => {
    // Process the form data (e.g., send email, store in a database)
    res.json({ success: true, message: 'Form submitted successfully!' });
});

app.get('/', (req, res) => {
    res.send('Hello, this is the root route!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
