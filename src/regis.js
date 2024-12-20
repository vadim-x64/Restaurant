function generatePassword() {
    let passwordInput = document.getElementById('password');
    passwordInput.value = generateRandomPassword(15);
}
function generateRandomPassword(length) {
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
    let password = "";
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }
    return password;
}
function togglePasswordVisibility() {
    let passwordInput = document.getElementById('password');
    let toggleIcon = document.getElementById('togglePassword');
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.textContent = "🔓";
    } else {
        passwordInput.type = "password";
        toggleIcon.textContent = "🔒";
    }
}
function validateForm() {
    let nameInput = document.getElementById('name');
    let addressInput = document.getElementById('address');
    let phoneInput = document.getElementById('phone');
    let emailInput = document.getElementById('email');
    let usernameInput = document.getElementById('username');
    let passwordInput = document.getElementById('password');
    if (
        nameInput.value.length > 50 || addressInput.value.length > 50 || phoneInput.value.length > 50 ||
        emailInput.value.length > 50 || usernameInput.value.length > 50 || passwordInput.value.length > 50
    ) {
        alert('');
        return;
    }
    if (!nameInput.value || !addressInput.value || !phoneInput.value || !emailInput.value || !usernameInput.value || !passwordInput.value) {
        alert('Please fill all fields!');
        return;
    }
    if (!/^\d+$/.test(phoneInput.value)) {
        alert('Please enter only numbers in the phone field!');
        return;
    }
    if (!emailInput.value.includes('@')) {
        alert('Please enter a valid email with the @ symbol!');
        return;
    }
    if (passwordInput.value.length < 8) {
        alert('Password must contain at least 8 characters!');
        return;
    }
    alert('Registration is successful!');
    window.location.href = '../index.html';
}