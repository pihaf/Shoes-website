const productList = document.getElementById('product-list');

fetch('http://localhost:3000/api/products')
.then(response => response.json())
.then(data => {
    // Loop through products and create div elements
    for (let i = 0; i < data.length; i++) {
    if (i === 8) {
        break; // Limit to 8 products
    }

    const product = data[i];
    const pro = document.createElement('div');
    pro.className = 'pro';
    const img = document.createElement('img');
    img.src = `/products/${product.image_url}`;
    img.alt = product.name;
    const a = document.createElement('a');
    a.href = '#';
    const cartIcon = document.createElement('i');
    cartIcon.className = 'fas fa-shopping-cart cart-icon';
    a.appendChild(cartIcon);
    const des = document.createElement('div');
    des.className = 'des';
    // Update brand and category information
    const brand = product.Brand.name;
    const category = product.Category.name;
    des.innerHTML = `
        <span>${brand}</span>
        <h5>${product.name}</h5>
        <p>${category}</p>
        <p>1 Color</p>
        <h4>${product.price}</h4>
    `;
    a.appendChild(cartIcon);
    pro.appendChild(img);
    pro.appendChild(a);
    pro.appendChild(des);
    productList.appendChild(pro);
    }
})
.catch(error => console.log(error));