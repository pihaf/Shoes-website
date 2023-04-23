document.addEventListener('DOMContentLoaded', () => {
    const productLists = document.querySelectorAll('.product-list');
    const pagination = document.getElementById('pagination');
  
    let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;
    let totalPages = 1;
    let productsPerPage = 8;
    let products = [];
  
    function renderProducts() {
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const productsForPage = products.slice(startIndex, endIndex);
      let html = '';
      productsForPage.forEach(product => {
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
      });
      productLists.forEach(productList => {
        productList.innerHTML = html;
        const productElements = productList.querySelectorAll('.pro');
        productElements.forEach(productElement => {
          productElement.addEventListener('click', event => {
            event.preventDefault();
            //get the product ID from the data attribute
            const productId = productElement.dataset.productId;
            //redirect to the product details page with the product ID
            window.location.href = `/products/${productId}`;
          });
        });
      });

      const pageLinks = pagination.querySelectorAll('a[data-page]');
  
      pageLinks.forEach(pageLink => {
        const pageNumber = parseInt(pageLink.dataset.page);
        if (pageNumber === currentPage) {
          pageLink.classList.add('active');
        } else {
          pageLink.classList.remove('active');
        }
      });
    }

    function getTotalPages() {
      fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(data => {
          products = data;
          totalPages = Math.ceil(products.length / productsPerPage);
          renderProducts();
        })
        .catch(error => console.log(error));
    
      //check for new products every 10 seconds
      setInterval(() => {
        fetch('http://localhost:3000/api/products')
          .then(response => response.json())
          .then(data => {
            const newProducts = data;
            if (newProducts.length > products.length) {
              products = newProducts;
              totalPages = Math.ceil(products.length / productsPerPage);
              renderProducts();
    
              // Update pagination links
              const pageLinks = pagination.querySelectorAll('a[data-page]');
              const lastPageLink = pageLinks[pageLinks.length - 2];
              const lastPageNumber = parseInt(lastPageLink.dataset.page);
              if (totalPages > lastPageNumber) {
                for (let i = lastPageNumber + 1; i <= totalPages; i++) {
                  const newPageLink = document.createElement('a');
                  newPageLink.href = '#';
                  newPageLink.dataset.page = i;
                  newPageLink.textContent = i;
                  pagination.insertBefore(newPageLink, pagination.lastElementChild);
                }
              }
            }
          })
          .catch(error => console.log(error));
      }, 10000);
    }
  
    pagination.addEventListener('click', event => {
        event.preventDefault();
        const page = parseInt(event.target.dataset.page);
        if (page && page !== currentPage) {
          currentPage = page;
          localStorage.setItem('currentPage', currentPage);
          renderProducts();
        }
        //trying to use the arrow button(didnt work)
        // } else if (event.target.classList.contains('next-page')) {
        //   if (currentPage < totalPages) {
        //     currentPage++;
        //     localStorage.setItem('currentPage', currentPage);
        //     renderProducts();
        //   }
        // }
      });
  
    getTotalPages();
  });

// document.addEventListener('DOMContentLoaded', () => {
//   const productLists = document.querySelectorAll('.product-list');
//   const pagination = document.getElementById('pagination');

//   let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;
//   let totalPages = 1;
//   let productsPerPage = 8;
//   let products = [];
//   let filteredProducts = [];

//   function renderProducts() {
//     const startIndex = (currentPage - 1) * productsPerPage;
//     const endIndex = startIndex + productsPerPage;
//     const productsForPage = filteredProducts.slice(startIndex, endIndex);
//     let html = '';
//     productsForPage.forEach(product => {
//       html += `
//         <div class="pro" data-product-id="${product.id}">
//           <img src="${product.image_url}" alt="${product.name}">
//           <a href="#">
//             <i class="fas fa-shopping-cart cart-icon"></i>
//           </a>
//           <div class="des">
//             <span>${product.Brand.name}</span>
//             <h5>${product.name}</h5>
//             <p>${product.Category.name}</p>
//             <p>${product.gender}</p>
//             <p>1 Color</p>
//             <h4>$${product.price}</h4>
//           </div>
//         </div>
//       `;
//     });
//     productLists.forEach(productList => {
//       productList.innerHTML = html;
//       const productElements = productList.querySelectorAll('.pro');
//       productElements.forEach(productElement => {
//         productElement.addEventListener('click', event => {
//           event.preventDefault();
//           //get the product ID from the data attribute
//           const productId = productElement.dataset.productId;
//           //redirect to the product details page with the product ID
//           window.location.href = `/products/${productId}`;
//         });
//       });
//     });

//     const pageLinks = pagination.querySelectorAll('a[data-page]');

//     pageLinks.forEach(pageLink => {
//       const pageNumber = parseInt(pageLink.dataset.page);
//       if (pageNumber === currentPage) {
//         pageLink.classList.add('active');
//       } else {
//         pageLink.classList.remove('active');
//       }
//     });
//   }

//   function handleSearch() {
//     const searchInput = document.getElementById('search-input');
//     const searchQuery = searchInput.value.trim().toLowerCase();
//     if (searchQuery !== '') {
//       filteredProducts = products.filter(product => {
//         return product.name.toLowerCase().includes(searchQuery);
//       });
//       filteredProducts.sort((a, b) => {
//         const aExactMatch = a.name.toLowerCase() === searchQuery;
//         const bExactMatch = b.name.toLowerCase() === searchQuery;
//         if (aExactMatch && !bExactMatch) {
//           return -1;
//         } else if (!aExactMatch && bExactMatch) {
//           return 1;
//         } else {
//           return 0;
//         }
//       });
//       totalPages = Math.ceil(filteredProducts.length / productsPerPage);
//       currentPage = 1;
//     } else {
//       filteredProducts = products;
//       totalPages = Math.ceil(filteredProducts.length / productsPerPage);
//       currentPage = 1;
//     }
//     renderProducts();
//   }

//   function getTotalPages() {
//     // Fetch products and calculate total pages
//     fetch('http://localhost:3000/api/products')
//       .then(response => response.json())
//       .then(data => {
//         products = data;
//         filteredProducts = products;
//         totalPages = Math.ceil(filteredProducts.length / productsPerPage);
//         renderProducts();
//       })
//       .catch(error => console.log(error));

//     // Check for new products every 10 seconds
//     setInterval(() => {
//       fetch('http://localhost:3000/api/products')
//         .then(response => response.json())
//         .then(data => {
//           const newProducts = data.filter(product => !products.find(p => p.id === product.id));
//           if (newProducts.length > 0) {
//             products = products.concat(newProducts);
//             filteredProducts = products;
//             totalPages = Math.ceil(filteredProducts.length / productsPerPage);
//             renderProducts();
//           }
//         })
//         .catch(error => console.log(error));
//     }, 10000);
//   }

//   getTotalPages();

//   const searchForm = document.getElementById('search-form');
//   searchForm.addEventListener('submit', event => {
//     event.preventDefault();
//     handleSearch();
//   });

//   const searchInput = document.getElementById('search-input');
//   searchInput.addEventListener('input', () => {
//     handleSearch();
//   });

//   const prevPageLink = pagination.querySelector('a[data-prev]');
//   prevPageLink.addEventListener('click', event => {
//     event.preventDefault();
//     if (currentPage > 1) {
//       currentPage--;
//       renderProducts();
//     }
//   });

//   const nextPageLink = pagination.querySelector('a[data-next]');
//   nextPageLink.addEventListener('click', event => {
//     event.preventDefault();
//     if (currentPage < totalPages) {
//       currentPage++;
//       renderProducts();
//     }
//   });

//   const pageLinks = pagination.querySelectorAll('a[data-page]');

//   pageLinks.forEach(pageLink => {
//     pageLink.addEventListener('click', event => {
//       event.preventDefault();
//       const pageNumber = parseInt(pageLink.dataset.page);
//       if (pageNumber !== currentPage) {
//         currentPage = pageNumber;
//         renderProducts();
//       }
//     });
//   });
// });