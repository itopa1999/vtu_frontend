// Fetch data for dashboard

const token = localStorage.getItem('token')

if (!token){
    window.location.href = 'login.html';
    document.getElementById('message').innerText = 'Token is invalid login again';
    errorAlert.classList.remove('d-none');
}

fetch('http://127.0.0.1:8000/admins/api/list/school/application/', {
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
.then(data => {
    document.getElementById('applicant-data').innerText = data.total_applications;
    document.getElementById('upload-data').innerText = data.total_schools;

    const tableBody = document.querySelector('#applications-table tbody');
        tableBody.innerHTML = ''; // Clear existing rows

        // Check if data is an array and has items
        if (Array.isArray(data.applications) && data.applications.length) {
            data.applications.forEach((item, index) => {
                // Create a new row
                const row = document.createElement('tr');
                const formattedDate = item.apply_date ? new Date(item.apply_date).toLocaleDateString() : '';
                // Insert cells
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${item.first_name || ''}</td>
                    <td>${item.last_name || ''}</td>
                    <td>${item.email || ''}</td>
                    <td>${item.phone || ''}</td>
                    <td>${item.program_name || ''}</td>
                    <td>${formattedDate}</td>
                `;
                
                // Append the row to the table body
                tableBody.appendChild(row);
            });
        } else {
            // Handle case where no data is available
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="7">No applications found</td>';
            tableBody.appendChild(row);
        }
    console.log(data);
})
.catch(error => console.error('Error:', error));

populateTable();


function handleTokenExpiry() {
    // Clear stored token and redirect to login
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    // Optionally show a message to the user
    window.location.href = 'login.html';
}