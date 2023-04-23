const productLists = document.getElementById('featured');
const productLists2 = document.getElementById('new-arrivals');

fetch('http://localhost:3000/api/products')
  .then(response => response.json())
  .then(data => {
    //loop through products and create div elements
    let html = '';
    for (let i = 0; i < data.length; i++) {
      if (i === 8) {
        break; //limit to 8 products
      }

      const product = data[i];
      html += `
        <div class="pro" data-product-id="${product.id}">
          <img src="${product.image_url}" alt="${product.name}">
          <a href="#">
            <i class="fas fa-shopping-cart cart-icon"></i>
          </a>
          <div class="des">
            <span>${product.Brand.name}</span>
            <h5>${product.name}</h5>
            <p>${product.Category.name}</p>
            <p>${product.gender}</p>
            <p>1 Color</p>
            <h4>$${product.price}</h4>
          </div>
        </div>
      `;
    }
    productLists.innerHTML = html;
    const productElements = productLists.querySelectorAll('.pro');
    productElements.forEach(productElement => {
      productElement.addEventListener('click', event => {
        event.preventDefault();
        //get the product ID from the data attribute
        const productId = productElement.dataset.productId;
        //redirect to the product details page with the product ID
        window.location.href = `/products/${productId}`;
      });
    });
  })
  .catch(error => console.log(error));


  fetch('http://localhost:3000/api/products')
  .then(response => response.json())
  .then(data => {
    //loop through products and create div elements
    let html = '';
    let count = 0;
    for (let i = 20; i < data.length; i++) {
      if (count === 8) {
        break; //limit to 8 products
      }

      const product = data[i];
      html += `
        <div class="pro" data-product-id="${product.id}">
          <img src="${product.image_url}" alt="${product.name}">
          <a href="#">
            <i class="fas fa-shopping-cart cart-icon"></i>
          </a>
          <div class="des">
            <span>${product.Brand.name}</span>
            <h5>${product.name}</h5>
            <p>${product.Category.name}</p>
            <p>${product.gender}</p>
            <p>1 Color</p>
            <h4>$${product.price}</h4>
          </div>
        </div>
      `;
      count++;
    }
    productLists2.innerHTML = html;
    const productElements = productLists2.querySelectorAll('.pro');
    productElements.forEach(productElement => {
      productElement.addEventListener('click', event => {
        event.preventDefault();
        //get the product ID from the data attribute
        const productId = productElement.dataset.productId;
        //redirect to the product details page with the product ID
        window.location.href = `/products/${productId}`;
      });
    });
  })
  .catch(error => console.log(error));