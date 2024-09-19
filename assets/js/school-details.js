// Fetch data for dashboard

const token = localStorage.getItem('token')

if (token == null && token == 'undefined') {
    window.location.href = 'login.html';
    document.getElementById('message').innerText = 'Token is invalid login again';
    errorAlert.classList.remove('d-none');
}

fetch('http://localhost:8000/admins/api/get/school/details/5/', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + token
    }
})
.then(response => {
    if (response.ok) {
        return response.json();
    } else if (response.status === 401) {
        // Token is expired or invalid
        handleTokenExpiry();
        throw new Error('Unauthorized: Token expired or invalid');
    }
    else {
        throw new Error('Failed to load dashboard data');
    }
}).then(data => {
    // populateSchools(data.results);
})
.catch(error => {
    console.error('Error:', error.message);
});

function handleTokenExpiry() {
    // Clear stored token and redirect to login
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    // Optionally show a message to the user
    window.location.href = 'login.html';
}