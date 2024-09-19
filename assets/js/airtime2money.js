document.querySelector('.general-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const form = document.getElementById('airtime-money');
    const formData = new FormData(this);
    document.getElementById('spinner').classList.remove('d-none');
    document.getElementById('login-text').classList.add('d-none');
    const errorAlert = document.getElementById('error-alert');
    errorAlert.classList.add('d-none');
    const SuccessAlert = document.getElementById('success-alert');
    SuccessAlert.classList.add('d-none');
    document.getElementById('error-message').innerText = '';
    document.getElementById('success-message').innerText = '';

    fetch('http://localhost:8000/admins/api/create/airtime-money/', {
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
                document.getElementById('success-message').innerText = 'Sent for processing.';
                SuccessAlert.classList.remove('d-none');
                form.reset();
                document.getElementById('spinner').classList.add('d-none');
                document.getElementById('login-text').classList.remove('d-none');

            });
        }
        else if (response.status === 400) {
            return response.json()
            .then(data => {
                if (data.errors) {
                    document.getElementById('error-message').innerText = data.error;
                }
                else if (data.name) {
                    document.getElementById('error-message').innerText = data.name;
                } else if (data.email) {
                    document.getElementById('error-message').innerText = data.email;
                }else if (data.phone) {
                    document.getElementById('error-message').innerText = data.phone;
                }else if (data.amount_transfer) {
                    document.getElementById('error-message').innerText = data.amount_transfer;
                }else if (data.date_transfer) {
                    document.getElementById('error-message').innerText = data.date_transfer;
                }else if (data.account_number) {
                    document.getElementById('error-message').innerText = data.account_number;
                }else {
                    document.getElementById('error-message').innerText = 'An unexpected error occurred.';
                }
                errorAlert.classList.remove('d-none');
                document.getElementById('spinner').classList.add('d-none');
                document.getElementById('login-text').classList.remove('d-none');
            });
        }
        else{
            document.getElementById('error-message').innerText = data.screenshot;
            errorAlert.classList.remove('d-none');
            document.getElementById('spinner').classList.add('d-none');
            document.getElementById('login-text').classList.remove('d-none');
        }
    }).catch(error => {
        console.error('Error:', error);
        // Display a generic error message
        document.getElementById('error-message').innerText = 'An unexpected error occurred.';
        errorAlert.classList.remove('d-none');
        document.getElementById('spinner').classList.add('d-none');
        document.getElementById('login-text').classList.remove('d-none');
    });
});






const amountInput = document.getElementById('amount-transfer');
    const amountPay = document.getElementById('amount-pay');

    amountInput.addEventListener('input', function() {
        const amount = parseFloat(amountInput.value);
        if (!isNaN(amount)) {
            const fifteenPercent =amount - (amount * 0.15).toFixed(2);
            amountPay.textContent = ` ₦${fifteenPercent} will be pay into your account`;
        } else {
            amountPay.textContent = '';
        }
    });