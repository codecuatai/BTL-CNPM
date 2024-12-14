// Password visibility toggle
document.querySelector('.toggle-password').addEventListener('click', function() {
    const passwordField = document.getElementById('userPassword');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';  // Show password
    } else {
        passwordField.type = 'password';  // Hide password
    }
});
