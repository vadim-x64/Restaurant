document.addEventListener("DOMContentLoaded", function () {
    const backToTopBtn = document.getElementById("backToTopBtn");
    backToTopBtn.addEventListener("click", scrollToTopWithEasing);
    function scrollToTopWithEasing() {
        const scrollDuration = 1000;
        const startTime = performance.now();
        const startScrollTop = document.documentElement.scrollTop;
        function scrollStep(timestamp) {
            const currentTime = timestamp - startTime;
            const scrollProgress = Math.min(currentTime / scrollDuration, 1);
            const easeInOutProgress = easeInOutQuad(scrollProgress);
            window.scrollTo(0, startScrollTop * (1 - easeInOutProgress));
            if (currentTime < scrollDuration) {
                requestAnimationFrame(scrollStep);
            }
        }
        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        }
        requestAnimationFrame(scrollStep);
    }
    window.addEventListener("scroll", function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const selectedCategory = sessionStorage.getItem("selectedCategory");
    const selectedProducts = JSON.parse(sessionStorage.getItem("selectedProducts")) || [];
    const categoryInfo = document.getElementById("categoryInfo");
    const productRow = document.getElementById("productRow");
    const emptyCategoryMessage = document.getElementById("emptyCategoryMessage");
    const categoryButtons = document.querySelectorAll(".category a");
    categoryButtons.forEach(function (button) {
        const category = button.getAttribute("data-category");
        if (category) {
            button.querySelector(".category-name").textContent = `${category}`;
        }
    });
    if (selectedCategory) {
        const categoryInfo = document.getElementById("categoryInfo");
        categoryInfo.textContent = selectedCategory;
    }
    const categories = {
        Burgers: [
            { name: "Big Tasty", description: "burger, 500ml cola, french fries, 2 sauces", price: 270, image: "../img/burger1.jpg" },
            { name: "Big Mac", description: "burger, 500ml cola, french fries, 1 sauce", price: 250, image: "../img/burger2.jpg" },
            { name: "Big Chicken", description: "burger, 300ml, french fries, 1 sauce", price: 180, image: "../img/burger3.jpg" },
            { name: "Cheeseburger", description: "burger, 300ml, french fries, 1 sauce", price: 150, image: "../img/burger4.jpg" },
            { name: "Royal Deluxe", description: "burger", price: 135, image: "../img/burger5.jpg" },
            { name: "Chickenburger", description: "burger, sticks", price: 120, image: "../img/burger6.jpg" },
            { name: "Chicken Mac", description: "burger", price: 100, image: "../img/burger7.jpg" },
            { name: "Royal", description: "burger", price: 100, image: "../img/burger8.jpg" },
            { name: "Chicken Bacon", description: "burger", price: 75, image: "../img/burger9.jpg" }
        ],
        Sushi: [
            { name: "Dragon", description: "salmon, avocado, nori, cucumber ~ (1kg)", price: 1000, image: "../img/sushi1.jpg" },
            { name: "Maki", description: "salmon, cucumber, sauce ~ (1kg)", price: 1200, image: "../img/sushi2.jpg" },
            { name: "Unagi", description: "rice, jasmine, nori ~ (1kg)", price: 1300, image: "../img/sushi3.jpg" },
            { name: "Maguro", description: "tuna, tataki, rice ~ (1kg)", price: 1200, image: "../img/sushi4.jpg" },
            { name: "Ebi", description: "shrimp, wasabi, soy sauce ~ (1kg)", price: 1300, image: "../img/sushi5.jpg" },
            { name: "California", description: "crab, avocado, cucumber, sesame ~ (1kg)", price: 1700, image: "../img/sushi6.jpg" },
            { name: "Sake", description: "salmon, rice, wasabi ~ (1kg)", price: 800, image: "../img/sushi7.jpg" },
            { name: "Toro", description: "tuna, toro, rice ~ (1kg)", price: 800, image: "../img/sushi8.jpg" },
            { name: "Gunkan", description: "salmon roe, nori, rice ~ (2kg)", price: 1000, image: "../img/sushi9.jpg" },
            { name: "Philadelphia", description: "salmon, cream cheese, avocado, sesame ~ (2kg)", price: 1800, image: "../img/sushi10.jpg" },
            { name: "Hamachi", description: "tuna, wasabi, soy sauce ~ (2kg)", price: 1800, image: "../img/sushi11.jpg" },
            { name: "Futomaki", description: "avocado, cucumber, pepper ~ (2kg)", price: 1500, image: "../img/sushi12.jpg" }
        ],
        Pizza: [
            { name: "Chicken", description: "chicken fillet, mushrooms, Mozzarella, Parmesan, spices, white sauce", price: 200, image: "../img/pizza14.jpg" },
            { name: "Calzone", description: "ham, Mozzarella, tomato, sauce", price: 120, image: "../img/pizza15.jpg" },
            { name: "Carbonara", description: "tomato sauce, cheese, bacon, egg, oregano", price: 200, image: "../img/pizza1.jpg" },
            { name: "Pepperoni", description: "tomato sauce, cheese, salami", price: 200, image: "../img/pizza2.jpg" },
            { name: "4 Cheese", description: "cream sauce, Cheddar, Mozzarella, Dor Blue, Gouda", price: 300, image: "../img/pizza3.jpg" },
            { name: "Prosciutto", description: "tomato sauce, ham, arugula, oregano", price: 400, image: "../img/pizza4.jpg" },
            { name: "Cheeseburger", description: "cheese sauce, olives, onion, bell pepper", price: 200, image: "../img/pizza5.jpg" },
            { name: "Bavarian", description: "tomato sauce, ham, sausages, tomato", price: 200, image: "../img/pizza6.jpg" },
            { name: "Hawaiian", description: "cream sauce, tomatoes, pineapple, chicken, oregano", price: 150, image: "../img/pizza7.jpg" },
            { id: 1, name: "Mushroom", description: "tomato sauce, ham, cheese, mushrooms, hot pepper", price: 150, image: "../img/pizza8.jpg" },
            { name: "Dor Blue", description: "cream sauce, pear, onion, Roquefort", price: 400, image: "../img/pizza9.jpg" },
            { name: "Pesto", description: "tomato sauce, olives, mushrooms, salami", price: 250, image: "../img/pizza10.jpg" },
            { name: "Pulled Pork", description: "cheese sauce, chili pepper, onion, beef", price: 100, image: "../img/pizza11.jpg" },
            { id: 2, name: "Margherita", description: "tomato sauce, tomatoes, cheese", price: 100, image: "../img/pizza12.jpg" },
            { name: "Calzone", description: "chicken fillet, Mozzarella, mushrooms, cream sauce", price: 120, image: "../img/pizza13.jpg" }
        ],
        Snacks: [
            { name: "Nuggets", description: "chicken (10 pcs.)", price: 50, image: "../img/snack1.jpg" },
            { name: "Cheese Sticks", description: "cheese (10 pcs.)", price: 50, image: "../img/snack2.jpg" },
            { name: "French Fries", description: "300g, 2 sauces", price: 50, image: "../img/snack3.jpg" },
            { name: "Dumplings", description: "beef (20 pcs.)", price: 70, image: "../img/snack4.jpg" },
            { name: "Cheese Platter", description: "Gouda, Cheddar, Brie (300g)", price: 120, image: "../img/snack5.jpg" },
            { name: "Grilled Sausages", description: "pork (5 pcs.)", price: 120, image: "../img/snack6.jpg" },
            { name: "Corn", description: "corn (1 pc.)", price: 50, image: "../img/snack7.jpg" },
            { name: "Chips", description: "with bacon (300g)", price: 120, image: "../img/snack8.jpg" },
            { name: "Bruschetta", description: "meat mix (10 pcs.)", price: 150, image: "../img/snack9.jpg" }
        ],
        Soups: [
            { name: "Goulash", description: "veal, onion, greens ~ (500ml)", price: 60, image: "../img/soup1.jpg" },
            { name: "Khajan-guk", description: "beef, udon, onion ~ (500ml)", price: 70, image: "../img/soup2.jpg" },
            { name: "Borscht", description: "pork, beets, pasta ~ (500ml)", price: 30, image: "../img/soup3.jpg" }
        ],
        Salads: [
            { name: "Caesar", description: "cherry tomatoes, poached egg, chicken, greens, Parmesan", price: 50, image: "../img/salad1.jpg" },
            { name: "Greek", description: "cucumbers, tomatoes, bell pepper, onion, olives, Feta", price: 50, image: "../img/salad2.jpg" },
            { name: "Fish", description: "salmon, iceberg, romaine, sauce, croutons, cherry tomatoes", price: 70, image: "../img/salad3.jpg" },
        ],
        Steaks: [
            { name: "Chateaubriand", description: "beef", price: 150, image: "../img/steak1.jpg" },
            { name: "Club Steak", description: "veal", price: 120, image: "../img/steak2.jpg" },
            { name: "Ribeye", description: "beef", price: 250, image: "../img/steak3.jpg" }
        ],
        Wine: [
            { name: "Sauvignon Blanc", description: "White wine. New Zealand. Made from Sauvignon Blanc grapes, known for its bright acidity and aromas of tropical fruits, especially ripe gooseberry and lime. It has a refreshing and fruity taste with a pleasant mineral undertone.", price: 550, image: "../img/wine1.jpg" },
            { name: "Chardonnay", description: "White wine. France. Renowned for its elegance and rich flavor. It features notes of yellow apples, pears, and walnut, as well as hints of vanilla and creamy caramel due to oak barrel aging.", price: 1200, image: "../img/wine2.jpg" },
            { name: "Merlot", description: "Red wine. USA. Produced in the Napa Valley region of California. It has a soft and rounded taste with pronounced notes of black cherry, chocolate, and wooden spices.", price: 900, image: "../img/wine3.jpg" },
            { name: "Cabernet", description: "Red wine. USA. Produced from Cabernet Sauvignon grapes, known for its structure and flavors of blackcurrant, blackberry, and vanilla. It has a long aftertaste and pairs excellently with red meat.", price: 1500, image: "../img/wine4.jpg" },
            { name: "Zinfandel", description: "Red wine. USA. It has a rich taste with notes of blackberries, plums, and black pepper. It boasts a deep red color and a pronounced aroma.", price: 700, image: "../img/wine5.jpg" },
            { name: "Malbec", description: "Red wine. Argentina. Made from Malbec grapes, it is characterized by a juicy taste with notes of plum, black cherry, and chocolate.", price: 600, image: "../img/wine6.jpg" },
            { name: "Shiraz", description: "Red wine. Australia. It has a rich and expressive taste with notes of blackberries, lavender, and pepper. It is characterized by a deep color and excellent structure.", price: 1000, image: "../img/wine7.jpg" },
            { name: "Pinot Blanc", description: "White wine. France. Made from Pinot Blanc grapes, it has a light and crisp taste with notes of cherry, strawberry, and subtle herbal nuances.", price: 700, image: "../img/wine8.jpg" },
            { name: "Tempranillo", description: "Red wine. Spain. Crafted from Tempranillo grapes, this Reserva boasts a deep and complex flavor profile. It features prominent notes of dark berries, leather, and tobacco, with a subtle hint of vanilla from oak barrel aging. Its well-balanced structure and velvety tannins make it an excellent choice for pairing with hearty dishes.", price: 2700, image: "../img/wine9.jpg" },
        ],
        Desserts: [
            { name: "Tiramisu", description: "Mascarpone, ladyfingers, cocoa, espresso (300g)", price: 70, image: "../img/dessert1.jpg" },
            { name: "Fraise", description: "muslin, syrup, strawberries, marzipan, vanilla (250g)", price: 80, image: "../img/dessert2.jpg" },
            { name: "Prague", description: "sponge cake, cocoa, cream, sour cream, chocolate (200g)", price: 100, image: "../img/dessert3.jpg" }
        ],
        Ice: [
            { name: "Chocolate", description: "cocoa, cinnamon (250g)", price: 120, image: "../img/ice1.jpg" },
            { name: "Vanilla", description: "vanilla, syrup (200g)", price: 150, image: "../img/ice2.jpg" },
            { name: "Caramel", description: "caramel (200g)", price: 100, image: "../img/ice3.jpg" }
        ],
        Drinks: [
            { name: "Latte", description: "300ml", price: 50, image: "../img/drink1.jpg" },
            { name: "Cappuccino", description: "300ml", price: 30, image: "../img/drink2.jpg" },
            { name: "Americano", description: "with milk, 180ml", price: 30, image: "../img/drink3.jpg" },
            { name: "Espresso", description: "50ml", price: 30, image: "../img/drink4.jpg" },
            { name: "Beer", description: "500ml", price: 70, image: "../img/drink5.jpg" },
            { name: "Sunset Bliss", description: "350ml", price: 120, image: "../img/drink6.jpg" },
            { name: "Mojito", description: "350ml", price: 150, image: "../img/drink7.jpg" },
            { name: "Whiskey", description: "100ml", price: 50, image: "../img/drink8.jpg" },
            { name: "Juice", description: "orange, 1L", price: 50, image: "../img/drink9.jpg" },
            { name: "Water", description: "1L", price: 30, image: "../img/drink10.jpg" },
            { name: "Cola", description: "300ml", price: 20, image: "../img/drink11.jpg" },
            { name: "Tea", description: "250ml", price: 30, image: "../img/drink12.jpg" }
        ],
        Milkshakes: [
            { name: "Chocolate", description: "chocolate (300ml)", price: 80, image: "../img/milkshake1.jpg" },
            { name: "Vanilla", description: "vanilla (300ml)", price: 70, image: "../img/milkshake2.jpg" },
            { name: "Banana", description: "banana (300ml)", price: 60, image: "../img/milkshake3.jpg" }
        ],
    };
    if (selectedCategory && categories[selectedCategory]) {
        categoryInfo.textContent = selectedCategory;
        function openProductPage(product) {
            const productDetailsUrl = 'product.html';
            const productDetails = {
                name: product.name,
                image: product.image,
                description: product.description,
                price: product.price,
            };
            sessionStorage.setItem('productDetails', JSON.stringify(productDetails));
            window.location.href = productDetailsUrl;
        }
        categories[selectedCategory].forEach((product) => {
            const productCard = document.createElement("div");
            productCard.classList.add("col-md-4");
            productCard.innerHTML = `
            ${product.id === 1 ? '<span class="pepper" title="Spicy"><img src="https://cdn-icons-png.flaticon.com/128/3813/3813064.png?uid=R77081381&ga=GA1.1.1848467976.1701626084&semt=ais" alt=""></span>' : ''}
            ${product.id === 2 ? '<span class="vegan" title="Vegan"><img src="https://cdn-icons-png.flaticon.com/128/258/258566.png?uid=R77081381&ga=GA1.1.1848467976.1701626084&semt=ais" alt=""></span>' : ''}
                <div class="product-card col-md-12">
                    <img src="${product.image}" alt="${product.name}" class="product-image img-fluid">
                    <h3>${product.name}</h3>
                    <hr class="product-line">
                    <p><span class="product-price">${product.price} ₴</span></p>
                    <div class="quantity-control">
                        <button class="quantity-button decrease">-</button>
                        <input type="num" inputmode="numeric" value="1" class="quantity-input">
                        <button class="quantity-button increase">+</button>
                    </div>
                    <br>
                    <button class="btn btn-warning add-to-cart-button">Buy item</button>
                </div>`;
            const productImage = productCard.querySelector(".product-image");
            productImage.addEventListener("click", () => {
                openProductPage(product);
            });
            const quantityInput = productCard.querySelector(".quantity-input");
            const priceElement = productCard.querySelector(".product-price");
            quantityInput.addEventListener("input", function () {
                let inputValue = quantityInput.value;
                inputValue = inputValue.replace(/[^0-9]/g, "");
                inputValue = inputValue.replace(/^0+/, "1");
                inputValue = inputValue === "" || inputValue === "0" ? "1" : inputValue;
                quantityInput.value = inputValue;
                updatePrice();
            });
            productCard.querySelector(".decrease").addEventListener("click", () => {
                if (quantityInput.value > 1) {
                    quantityInput.value--;
                    updatePrice();
                }
            });
            productCard.querySelector(".increase").addEventListener("click", () => {
                quantityInput.value++;
                updatePrice();
            });
            quantityInput.addEventListener("input", updatePrice);
            productCard.querySelector(".add-to-cart-button").addEventListener("click", () => {
                const quantity = parseInt(quantityInput.value);
                const cartItem = {
                    name: product.name,
                    price: product.price,
                    quantity: quantity
                };
                selectedProducts.push(cartItem);
                sessionStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));

                if (selectedProducts.length === 1) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }

                updateCartItemCount();
            });
            function updatePrice() {
                const quantity = parseFloat(quantityInput.value);
                if (isNaN(quantity) || quantity <= 0) {
                    animatePriceChange(0);
                } else {
                    const productPrice = parseFloat(product.price);
                    if (!isNaN(productPrice)) {
                        const price = productPrice * quantity;
                        animatePriceChange(price);
                    }
                }
            }
            function animatePriceChange(newPrice) {
                const currentPrice = parseFloat(priceElement.textContent.replace(' ₴', ''));
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
            productRow.appendChild(productCard);
        });
    } else {
        categoryInfo.textContent = "";
        emptyCategoryMessage.textContent = "This category is empty!";
        emptyCategoryMessage.style.fontSize = "24px";
        emptyCategoryMessage.style.color = "darkblue";
        emptyCategoryMessage.style.textAlign = "center";
        emptyCategoryMessage.style.marginTop = "200px";
    }
    function updateCartItemCount() {
        const cartItemCount = selectedProducts.reduce((total, item) => total + item.quantity, 0);
        const cartIcon = document.getElementById("cart-icon");
        const cartItemCountSpan = document.getElementById("cart-item-count");
        if (cartItemCount > 0) {
            cartIcon.style.display = "block";
            cartItemCountSpan.textContent = cartItemCount;
        } else {
            cartIcon.style.display = "none";
        }
        updateCartContent();
    }
    updateCartItemCount();
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
document.addEventListener("DOMContentLoaded", function () {
    const pizzaLogo = document.getElementById("pizza-logo");
    const drinksLogo = document.getElementById("drinks-logo");
    const snacksLogo = document.getElementById("snacks-logo");
    const soupsLogo = document.getElementById("soups-logo");
    const saladsLogo = document.getElementById("salads-logo");
    const dessertsLogo = document.getElementById("desserts-logo");
    const milkshakesLogo = document.getElementById("milkshakes-logo");
    const iceLogo = document.getElementById("ice-logo");
    const wineLogo = document.getElementById("wine-logo");
    const burgersLogo = document.getElementById("burgers-logo");
    const sushiLogo = document.getElementById("sushi-logo");
    const steaksLogo = document.getElementById("steaks-logo");
    const selectedCategory = sessionStorage.getItem("selectedCategory");
    if (selectedCategory === "Pizza") pizzaLogo.style.display = "block";
    else pizzaLogo.style.display = "none";
    if (selectedCategory === "Drinks") drinksLogo.style.display = "block";
    else drinksLogo.style.display = "none";
    if (selectedCategory === "Snacks") snacksLogo.style.display = "block";
    else snacksLogo.style.display = "none";
    if (selectedCategory === "Soups") soupsLogo.style.display = "block";
    else soupsLogo.style.display = "none";
    if (selectedCategory === "Salads") saladsLogo.style.display = "block";
    else saladsLogo.style.display = "none";
    if (selectedCategory === "Desserts") dessertsLogo.style.display = "block";
    else dessertsLogo.style.display = "none";
    if (selectedCategory === "Milkshakes") milkshakesLogo.style.display = "block";
    else milkshakesLogo.style.display = "none";
    if (selectedCategory === "Ice") iceLogo.style.display = "block";
    else iceLogo.style.display = "none";
    if (selectedCategory === "Wine") wineLogo.style.display = "block";
    else wineLogo.style.display = "none";
    if (selectedCategory === "Burgers") burgersLogo.style.display = "block";
    else burgersLogo.style.display = "none";
    if (selectedCategory === "Sushi") sushiLogo.style.display = "block";
    else sushiLogo.style.display = "none";
    if (selectedCategory === "Steaks") steaksLogo.style.display = "block";
    else steaksLogo.style.display = "none";
    const allLogos = [
        pizzaLogo, drinksLogo, snacksLogo,
        soupsLogo, saladsLogo, dessertsLogo,
        milkshakesLogo, iceLogo, wineLogo,
        burgersLogo, sushiLogo, steaksLogo
    ];
    allLogos.forEach((logo) => {
        if (logo.style.display === "none") {
            logo.style.display = "none";
        }
    });
});
const lightbulbContainer = document.getElementById('lightbulb-container');
const lightbulb = document.getElementById('lightbulb');
const lightbulbImage = document.getElementById('lightbulb-image');
const toggleButton = document.querySelector('.hide-lightbulb-button');
const body = document.body;
const audioElement = document.getElementById('light-switch-sound');
function setInitialState() {
    const isLightOn = localStorage.getItem('isLightOn');
    if (isLightOn === 'true') {
        lightbulbImage.src = '../img/light-off.png';
        body.classList.add('dark-background');
    } else {
        lightbulbImage.src = '../img/light-on.png';
        body.classList.remove('dark-background');
    }
}
document.addEventListener('DOMContentLoaded', setInitialState);
function toggleLightbulb() {
    const isLightOn = body.classList.contains('dark-background');
    audioElement.currentTime = 0;
    if (isLightOn) {
        lightbulbImage.src = '../img/light-on.png';
        body.classList.remove('dark-background');
        localStorage.setItem('isLightOn', 'false');
    } else {
        lightbulbImage.src = '../img/light-off.png';
        body.classList.add('dark-background');
        localStorage.setItem('isLightOn', 'true');
    }
    setTimeout(() => {
        audioElement.play();
    }, 0);
}
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