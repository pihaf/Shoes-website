document.addEventListener('DOMContentLoaded', () => {
    const blogLists = document.querySelectorAll('.blog-list');
    const pagination = document.getElementById('pagination');
  
    let currentPage = parseInt(localStorage.getItem('blogCurrentPage')) || 1;
    let totalPages = 1;
    let blogsPerPage = 4;
    let blogs = [];
  
    function renderBlogs() {
      const startIndex = (currentPage - 1) * blogsPerPage;
      const endIndex = startIndex + blogsPerPage;
      const blogsForPage = blogs.slice(startIndex, endIndex);
      let html = '';
      blogsForPage.forEach(blog => {
        // Create a new Date object from the post_date string
        const postDate = new Date(blog.post_date);
        // Get the date components
        const day = postDate.getDate();
        const month = postDate.getMonth() + 1;
        const year = postDate.getFullYear();
        // Format the date string as "MM/DD/YYYY"
        const formattedDate = `${month}/${day}/${year}`;
        html += `
          <div class="blog-box" data-blog-id="${blog.id}">
            <div class="blog-img">
                <img src="${blog.image_url}" alt="">
            </div>
            <div class="blog-details">
                <h4>${blog.title}</h4>
                <p>${blog.body}</p>
                <a href="${blog.blog_url}">CONTINUE READING</a>
            </div>
            <h1>${formattedDate}</h1>
          </div>
        `;
      });
      blogLists.forEach(blogList => {
        blogList.innerHTML = html;
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
  
    //SAVE THIS 
    // function getTotalPages() {
    //   fetch('http://localhost:3000/api/blogs')
    //     .then(response => response.json())
    //     .then(data => {
    //       blogs = data;
    //       totalPages = Math.ceil(blogs.length / blogsPerPage);
    //       renderblogs();
    //     })
    //     .catch(error => console.log(error));
    // }
  
    function getTotalPages() {
      fetch('http://localhost:3000/api/blogs')
        .then(response => response.json())
        .then(data => {
          blogs = data;
          totalPages = Math.ceil(blogs.length / blogsPerPage);
          renderBlogs();
        })
        .catch(error => console.log(error));
    
      //check for new blogs every 10 seconds
      setInterval(() => {
        fetch('http://localhost:3000/api/blogs')
          .then(response => response.json())
          .then(data => {
            const newBlogs = data;
            if (newBlogs.length > blogs.length) {
              blogs = newBlogs;
              totalPages = Math.ceil(blogs.length / blogsPerPage);
              renderBlogs();
    
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
          localStorage.setItem('blogCurrentPage', currentPage);
          renderBlogs();
        }
        //trying to use the arrow button(didnt work)
        // } else if (event.target.classList.contains('next-page')) {
        //   if (currentPage < totalPages) {
        //     currentPage++;
        //     localStorage.setItem('currentPage', currentPage);
        //     renderblogs();
        //   }
        // }
      });
  
    getTotalPages();
  });