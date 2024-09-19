// Fetch data for dashboard

const token = localStorage.getItem('token')
const errorAlert = document.getElementById('error-alert');

if (token == null && token == 'undefined') {
    window.location.href = 'login.html';
    document.getElementById('message').innerText = 'Token is invalid login again';
    errorAlert.classList.remove('d-none');
}
// fetch('http://localhost:8000/admins/api/list/school/', {
fetch('https://lucky1999.pythonanywhere.com/admins/api/list/school/', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + token
    }
})
.then(response => {
    if (response.ok) {
        return response.json();
    }else if (response.status === 401) {
        // Token is expired or invalid
        handleTokenExpiry();
        throw new Error('Unauthorized: Token expired or invalid');
    }else if (!response.ok) {
        document.getElementById('message').innerText = 'Server is not responding';
        errorAlert.classList.remove('d-none');
    }
    else {
        throw new Error('Failed to load dashboard data');
    }
}).then(data => {
    populateSchools(data.results);
})
.catch(error => {
    document.getElementById('message').innerText = error;
    errorAlert.classList.remove('d-none');
});

function handleTokenExpiry() {
    // Clear stored token and redirect to login
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    // Optionally show a message to the user
    window.location.href = 'login.html';
}

function populateSchools(schools) {
    const schoolList = document.getElementById('school-list');
    schoolList.innerHTML = ''; // Clear the existing content

    schools.forEach(school => {
        const schoolHtml = `
          <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
            <img src="${school.image}" class="img-fluid" alt="${school.school_name}">
            <div class="portfolio-info">
              <h4>${school.school_name}</h4>
              <p>${school.address}</p>
              <a href="${school.image}" title="${school.school_name}" data-gallery="portfolio-gallery-app" class="glightbox preview-link">
                <i class="bi bi-zoom-in"></i>
              </a>
              <a href="school-upload-details.html?id=${school.id}" title="More Details" class="details-link">
                <i class="bi bi-link-45deg"></i>
              </a>
            </div>
          </div>
        `;
        schoolList.innerHTML += schoolHtml;
    });
}