
const viewPassword = document.querySelector('.viewPassword');
const inputPassword = document.querySelector('.inputPassword');

const inputUser = document.querySelector('.inputUser');

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

// function getUser() {
//   return (
//     fetch('/login')
//       // ✅ call response.json() here
//       .then(response => response.json())
//       .then(data => {
//         console.log(data);
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   );
// }
// getUser();

// const apiUrl = 'https://api.example.com/data';
// const data = {
//   name: 'John Doe',
//   email: 'johndoe@example.com',
// };

// const requestOptions = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(data),
// };

// fetch(apiUrl, requestOptions)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     outputElement.textContent = JSON.stringify(data, null, 2);
//   })
//   .catch(error => {
//     console.error

// ('Error:', error);
//   });


document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('error').innerHTML == 'Usuário não encontrado') {
    inputUser.style.borderBottom = 
    inputPassword.style.borderBottom = 
    '1px solid #c01418';

    document.querySelector('.fa-user').style.color = 
    document.querySelector('.fa-lock').style.color = 
    '#c01418';
  } else if (document.getElementById('error').innerHTML == 'Senha inválida') {
    inputPassword.style.borderBottom = '1px solid #c01418';

    document.querySelector('.fa-lock').style.color = '#c01418';
  }

});

const year = document.querySelector('#ano');
year.innerHTML = new Date().getFullYear();
