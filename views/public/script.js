/*
const container = document.getElementById('product-container');

// Get the product ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Make an AJAX request to the API to get the product data
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const product = JSON.parse(xhr.responseText);
    let html = `
      <div class="pro">
        <img src="${product.image}" alt="">
        <div class="des">
          <span>${product.brand}</span>
          <h5>${product.name}</h5>
          <p>${product.category}</p>
          <p>${product.color}</p>
          <h4>${product.price}</h4>
        </div>
        <a href="#"><i class="fas fa-shopping-cart cart-icon"></i></a>
      </div>
    `;
    container.innerHTML = html;
  }
};
xhr.open('GET', `/api/products/${productId}`);
xhr.send();*/