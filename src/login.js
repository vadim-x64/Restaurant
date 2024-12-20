function togglePassword() {
  let passwordField = document.getElementById('password');
  if (passwordField.type === 'password') {
    passwordField.type = 'text';
  } else {
    passwordField.type = 'password';
  }
}
function validateLogin() {
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  if (username.trim() === '' || password.trim() === '') {
    alert('Please fill in all fields!');
  } else {
    alert('Successful!');
    setTimeout(function () {
      window.location.href = '../index.html';
    }, 1000);
  }
}
const passwordInput = document.getElementById('password');
const togglePasswordButton = document.getElementById('togglePassword');
const lockIcon = 'https://cdn-icons-png.flaticon.com/128/25/25239.png';
const unlockIcon = 'https://cdn-icons-png.flaticon.com/128/25/25215.png';
let isPasswordVisible = false;
togglePasswordButton.addEventListener('click', function () {
  isPasswordVisible = !isPasswordVisible;
  const type = isPasswordVisible ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  const iconSrc = isPasswordVisible ? unlockIcon : lockIcon;
  togglePasswordButton.innerHTML = `<img src="${iconSrc}" alt="Toggle Password">`;
});