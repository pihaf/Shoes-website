const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

//check if the active panel is stored in localStorage
const activePanel = localStorage.getItem('activePanel');
if (activePanel === 'signUp') {
  container.classList.add('right-panel-active');
} else {
  container.classList.remove('right-panel-active');
}

signUpButton.addEventListener('click', () => {
  container.classList.add('right-panel-active');
  //store the active panel in localStorage
  localStorage.setItem('activePanel', 'signUp');
});

signInButton.addEventListener('click', () => {
  container.classList.remove('right-panel-active');
  //store the active panel in localStorage
  localStorage.setItem('activePanel', 'signIn');
});