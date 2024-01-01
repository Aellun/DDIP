document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    fetch('/submit-form', {
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
