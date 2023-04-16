const activeHome = (currentUrl) => {
    return currentUrl === '/';
  };
  
  const activeShop = (currentUrl) => {
    return currentUrl === '/shop';
  };
  
  const activeBlog = (currentUrl) => {
    return currentUrl === '/blog';
  };
  
  const activeAbout = (currentUrl) => {
    return currentUrl === '/about';
  };
  
  const activeContact = (currentUrl) => {
    return currentUrl === '/contact';
  };
  
  module.exports = {
    activeHome,
    activeShop,
    activeBlog,
    activeAbout,
    activeContact
  };