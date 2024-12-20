document.addEventListener("DOMContentLoaded", function () {
    const clearCartButton = document.getElementById("clear-cart-button");
    let deletedProduct = null;
    function updateCartContent() {
        const selectedProducts = JSON.parse(sessionStorage.getItem("selectedProducts")) || [];
        const cartItemsDiv = document.getElementById("cart-items");
        const cartTotalDiv = document.getElementById("cart-total");
        const checkoutButton = document.getElementById("checkout-button");
        cartItemsDiv.innerHTML = "";
        let total = 0;
        if (selectedProducts.length > 0) {
            const cartItemMap = new Map();
            selectedProducts.forEach((item) => {
                if (cartItemMap.has(item.name)) {
                    cartItemMap.get(item.name).quantity += item.quantity;
                } else {
                    cartItemMap.set(item.name, { ...item });
                }
            });
            cartItemMap.forEach((item) => {
                const cartItemDiv = document.createElement("div");
                cartItemDiv.classList.add("cart-item");
                const totalPrice = item.price * item.quantity;
                cartItemDiv.innerHTML = `
                    <div class="cart-item-details">
                        <hr>
                        <h4>${item.name}</h4>
                        <p>Price: ${item.price} ₴</p>
                        <p>Q-ty: ${item.quantity}</p>
                        <a class="remove-item-button py-auto text-decoration-none">Remove x1 </a> <span>ㅤ</span>
                        <a class="remove-item-button remove-all-items-button py-auto text-decoration-none">Remove All</a>
                        <hr>
                    </div>`;
                total += totalPrice;
                const removeItemButton = cartItemDiv.querySelector(".remove-item-button");
                removeItemButton.addEventListener("click", () => {
                    deletedProduct = item;

                    if (deletedProduct.quantity > 1) {
                        deletedProduct.quantity -= 1;
                    } else {
                        cartItemMap.delete(item.name);
                    }
                    const updatedSelectedProducts = Array.from(cartItemMap.values());
                    sessionStorage.setItem("selectedProducts", JSON.stringify(updatedSelectedProducts));
                    updateCartContent();
                });
                const removeAllItemsButton = cartItemDiv.querySelector(".remove-all-items-button");
                removeAllItemsButton.addEventListener("click", () => {
                    deletedProduct = item;
                    const remainingProducts = selectedProducts.filter(product => product.name !== deletedProduct.name);
                    sessionStorage.setItem("selectedProducts", JSON.stringify(remainingProducts));
                    updateCartContent();
                });
                cartItemsDiv.appendChild(cartItemDiv);
            });
            $({ countNum: parseFloat(cartTotalDiv.textContent.split(":")[1]) }).animate({
                countNum: total
            }, {
                duration: 500,
                step: function () {
                    cartTotalDiv.textContent = `Total: ${this.countNum.toFixed(0)} ₴`;
                },
                complete: function () {
                    cartTotalDiv.textContent = `Total: ${total.toFixed(0)} ₴`;
                }
            });
            checkoutButton.textContent = "To Purchase";
            checkoutButton.href = `checkout.html`;
        } else {
            const emptyCartMessage = document.createElement("div");
            emptyCartMessage.textContent = "THE CART IS EMPTY";
            emptyCartMessage.style.display = "flex";
            emptyCartMessage.style.justifyContent = "center";
            emptyCartMessage.style.alignItems = "center";
            emptyCartMessage.style.display = "flex";
            emptyCartMessage.style.color = "#000";
            emptyCartMessage.style.height = "100px";
            cartItemsDiv.appendChild(emptyCartMessage);
            cartTotalDiv.textContent = "";
            checkoutButton.textContent = "Go Back";
            checkoutButton.href = "index.html";
        }
    }
    clearCartButton.addEventListener("click", (event) => {
        const selectedProducts = JSON.parse(sessionStorage.getItem("selectedProducts")) || [];
        if (selectedProducts.length > 0) {
            const confirmClear = confirm("Are you sure want to cancel the check? In this case, all added products will be deleted!");
            if (!confirmClear) {
                event.preventDefault();
            } else {
                sessionStorage.removeItem("selectedProducts");
                updateCartContent();
            }
        }
    });
    updateCartContent();
});