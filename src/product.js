$(document).ready(function () {
    let clickCount = 0;
    let countdown = 1;
    $("#add-to-cart-button").on("click", function () {
        clickCount++;
        $(this).text("Added").css({ "background-color": "green", "color": "white" });
        let interval = setInterval(function () {
            countdown--;
            $("#add-to-cart-button").text("Added");
        }, 1000);
        setTimeout(function () {
            clearInterval(interval);
            countdown = 1;
            $("#add-to-cart-button").text("Buy item").css({ "background-color": "", "color": "" });
        }, 1000);
    });
});
function updatePrice() {
    const quantityInput = document.querySelector('.quantity-input');
    const addToCartButton = document.getElementById('add-to-cart-button');
    const quantity = parseInt(quantityInput.value);
    if (isNaN(quantity) || quantity <= 0) {
        animatePriceChange(0);
        addToCartButton.disabled = true;
    } else {
        const price = productDetails.price * quantity;
        animatePriceChange(price);
        addToCartButton.disabled = false;
    }
}
function animatePriceChange(newPrice) {
    const priceElement = document.getElementById('product-price');
    const currentPrice = parseFloat(priceElement.textContent.replace(' ₴', '')) || 0;
    const priceDifference = newPrice - currentPrice;
    let startTimestamp;
    const duration = 500;
    const finalProgress = 1;
    function step(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, finalProgress);
        const interpolatedPrice = currentPrice + priceDifference * progress;
        priceElement.textContent = `${interpolatedPrice.toFixed(0)} ₴`;
        if (progress < finalProgress) {
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
}
document.addEventListener("DOMContentLoaded", function () {
    const productDetails = JSON.parse(sessionStorage.getItem('productDetails'));
    if (productDetails) {
        const titleElement = document.querySelector('title');
        titleElement.textContent = productDetails.name;
        const productName = document.getElementById('product-name');
        const productImage = document.getElementById('product-image');
        const productDescription = document.getElementById('product-description');
        const productPrice = document.getElementById('product-price');
        const quantityInput = document.querySelector('.quantity-input');
        const addToCartButton = document.querySelector('.add-to-cart-button');
        productName.textContent = productDetails.name;
        productImage.src = productDetails.image;
        productDescription.textContent = productDetails.description;
        productPrice.textContent = `${productDetails.price} ₴`;
        function updatePrice() {
            const quantity = parseInt(quantityInput.value);
            if (!isNaN(quantity)) {
                const price = productDetails.price * quantity;
                animatePriceChange(price);
            }
        }
        document.querySelector('.quantity-input').addEventListener('input', () => {
            updatePrice();
        });
        document.querySelector('.quantity-button.decrease').addEventListener('click', () => {
            let quantity = parseInt(quantityInput.value);
            if (quantity > 1) {
                quantity--;
                quantityInput.value = quantity;
                updatePrice();
            }
        });
        document.querySelector('.quantity-button.increase').addEventListener('click', () => {
            let quantity = parseInt(quantityInput.value);
            quantity++;
            quantityInput.value = quantity;
            updatePrice();
        });
        quantityInput.addEventListener("input", function () {
            let inputValue = quantityInput.value;
            inputValue = inputValue.replace(/[^0-9]/g, "");
            inputValue = inputValue.replace(/^0+/, "1");
            inputValue = inputValue === "" || inputValue === "0" ? "1" : inputValue;
            quantityInput.value = inputValue;
            updatePrice();
        });
        addToCartButton.addEventListener('click', function () {
            const quantity = parseInt(quantityInput.value);
            if (quantity > 0) {
                const productToAdd = { ...productDetails, quantity };
                const cartItems = JSON.parse(sessionStorage.getItem('selectedProducts')) || [];
                cartItems.push(productToAdd);
                sessionStorage.setItem('selectedProducts', JSON.stringify(cartItems));
            }
        });
        updatePrice();
    }
});
const clock = document.getElementById('clock');
const clockSound = document.getElementById('clockSound');
clock.addEventListener('mouseenter', () => {
    if (clockSound.paused) {
        clockSound.play();
    }
});
clock.addEventListener('mouseleave', () => {
    if (!clockSound.paused) {
        clockSound.pause();
        clockSound.currentTime = 0;
    }
});
function displayTime() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(displayTime, 1000);
displayTime();
const lightbulbContainer = document.getElementById('lightbulb-container');
const lightbulb = document.getElementById('lightbulb');
const lightbulbImage = document.getElementById('lightbulb-image');
const toggleButton = document.querySelector('.hide-lightbulb-button');
const body = document.body;
function setInitialState() {
    const isLightOn = localStorage.getItem('isLightOn');
    if (isLightOn === 'true') {
        lightbulbImage.src = 'img/light-off.png';
        body.classList.add('dark-background');
    } else {
        lightbulbImage.src = 'img/light-on.png';
        body.classList.remove('dark-background');
    }
}
document.addEventListener('DOMContentLoaded', setInitialState);
const audioElement = document.getElementById('light-switch-sound');
function toggleLightbulb() {
    const isLightOn = body.classList.contains('dark-background');
    if (isLightOn) {
        lightbulbImage.src = 'img/light-on.png';
        body.classList.remove('dark-background');
        localStorage.setItem('isLightOn', 'false');
    } else {
        lightbulbImage.src = 'img/light-off.png';
        body.classList.add('dark-background');
        localStorage.setItem('isLightOn', 'true');
    }
    audioElement.currentTime = 0;
    audioElement.play();
}
document.addEventListener('DOMContentLoaded', setInitialState);
lightbulbContainer.addEventListener('mouseenter', () => {
    lightbulbContainer.classList.add('show-lightbulb');
});
lightbulbContainer.addEventListener('mouseleave', () => {
    lightbulbContainer.classList.remove('show-lightbulb');
});
lightbulb.addEventListener('click', toggleLightbulb);
toggleButton.addEventListener('click', () => {
    lightbulbContainer.classList.remove('show-lightbulb');
});
function openImageInNewTab(imageUrl) {
    window.open(imageUrl, '_blank');
}