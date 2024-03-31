const logInForm = document.querySelector('#logInForm');
const emailInput = document.querySelector('.email');
const passWordInput = document.querySelector('.Password');
const logInBtn = document.querySelector('.logIn-btn');

function logIn(a, b) {
  axios
    .post(UrlWebType + '/login', {
      email: a,
      password: b,
    })
    .then(function (response) {
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('usersId', response.data.user.id);

      logInForm.reset();

      // 登入成功提示
      Swal.fire({
        icon: 'success',
        title: '登入成功',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.href = '../index.html';
      });
    })
    .catch(function (err) {
      hideError('.email-warn');
      hideError('.Password-warn');

      // 錯誤信箱格式提示
      if (err.response.data === 'Email format is invalid') {
        showError('.email-warn');
      }
      // 錯誤密碼提示
      else if (err.response.data === 'Incorrect password' || err.response.data === 'Password is too short') {
        showError('.Password-warn');
        Swal.fire({
          icon: 'error',
          title: '登入失敗',
          text: '密碼過短',
        });
      }
      // 無帳號提示
      else if (err.response.data === 'Cannot find user') {
        Swal.fire({
          icon: 'error',
          title: '登入失敗',
          text: '請確認您已註冊',
        });
      }
    });
}

logInBtn.addEventListener('click', function () {
  let email = emailInput.value.trim();
  let passWord = passWordInput.value.trim();

  hideError('.email-warn');
  hideError('.Password-warn');

  if (email === '') {
    showError('.email-warn');
  }
  if (passWord === '') {
    showError('.Password-warn');
  }
  if (email !== '' && passWord !== '') {
    logIn(email, passWord);
  }
});

emailInput.addEventListener('input', function () {
  if (emailInput.value !== '') {
    emailInput.setAttribute('id', 'email');
  } else {
    emailInput.removeAttribute('id', 'email');
  }
});
passWordInput.addEventListener('input', function () {
  if (passWordInput.value !== '') {
    passWordInput.setAttribute('id', 'email');
  } else {
    passWordInput.removeAttribute('id', 'email');
  }
});

function showError(select) {
  document.querySelector(select).style.display = 'block';
}
function hideError(select) {
  document.querySelector(select).style.display = 'none';
}
