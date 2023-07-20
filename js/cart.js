// Initialize the cart as an empty array to store products and their quantities
const cart = [];

// Function to add a product to the cart or increase its quantity if it's already in the cart
function addToCart(product) {
    const cartItem = cart.find(item => item.product === product);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ product, quantity: 1 });
    }

    updateCartCounter(); // Call the function to update the cart counter in the navbar
}

// Function to update the cart counter in the navbar
function updateCartCounter() {
    const cartCounter = document.getElementById('cart-counter');
    cartCounter.innerText = cart.reduce((total, item) => total + item.quantity, 0);
}

// Function to update the cart modal that displays the products in the cart
function updateCartModal() {
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = '';

    // Loop through each item in the cart and create a list item to display the product details
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('cart-item');

        const productImage = document.createElement('img');
        productImage.src = item.product.image;
        productImage.alt = item.product.name;
        productImage.classList.add('product-image');

        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info');

        const productName = document.createElement('p');
        productName.textContent = item.product.name;

        const productPrice = document.createElement('p');
        productPrice.textContent = `$${item.product.price}`;

        const quantity = document.createElement('span');
        quantity.textContent = `x ${item.quantity}`;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.addEventListener('click', () => removeFromCart(item.product));

        productInfo.appendChild(productName);
        productInfo.appendChild(productPrice);
        productInfo.appendChild(quantity);
        productInfo.appendChild(removeBtn);

        listItem.appendChild(productImage);
        listItem.appendChild(productInfo);
        cartItemsList.appendChild(listItem);
    });
}

// Function to open the cart modal
function openCartModal() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.style.display = 'block';
        updateCartModal();
    }
}

// Function to remove a product from the cart and update the cart counter and modal
function removeFromCart(product) {
    const cartItemIndex = cart.findIndex(item => item.product === product);

    if (cartItemIndex !== -1) {
        cart.splice(cartItemIndex, 1);
        updateCartCounter();
        updateCartModal();
    }
}

// Attach event listener to the existing cart icon in the navbar to open the cart modal
const cartIcon = document.querySelector('.cart-icon');
cartIcon.addEventListener('click', openCartModal);

// ... (Previous functions)

// Function to open the cart sidebar
function openCartSidebar() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.add('open');
    updateCartModal();
}

// Function to close the cart sidebar
function closeCartSidebar() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.remove('open');
}

// Attach event listener to the existing cart icon in the sidebar to open the cart sidebar
const cartIconSidebar = document.querySelector('.cart-icon'); // Use a different variable name here
cartIconSidebar.addEventListener('click', openCartSidebar);
