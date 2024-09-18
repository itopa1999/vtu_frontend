// Fetch data for dashboard

const token = localStorage.getItem('token')

if (token == null && token == 'undefined') {
    window.location.href = 'login.html';
    document.getElementById('message').innerText = 'Token is invalid login again';
    errorAlert.classList.remove('d-none');
}

fetch('https://lucky1999.pythonanywhere.com/admins/api/list/school/application/', {
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
})