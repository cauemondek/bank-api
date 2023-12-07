const viewPassword = document.querySelector('.viewPassword');
const inputPassword = document.querySelector('.inputPassword');

const inputUser = document.querySelector('.inputUser');
const inputEmail = document.querySelector('.inputEmail');

viewPassword.addEventListener('click', () => {
  if (inputPassword.type == 'password') {
    viewPassword.classList.remove('fa-eye');
    viewPassword.classList.add('fa-eye-slash');

    inputPassword.type = 'text';
  } else {
    viewPassword.classList.remove('fa-eye-slash');
    viewPassword.classList.add('fa-eye');

    inputPassword.type = 'password';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('error').innerHTML == 'Nome de usuário e email já existem') {
    inputUser.style.borderBottom = inputEmail.style.borderBottom = '1px solid #c01418';

    document.querySelector('.fa-user').style.color = document.querySelector('.fa-envelope').style.color = '#c01418';
  } else if (document.getElementById('error').innerHTML == 'Nome de usuário já existe') {
    inputUser.style.borderBottom = '1px solid #c01418';

    document.querySelector('.fa-user').style.color = '#c01418';
  } else if (document.getElementById('error').innerHTML == 'Email já cadastrado') {
    inputEmail.style.borderBottom = '1px solid #c01418';

    document.querySelector('.fa-envelope').style.color = '#c01418';
  }
});

const year = document.querySelector('#ano');
year.innerHTML = new Date().getFullYear();
