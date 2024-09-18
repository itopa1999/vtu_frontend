document.querySelector('.general-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    document.getElementById('spinner').classList.remove('d-none');
    document.getElementById('login-text').classList.add('d-none');
    const errorAlert = document.getElementById('error-alert');
    errorAlert.classList.add('d-none');
    document.getElementById('message').innerText = '';

    fetch('http://127.0.0.1:8000/admins/api/create/user/', {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': '{{ csrf_token }}' // For Django CSRF protection
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json()
            .then(data => {
            localStorage.setItem('UserEmail', data.detail.email);
            window.location.href = 'verify-otp.html';

            });
        }
        else if (response.status === 400) {
            return response.json()
            .then(data => {
                if (data.errors) {
                    document.getElementById('message').innerText = data.error;
                }
                else if (data.username) {
                    document.getElementById('message').innerText = data.username;
                } else if (data.password) {
                    document.getElementById('message').innerText = data.password;
                    } 
                    else {
                        document.getElementById('message').innerText = 'An unexpected error occurred.';
                    }
                errorAlert.classList.remove('d-none');
                document.getElementById('spinner').classList.add('d-none');
                document.getElementById('login-text').classList.remove('d-none');
            });
        }
        else{
            document.getElementById('message').innerText = data.detail;
            errorAlert.classList.remove('d-none');
            document.getElementById('spinner').classList.add('d-none');
            document.getElementById('login-text').classList.remove('d-none');
        }
    }).catch(error => {
        console.error('Error:', error);
        // Display a generic error message
        document.getElementById('message').innerText = 'An unexpected error occurred.';
        errorAlert.classList.remove('d-none');
        document.getElementById('spinner').classList.add('d-none');
        document.getElementById('login-text').classList.remove('d-none');
    });
});