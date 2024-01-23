document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    fetch('/submit-contact-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Form submitted successfully!');
                document.getElementById('contactForm').reset();
            } else {
                alert('Failed to submit message. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
});

document.getElementById('payment Form').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        Area_Location: document.getElementById('Area_Location"').value,
        Payment_category: document.getElementById('Payment_category').value,
        Payment_option: document.getElementById('Payment_option"').value,
        payment: document.getElementById('payment').value
    };

    fetch('/submit-payment-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Form submitted successfully!');
                document.getElementById('payment Form').reset();
            } else {
                alert('Failed to submit message. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
});
