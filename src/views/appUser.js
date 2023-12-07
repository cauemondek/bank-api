const errorNotify = document.querySelector('.errorNotify');
const errorMessage = document.getElementById('errorMessage');
const sucessNotify = document.querySelector('.sucessNotify');
const sucessMessage = document.getElementById('sucessMessage');

const userKey = document.getElementById('userKey').innerHTML;

function showErrorNotify(message) {
  errorNotify.style.display = 'flex';
  setTimeout(() => {
    errorNotify.style.display = 'none';
  }, 4999);
  errorMessage.innerHTML = message;
}
function showSucessNotify(message) {
  sucessNotify.style.display = 'flex';
  setTimeout(() => {
    sucessNotify.style.display = 'none';
  }, 4999);
  sucessMessage.innerHTML = message;
}

document.getElementById('exit').addEventListener('click', () => {
  window.location.href = '/login';
});

document.getElementById('profileFile').addEventListener('change', () => {
  document.getElementById('filePreview').innerHTML = document.getElementById('profileFile').files[0].name;
});

const buttonsNav = document.querySelectorAll('.buttonNav');
const navPages = document.querySelectorAll('.navPageContainer');
buttonsNav.forEach((index, numberButton) => {
  index.addEventListener('click', () => {
    navPages.forEach(() => {
      for (let countPage = 0; countPage < navPages.length; countPage++) {
        navPages[countPage].style.display = 'none';
      }
      navPages[numberButton].style.display = 'flex';
    });
  });
});

const inputChange = document.querySelectorAll('.changeUserData');
const previewInput = document.querySelectorAll('.previewInput');
document.querySelectorAll('.fa-pen-to-square').forEach((index, iconNumber) => {
  index.addEventListener('click', () => {
    inputChange.forEach(() => {
      inputChange[iconNumber].style.display = 'flex';
      inputChange[iconNumber].focus();
    });
    previewInput.forEach(() => {
      previewInput[iconNumber].style.display = 'none';
    });
  });
});

const allStepOne = document.querySelectorAll('.step-one');
const allStepTwo = document.querySelectorAll('.step-two');
document.querySelectorAll('.closeNavPage').forEach((index, closePageNumber) => {
  index.addEventListener('click', () => {
    navPages.forEach(() => {
      for (let countPage = 0; countPage < navPages.length; countPage++) {
        navPages[countPage].style.display = 'none';
      }

      if (closePageNumber === 0) {
        inputChange.forEach(() => {
          for (let countInputChange = 0; countInputChange < inputChange.length; countInputChange++) {
            inputChange[countInputChange].style.display = 'none';
          }
        });
        previewInput.forEach(() => {
          for (let countPreviewInput = 0; countPreviewInput < previewInput.length; countPreviewInput++) {
            previewInput[countPreviewInput].style.display = 'flex';
          }
        });
      }

      if (closePageNumber === 2) {
        document.getElementById('cashTransferData').value = document.getElementById('userTransferData').value = '';

        allStepOne.forEach(() => {
          for (let displayStepOne = 0; displayStepOne < allStepOne.length; displayStepOne++) {
            allStepOne[displayStepOne].style.display = 'flex';
          }
        });
        allStepTwo.forEach(() => {
          for (let displayStepTwo = 0; displayStepTwo < allStepTwo.length; displayStepTwo++) {
            allStepTwo[displayStepTwo].style.display = 'none';
          }
        });

        otpInput.forEach(() => {
          for (let countInputOtp = 0; countInputOtp < otpInput.length; countInputOtp++) {
            otpInput[countInputOtp].value = '';
          }
          inputFocus = 0;
          otpInput[0].disabled = false;
          otpInput[1].disabled = true;
          otpInput[2].disabled = true;
          otpInput[3].disabled = true;
        });
      }
    });
  });

  inputChange.forEach(() => {
    previewInput.forEach(() => {
      for (let countInputs = 0; countInputs < inputChange.length; countInputs++) {
        inputChange[countInputs].style.display = 'none';
        previewInput[countInputs].style.display = 'flex';
      }
    });
  });
});

document.getElementById('changeProfile').addEventListener('click', () => {
  document.querySelector('.loadingUser').style.display = 'flex';

  if (document.getElementById('profileFile').files[0] === undefined) {
    let requestEditUser = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: document.getElementById('userChange').value,
        password: document.getElementById('passwordChange').value,
        email: document.getElementById('emailChange').value,
      }),
    };

    fetch('/login/userSettings', requestEditUser)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then(updatedData => {
        console.log('Data updated:', updatedData);
        showSucessNotify('Dados atualizados com sucesso');
        document.querySelector('.loadingUser').style.display = 'none';
        setTimeout(() => {
          location.reload();
        }, 5000);
      })
      .catch(error => {
        console.error('Error updating data:', error);
        showErrorNotify('Erro ao atualizar dados: ' + error);
        document.querySelector('.loadingUser').style.display = 'none';
      });
  } else {
    var userFile = document.getElementById('profileFile').files[0];
    var nameFile = document.getElementById('profileFile').files[0].name;

    var reader = new FileReader();

    reader.onload = () => {
      let base64Image = reader.result;

      let requestEditUser = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: document.getElementById('userChange').value,
          password: document.getElementById('passwordChange').value,
          email: document.getElementById('emailChange').value,
          iconSrc: base64Image,
          iconSrcName: nameFile,
        }),
      };

      fetch('/login/userSettings', requestEditUser)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
          }
          return response.json();
        })
        .then(updatedData => {
          console.log('Data updated:', updatedData);
          showSucessNotify('Dados atualizados com sucesso');
          document.querySelector('.loadingUser').style.display = 'none';
          setTimeout(() => {
            location.reload();
          }, 5000);
        })
        .catch(error => {
          if (document.getElementById('profileFile').files[0].size > 62000) {
            console.error('Error updating data:', error);
            showErrorNotify('Arquivo excede o limite máximo de 62KB');
            document.querySelector('.loadingUser').style.display = 'none';
          } else {
            console.error('Error updating data:', error);
            showErrorNotify('Erro ao atualizar dados: ' + error);
            document.querySelector('.loadingUser').style.display = 'none';
          }
        });
    };
    reader.readAsDataURL(userFile);
  }
});

document.getElementById('deleteAccount').addEventListener('click', () => {
  document.querySelector('.loadingDelete').style.display = 'flex';

  let requestDeleteUser = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  };

  fetch('/login/deleteAccount', requestDeleteUser)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return response.json();
    })
    .then(update => {
      document.querySelector('.loadingDelete').style.display = 'none';
      showSucessNotify('Sua conta foi excluída, você será redirecionado');
      setTimeout(() => {
        location.reload();
      }, 5000);
    })
    .catch(error => {
      document.querySelector('.loadingDelete').style.display = 'none';
      console.error('Error to delete:', error);
      showErrorNotify('Erro ao excluir conta: ' + error);
    });
});

const otpInput = document.querySelectorAll('.otpInput');
otpInput.forEach((index, count) => {
  let inputFocus;
  function verifyInput() {
    if (index.value.length > 1) {
      index.value = '';
    }
    if (index.value.length === 1) {
      inputFocus = count + 1;
      if (inputFocus < 4) {
        otpInput[inputFocus].disabled = false;
        otpInput[inputFocus - 1].disabled = true;
        otpInput[inputFocus].focus();
      }
    }
    if (document.getElementById('otpFour').value.length === 1) {
      document.getElementById('transferButton').disabled = false;
    }
    if (document.getElementById('otpFour').value.length === 0) {
      document.getElementById('transferButton').disabled = true;
    }
  }

  let otpFocus = false;
  index.addEventListener('focus', () => {
    otpFocus = true;
    setInterval(() => {
      if (otpFocus === true) {
        verifyInput();
      }
    }, 25);
  });
  index.addEventListener('focusout', () => {
    otpFocus = false;
  });

  document.getElementById('eraseOtp').addEventListener('click', () => {
    for (let countInputOtp = 0; countInputOtp < otpInput.length; countInputOtp++) {
      otpInput[countInputOtp].value = '';
    }
    inputFocus = 0;
    otpInput[0].disabled = false;
    otpInput[1].disabled = true;
    otpInput[2].disabled = true;
    otpInput[3].disabled = true;
    otpInput[0].focus();
  });
});

let userSend;
let cashSend;
document.querySelector('.continueButton').addEventListener('click', () => {
  userSend = document.getElementById('userTransferData').value;
  cashSend = document.getElementById('cashTransferData').value;
  if (userSend == '' || cashSend == '') {
    showErrorNotify('Todas as informações precisam ser preenchidas');
  } else if (cashSend < 1) {
    showErrorNotify('O valor a ser enviado precisa ser igual ou maior que 1');
  } else {
    allStepOne.forEach(() => {
      for (let displayStepOne = 0; displayStepOne < allStepOne.length; displayStepOne++) {
        allStepOne[displayStepOne].style.display = 'none';
      }
    });
    allStepTwo.forEach(() => {
      for (let displayStepTwo = 0; displayStepTwo < allStepTwo.length; displayStepTwo++) {
        allStepTwo[displayStepTwo].style.display = 'flex';
      }
    });
  }
});

document.getElementById('transferButton').addEventListener('click', () => {
  document.querySelector('.loadingTransfer').style.display = 'flex';

  let otpOne = document.getElementById('otpOne').value.toString();
  let otpTwo = document.getElementById('otpTwo').value.toString();
  let otpThree = document.getElementById('otpThree').value.toString();
  let otpFour = document.getElementById('otpFour').value.toString();

  let allOtp = otpOne + otpTwo + otpThree + otpFour;

  Number(allOtp);

  if (allOtp == userKey) {
    let requestTransfer = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userSend,
        cashSend,
      }),
    };

    fetch('/login/transfer', requestTransfer)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then(update => {
        document.querySelector('.loadingTransfer').style.display = 'none';
        showSucessNotify('O valor de R$ ' + cashSend + ' foi enviado com sucesso para ' + userSend);
        setTimeout(() => {
          location.reload();
        }, 5000);
      })
      .catch(error => {
        document.querySelector('.loadingTransfer').style.display = 'none';
        if (error == 'Error: HTTP error 404') {
          showErrorNotify('Usuário não encontrado');
        } else if (error == 'Error: HTTP error 406') {
          showErrorNotify('Saldo insuficiente');
        } else if (error == 'Error: HTTP error 409') {
          showErrorNotify('Não é possível transferir para si mesmo');
        } else {
          showErrorNotify('Erro na transferência: ' + error);
        }
        console.error('Error to transfer:', error);
      });
  } else {
    document.querySelector('.loadingTransfer').style.display = 'none';
    showErrorNotify('Código de segurança inválido');
  }
});

const year = document.querySelector('#ano');
year.innerHTML = new Date().getFullYear();
