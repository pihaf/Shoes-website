let cart = [];

function addToCart(product) {
  const existingProductIndex = cart.findIndex(item => item.id === product.id);
  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += parseInt(product.quantity);
  } else {
    product.quantity = parseInt(product.quantity); //convert quantity to a number
    cart.push(product);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
}

// function updateCart() {
//   const cartItems = document.querySelector('.cart-items');
//   const cartTotal = document.querySelector('.cart-total');
//   let total = 0;
//   let items = 0;
//   cart.forEach(item => {
//     item.subtotal = item.price * item.quantity; 
//     total += item.subtotal;
//     items += item.quantity;
//     console.log(`Number of items in cart: ${items}`);
//   });
//   cartItems.innerHTML = items;
//   cartTotal.innerHTML = `$${total.toFixed(2)}`;
// }

function updateCart() {
  const cartItems = document.querySelector('.cart-items');
  const cartTotal = document.querySelector('.cart-total');
  const cartTable = document.querySelector('tbody');
  let total = 0;
  let items = 0;
  cartTable.innerHTML = ''; //clear the existing rows in the cart table
  cart.forEach(item => {
    item.subtotal = item.price * item.quantity; 
    total += item.subtotal;
    items += item.quantity;
    const row = `
      <tr>
        <td><a href="#" class="remove-item" data-product-id="${item.id}"><i class="far fa-times-circle"></i></a></td>
        <td><img src="${item.image}" alt="${item.name}"></td>
        <td>${item.name}</td>
        <td>$${item.price}</td>
        <td><input type="number" value="${item.quantity}" data-product-id="${item.id}"></td>
        <td>$${item.subtotal.toFixed(2)}</td>
      </tr>
    `;
    cartTable.insertAdjacentHTML('beforeend', row); 

    //attach event listener to input field for quantity
    const quantityInput = cartTable.querySelector(`input[data-product-id="${item.id}"]`);
    quantityInput.addEventListener('change', event => {
      const newQuantity = parseInt(event.target.value);
      if (newQuantity >= 0) {
        item.quantity = newQuantity;
        item.subtotal = item.price * item.quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
      } else {
        event.target.value = item.quantity;
      }
    });
  });
  cartItems.innerHTML = items;
  cartTotal.innerHTML = `$${total.toFixed(2)}`;

  //attach event listener to each remove button
  const removeButtons = document.querySelectorAll('.remove-item');
  removeButtons.forEach(removeButton => {
    removeButton.addEventListener('click', event => {
      event.preventDefault();
      const productId = removeButton.dataset.productId;
      removeFromCart(productId);
      updateCart();
    });
  });
}

function loadCart() {
  const cartData = localStorage.getItem('cart');
  console.log(cartData);
  if (cartData) {
    cart = JSON.parse(cartData);
    updateCart();
  }
}

loadCart();