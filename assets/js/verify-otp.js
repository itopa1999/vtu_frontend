document.querySelector('.general-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const UserEmail = localStorage.getItem('UserEmail')
    document.getElementById('Useremail').value = UserEmail;
    const formData = new FormData(this);  
    document.getElementById('spinner').classList.remove('d-none');
    document.getElementById('login-text').classList.add('d-none');
    const errorAlert = document.getElementById('error-alert');
    errorAlert.classList.add('d-none');
    document.getElementById('message').innerText = '';

    if (!UserEmail){
        document.getElementById('message').innerText = "An unexpected error occurred";
        errorAlert.classList.remove('d-none');
        window.location.href = 'create-agent.html';
    }
    
    fetch('https://lucky1999.pythonanywhere.com/admins/api/verify/user/', {
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
                alert(data.detail)
                document.getElementById('spinner').classList.add('d-none');
                document.getElementById('login-text').classList.remove('d-none');
                localStorage.removeItem('UserEmail');
                window.location.href = 'login.html';
            });
        } else if (response.status === 400) {
            return response.json()
            .then(data => {
                document.getElementById('message').innerText = data.detail;
                errorAlert.classList.remove('d-none');
                document.getElementById('spinner').classList.add('d-none');
                document.getElementById('login-text').classList.remove('d-none');
            });
    }
})
});
        
        