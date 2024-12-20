document.addEventListener("DOMContentLoaded", function () {
  const selectedProductsList = document.getElementById("selected-products-list");
  const cartBadge = document.querySelector(".badge");
  const totalCostElement = document.getElementById("total-cost");
  const deliveryCostElement = document.getElementById("delivery-cost");
  const totalCostWithDeliveryElement = document.getElementById("total-cost-with-delivery");
  const selfPickupCheckbox = document.getElementById("selfPickup");
  const deliveryCost = 55;
  const animationDuration = 500;
  function updateSelectedProducts() {
    const selectedProducts = JSON.parse(sessionStorage.getItem("selectedProducts")) || [];
    selectedProductsList.innerHTML = "";
    const cartItemMap = new Map();
    let totalQuantity = 0;
    let totalCost = 0;
    selectedProducts.forEach((item) => {
      if (cartItemMap.has(item.name)) {
        cartItemMap.get(item.name).quantity += item.quantity;
      } else {
        cartItemMap.set(item.name, { ...item });
      }
    });
    cartItemMap.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "lh-sm");
      listItem.innerHTML = `
              <div>
                  <h6 class="my-0">${item.name}</h6>
                  <p class="row-p">${item.quantity} x ${item.price} ₴</p>
              </div>
              <span class="text-body-secondary">${item.price * item.quantity} ₴</span>`;
      totalQuantity += item.quantity;
      totalCost += item.price * item.quantity;
      selectedProductsList.appendChild(listItem);
    });
    const totalCostWithDelivery = selfPickupCheckbox.checked ? totalCost : totalCost + deliveryCost;
    animatePriceChange(deliveryCostElement, parseFloat(deliveryCostElement.textContent) || 0, selfPickupCheckbox.checked ? 0 : deliveryCost);
    animatePriceChange(totalCostWithDeliveryElement, parseFloat(totalCostWithDeliveryElement.textContent) || 0, totalCostWithDelivery);
    cartBadge.textContent = totalQuantity;
    totalCostElement.textContent = totalCost.toFixed(0);
    deliveryCostElement.textContent = selfPickupCheckbox.checked ? 0 : deliveryCost;
    totalCostWithDeliveryElement.textContent = totalCostWithDelivery.toFixed(0);
    return totalQuantity;
  }
  function animatePriceChange(element, currentPrice, newPrice) {
    const priceDifference = newPrice - currentPrice;
    let startTimestamp;
    const finalProgress = 1;
    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / animationDuration, finalProgress);
      const interpolatedPrice = currentPrice + priceDifference * progress;
      element.textContent = `${interpolatedPrice.toFixed(0)}`;
      if (progress < finalProgress) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }
  selfPickupCheckbox.addEventListener("change", updateSelectedProducts);
  let totalQuantity = updateSelectedProducts();
  function updateBadge() {
    const newTotalQuantity = updateSelectedProducts();
    if (newTotalQuantity !== totalQuantity) {
      totalQuantity = newTotalQuantity;
    }
  }
  document.addEventListener("cartUpdated", updateBadge);
});
document.addEventListener("DOMContentLoaded", function () {
  let cashRadio = document.getElementById("cash");
  let creditRadio = document.getElementById("credit");
  let cardFields = document.querySelector(".row.gy-3");
  function toggleCardFields() {
    if (creditRadio.checked) {
      cardFields.style.display = "flex";
    } else {
      cardFields.style.display = "none";
    }
  }
  cashRadio.addEventListener("change", toggleCardFields);
  creditRadio.addEventListener("change", toggleCardFields);
  toggleCardFields();
});
document.getElementById('phone').addEventListener('input', function (e) {
  let inputValue = e.target.value.replace(/\D/g, '');
  if (inputValue.length > 0 && inputValue.charAt(0) !== '0') {
    inputValue = '0' + inputValue.slice(0, 9);
  }
  if (inputValue.length > 10) {
    inputValue = inputValue.slice(0, 10);
  }
  e.target.value = inputValue.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1-$2-$3-$4');
});
$(document).ready(function () {
  $('#cc-number').on('input', function (event) {
    if (event.originalEvent.inputType === 'deleteContentBackward') {
      return;
    }
    let cardNumber = $(this).val().replace(/\D/g, '');
    cardNumber = cardNumber.replace(/(\d{4})/g, '$1 ');
    if (cardNumber.length > 19) {
      $(this).val(cardNumber.substring(0, 19));
    } else {
      $(this).val(cardNumber);
    }
  });
});
document.getElementById('cc-expiration').addEventListener('input', function (e) {
  if (e.inputType === 'deleteContentBackward') {
    return;
  }
  let input = e.target.value.replace(/[^\d/]/g, '');
  let parts = input.split('/');
  if (parts[0] && parts[0].length > 1 && parts[0][0] === '0' && parseInt(parts[0]) > 9) {
    parts[0] = parts[0][1];
  }
  if (parts[0] === '00') {
    parts[0] = '01';
  }
  if (parts[0] && parseInt(parts[0]) > 12) {
    parts[0] = '12';
  }
  if (parts[1]) {
    parts[1] = parts[1].slice(0, 2);
  } else {
    parts[1] = '';
  }
  input = parts[0] + (parts[1] ? '/' + parts[1] : '');
  if (parts[0] && parts[0].length >= 2 && !input.includes('/')) {
    input = parts[0].slice(0, 2) + '/' + parts[1];
  }
  e.target.value = input;
});
document.getElementById('cc-cvv').addEventListener('input', function (event) {
  let inputValue = event.target.value.replace(/\D/g, '');
  inputValue = inputValue.slice(0, 3);
  event.target.value = inputValue;
});
let paymentMade = false;
function validateForm() {
  document.querySelectorAll('.is-invalid, .is-valid').forEach(element => {
    element.classList.remove('is-invalid', 'is-valid');
  });
  let selfPickupCheckbox = document.getElementById('selfPickup');
  let firstName = document.getElementById('firstName');
  let phone = document.getElementById('phone');
  let address = document.getElementById('address');
  let email = document.getElementById('email');
  let paymentMethodCash = document.getElementById('cash');
  let paymentMethodCredit = document.getElementById('credit');
  let ccNumber = document.getElementById('cc-number');
  let ccExpiration = document.getElementById('cc-expiration');
  let ccCvv = document.getElementById('cc-cvv');
  let isValid = true;
  if (!firstName.value.trim()) {
    isValid = false;
    firstName.classList.add('is-invalid');
  } else {
    firstName.classList.add('is-valid');
  }
  if (!phone.value.trim()) {
    isValid = false;
    phone.classList.add('is-invalid');
  } else {
    phone.classList.add('is-valid');
  }
  if (!email.value.trim()) {
    isValid = false;
    email.classList.add('is-invalid');
  } else {
    email.classList.add('is-valid');
  }
  if (!address.value.trim()) {
    isValid = false;
    address.classList.add('is-invalid');
  } else {
    address.classList.add('is-valid');
  }
  let isValidCreditCard = true;
  if (!selfPickupCheckbox.checked) {
    if (!paymentMethodCash.checked && !paymentMethodCredit.checked) {
      isValid = false;
      paymentMethodCash.classList.add('is-invalid');
      paymentMethodCredit.classList.add('is-invalid');
    } else {
      paymentMethodCash.classList.add('is-valid');
      paymentMethodCredit.classList.add('is-valid');
      if (paymentMethodCredit.checked) {
        isValidCreditCard = validateCreditCard();
      }
    }
  }
  if (isValid && isValidCreditCard && !paymentMade) {
    if (paymentMethodCash.checked || selfPickupCheckbox.checked) {
      alert('Order processed successfully!');
      window.location.href = '../index.html';
    } else if (paymentMethodCredit.checked) {
      ccNumber.disabled = true;
      ccExpiration.disabled = true;
      ccCvv.disabled = true;
      selfPickupCheckbox.disabled = true;
      paymentMethodCash.disabled = true;
      paymentMethodCredit.disabled = true;
      let continueBtn = document.getElementById('continueBtn');
      continueBtn.disabled = true;
      let mainContainer = document.getElementById('main-container');
      mainContainer.style.display = 'flex';
      let loader = document.getElementById('loader');
      loader.style.display = 'flex';
      let successIcon = document.getElementById('successIcon');
      successIcon.style.display = 'none';
      displaySuccessMessage();
      paymentMade = true;
    }
  }
}
function displaySuccessMessage() {
  setTimeout(function () {
    loader.style.display = 'none';
    successIcon.style.display = 'flex';
    let payP = document.querySelector('.pay-p');
    payP.style.display = 'flex';
    let okButton = document.getElementById('okButton');
    okButton.style.display = 'block';
    okButton.addEventListener('click', function () {
      window.location.href = '../index.html';
    });
    let continueBtn = document.getElementById('continueBtn');
    continueBtn.disabled = true;
    paymentMade = true;
  }, 5000);
}
function validateCreditCard() {
  document.getElementById('cc-number-error').style.display = 'none';
  document.getElementById('cc-expiration-error').style.display = 'none';
  document.getElementById('cc-cvv-error').style.display = 'none';
  document.getElementById('cc-number-success').style.display = 'none';
  document.getElementById('cc-expiration-success').style.display = 'none';
  document.getElementById('cc-cvv-success').style.display = 'none';
  let ccNumber = document.getElementById('cc-number').value.replace(/\s/g, '');
  let ccExpiration = document.getElementById('cc-expiration').value;
  let ccCvv = document.getElementById('cc-cvv').value;
  if (!/^\d{16}$/.test(ccNumber)) {
    document.getElementById('cc-number-error').style.display = 'block';
    document.getElementById('cc-number').classList.add('is-invalid');
    return false;
  } else {
    document.getElementById('cc-number').classList.remove('is-invalid');
    document.getElementById('cc-number-success').style.display = 'block';
  }
  if (!/^\d{2}\/\d{2}$/.test(ccExpiration)) {
    document.getElementById('cc-expiration-error').style.display = 'block';
    document.getElementById('cc-expiration').classList.add('is-invalid');
    return false;
  } else {
    document.getElementById('cc-expiration').classList.remove('is-invalid');
    document.getElementById('cc-expiration-success').style.display = 'block';
  }
  if (!/^\d{3}$/.test(ccCvv)) {
    document.getElementById('cc-cvv-error').style.display = 'block';
    document.getElementById('cc-cvv').classList.add('is-invalid');
    return false;
  } else {
    document.getElementById('cc-cvv').classList.remove('is-invalid');
    document.getElementById('cc-cvv-success').style.display = 'block';
  }
  return true;
}
let firstName = document.getElementById('firstName');
firstName.addEventListener('input', function () {
  firstName.classList.remove('is-invalid', 'is-valid');
  if (!firstName.value.trim()) {
    firstName.classList.add('is-invalid');
  } else {
    firstName.classList.add('is-valid');
  }
});
let phone = document.getElementById('phone');
phone.addEventListener('input', function () {
  phone.classList.remove('is-invalid', 'is-valid');
  if (!phone.value.trim()) {
    phone.classList.add('is-invalid');
  } else {
    phone.classList.add('is-valid');
  }
});
let email = document.getElementById('email');
email.addEventListener('input', function () {
  email.classList.remove('is-invalid', 'is-valid');
  if (!email.value.trim()) {
    email.classList.add('is-invalid');
  } else {
    email.classList.add('is-valid');
  }
});
let address = document.getElementById('address');
address.addEventListener('input', function () {
  address.classList.remove('is-invalid', 'is-valid');
  if (!address.value.trim()) {
    address.classList.add('is-invalid');
  } else {
    address.classList.add('is-valid');
  }
});
function updateDeliveryCost() {
  let selfPickupCheckbox = document.getElementById('selfPickup');
  let paymentMethodRadios = document.getElementsByName('paymentMethod');
  let notificationContainer = document.getElementById('notificationContainer');
  if (selfPickupCheckbox.checked) {
    for (let i = 0; i < paymentMethodRadios.length; i++) {
      paymentMethodRadios[i].disabled = true;
    }
    notificationContainer.innerHTML = `
      <div class="alert alert-info" role="alert">
        If you chose this item, you can ignore the payment method, since self-delivery
        is carried out from our restaurant and there you can already pay in any convenient way for you!
      </div>`;
  } else {
    for (let i = 0; i < paymentMethodRadios.length; i++) {
      paymentMethodRadios[i].disabled = false;
    }
    notificationContainer.innerHTML = '';
  }
}
document.addEventListener("DOMContentLoaded", function () {
  let cashRadio = document.getElementById("cash");
  let creditRadio = document.getElementById("credit");
  let selfPickupCheckbox = document.getElementById("selfPickup");
  let creditCardContent = document.querySelector(".content");
  function updateSelfPickupState() {
    selfPickupCheckbox.disabled = cashRadio.checked || creditRadio.checked;
  }
  function toggleCreditCardContent() {
    creditCardContent.style.display = creditRadio.checked ? "block" : "none";
  }
  [cashRadio, creditRadio].forEach(function (radio) {
    radio.addEventListener("change", function () {
      updateSelfPickupState();
      toggleCreditCardContent();
    });
  });
  window.toggleRadio = function (button) {
    if (button === lastChecked) {
      button.checked = false;
      lastChecked = null;
    } else {
      lastChecked = button;
    }
    updateSelfPickupState();
    toggleCreditCardContent();
  }
  updateSelfPickupState();
  toggleCreditCardContent();
});
function togglePaymentOptionsVisibility() {
  let selfPickupCheckbox = document.getElementById('selfPickup');
  let paymentMethodCash = document.getElementById('cash');
  let paymentMethodCredit = document.getElementById('credit');
  let firstName = document.getElementById('firstName');
  let phone = document.getElementById('phone');
  let address = document.getElementById('address');
  let email = document.getElementById('email');
  let pay = document.getElementById('pay');
  let hr = document.getElementById('hr');
  let isUserDetailsEntered = firstName.value.trim() !== '' &&
    phone.value.trim() !== '' &&
    address.value.trim() !== '' &&
    email.value.trim() !== '';
  if (isUserDetailsEntered) {
    paymentMethodCash.parentElement.style.display = 'block';
    paymentMethodCredit.parentElement.style.display = 'block';
    selfPickupCheckbox.parentElement.style.display = 'block';
    pay.style.display = 'block';
    hr.style.display = 'block';
  } else {
    paymentMethodCash.parentElement.style.display = 'none';
    paymentMethodCredit.parentElement.style.display = 'none';
    selfPickupCheckbox.parentElement.style.display = 'none';
    pay.style.display = 'none';
    hr.style.display = 'none';
  }
}
let inputFields = document.querySelectorAll('#firstName, #phone, #address, #email');
inputFields.forEach(function (inputField) {
  inputField.addEventListener('input', togglePaymentOptionsVisibility);
});
togglePaymentOptionsVisibility();
document.getElementById('toggle-cvv').addEventListener('click', function () {
  let cvvInput = document.getElementById('cc-cvv');
  let cvvIcon = document.getElementById('cvv-icon');
  if (cvvInput.type === 'password') {
    cvvInput.type = 'text';
    cvvIcon.textContent = '👀';
  } else {
    cvvInput.type = 'password';
    cvvIcon.textContent = '👁️';
  }
});
let lastChecked;
function toggleRadio(button) {
  if (button === lastChecked) {
    button.checked = false;
    lastChecked = null;
  } else {
    lastChecked = button;
  }
}
document.addEventListener("DOMContentLoaded", function () {
  if (isCartEmpty()) {
    hideElements();
    displayFormUnavailableMessage();
  }
});
function isCartEmpty() {
  return document.getElementById('selected-products-list').children.length === 0;
}
function hideElements() {
  document.getElementById('selected-products-list').style.display = 'none';
  document.querySelector('.header-container').style.display = 'none';
  document.getElementById('orderForm').style.display = 'none';
}
function displayFormUnavailableMessage() {
  let formUnavailableMessage = document.createElement('div');
  formUnavailableMessage.id = 'formUnavailableMessage';
  formUnavailableMessage.innerHTML = '<p style="height: 100vh; display: flex; justify-content: center; align-items: center; margin: auto; text-align: center; font-size: 24px;">THE FORM IS INVALID NOW</p>';
  document.body.appendChild(formUnavailableMessage);
}