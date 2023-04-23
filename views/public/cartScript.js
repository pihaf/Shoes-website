let cart = [];

function addToCart(product) {
  const existingProduct = cart.find(item => item.id === product.id && item.size === product.size);
  if (existingProduct) {
    existingProduct.quantity += parseInt(product.quantity);
  } else {
    product.quantity = parseInt(product.quantity); //convert quantity to a number
    cart.push(product);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
}

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
        <td><a href="#" class="remove-item" data-product-id="${item.id}" data-product-size="${item.size}"><i class="far fa-times-circle"></i></a></td>
        <td><img src="${item.image}" alt="${item.name}"></td>
        <td>${item.name} (${item.size})</td>
        <td>$${item.price}</td>
        <td><input type="number" value="${item.quantity}" data-product-id="${item.id}" data-product-size="${item.size}"></td>
        <td>$${item.subtotal.toFixed(2)}</td>
      </tr>
    `;
    cartTable.insertAdjacentHTML('beforeend', row); 

    //attach event listener to input field for quantity
    const quantityInput = cartTable.querySelector(`input[data-product-id="${item.id}"][data-product-size="${item.size}"]`);
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
      const productSize = removeButton.dataset.productSize;
      cart = cart.filter(item => item.id !== productId || item.size !== productSize);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart();
    });
  });
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
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

document.querySelector('#reset-cart').addEventListener('click', () => {
  const successMessage = document.querySelector('#order-success-message');
  successMessage.textContent = '';
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
});

function completeOrder(user) {
  console.log("Logged from completeOrder:");
  console.log("User from completeOrder:");
  console.log(user);
  const cartData = localStorage.getItem('cart');
  if (!cartData) {
    alert('Your cart is empty!');
    return;
  }
  const cart = JSON.parse(cartData);
  const cartTotal = document.querySelector('.cart-total');
  const order = {
    order_date: new Date(),
    shipped_date: null,
    status: 'Pending',
    total: parseFloat(cartTotal.innerHTML.replace('$', '')),
    user_id: user.id
  };
  fetch(`/api/orders/user/${user.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
  })
    .then(response => response.json())
    .then(newOrder => {
      console.log('New order created:', newOrder);
      const orderItems = cart.map(item => ({
        product_id: parseInt(item.id),
        order_id: newOrder.id,
        size: item.size,
        quantity: item.quantity,
        price: item.price
      }));
      console.log('orderItems:', orderItems);
      return fetch(`/api/orders/orderItem/${newOrder.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderItems)
      });
    })
    .then(response => response.json())
    .then(newOrderItems => {
      console.log('New order items created:', newOrderItems);
      //reset the cart and show success message
      let cart2 = [];
      localStorage.setItem('cart', JSON.stringify(cart2));
      updateCart();
      const successMessage = document.querySelector('#order-success-message');
      successMessage.textContent = 'Order placed successfully!';
    })
    .catch(err => {
      console.error(err);
      alert('Error creating order!');
    });
}
