const signUpForm = document.querySelector('#signUpForm');
const UserName = document.getElementById('UserName');
const Email = document.getElementById('Email');
const Password = document.getElementById('Password-signIn');
const PasswordAgain = document.getElementById('Password-again');
const CarId = document.getElementById('Car-id');
const logInBtn = document.querySelector('.logIn-btn');
let aa = [];

function signUp(a, b, c, d) {
  axios
    .post(UrlWebType + '/users', {
      username: a,
      email: b,
      password: c,
      carId: d,
    })
    .then(function (response) {
      console.log(response);
      signUpForm.reset();

      // 註冊成功提示
      Swal.fire({
        icon: 'success',
        title: '註冊成功',
        showConfirmButton: false,
        timer: 1500,
      }).then((res) => {
        window.location.href = 'login.html';
      });
    })
    .catch(function (err) {
      console.log(err);
      console.dir(err);
      hideError('.warn-Email');
      hideError('.warn-Email-exists');
      if (err.response.data === 'Email format is invalid') {
        showError('.warn-Email');
      } else if (err.response.data === 'Email and password are required') {
        showError('.warn-Email');
      }
      if (err.response.data === 'Email already exists') {
        showError('.warn-Email-exists');
      }
    });
}
// 檢查輸入是否正確
function add() {
  let pass = Password.value.trim();
  let passAgain = PasswordAgain.value.trim();
  let passWord = '';
  let username = UserName.value.trim();
  let email = Email.value.trim();
  let carsId = CarId.value.trim();
  if (username === '') {
    showError('.warn-UserName');
  } else if (username !== '') {
    hideError('.warn-UserName');
  }

  if (email === '') {
    showError('.warn-Email');
  } else if (email !== '') {
    hideError('.warn-Email');
  }

  if (pass === '') {
    showError('.warn-Password');
  } else if (pass !== '') {
    hideError('.warn-Password');
  }

  if (passAgain === '') {
    showError('.warn-Password-again');
  } else if (passAgain !== '') {
    hideError('.warn-Password-again');
  }

  if (carsId === '') {
    showError('.warn-Car-id');
  } else if (carsId !== '') {
    hideError('.warn-Car-id');
  }
  if (pass !== passAgain) {
    showError('.warn-Password-again-sign');
  } else if (pass === passAgain) {
    passWord = Password.value.trim();
    signUp(username, email, passWord, carsId);
    hideError('.warn-Password-again-sign');
  }
}

// 跳出錯誤提示
function showError(selector) {
  document.querySelector(selector).style.display = 'block';
}
// 隱藏錯誤提示
function hideError(selector) {
  document.querySelector(selector).style.display = 'none';
}

logInBtn.addEventListener('click', function (e) {
  add();
});

UserName.addEventListener('input', function () {
  if (UserName.value !== '') {
    UserName.setAttribute('data-state', 'UserName');
  } else {
    UserName.removeAttribute('data-state', 'UserName');
  }
});
Email.addEventListener('input', function () {
  if (Email.value !== '') {
    Email.setAttribute('data-state', 'Email');
  } else {
    Email.removeAttribute('data-state', 'Email');
  }
});
Password.addEventListener('input', function () {
  if (Password.value !== '') {
    Password.setAttribute('data-state', 'Password-sign');
  } else {
    Password.removeAttribute('data-state', 'Password-sign');
  }
});
PasswordAgain.addEventListener('input', function () {
  if (PasswordAgain.value !== '') {
    PasswordAgain.setAttribute('data-state', 'Password-again-sign');
  } else {
    PasswordAgain.removeAttribute('data-state', 'Password-again');
  }
});
CarId.addEventListener('input', function () {
  if (CarId.value !== '') {
    CarId.setAttribute('data-state', 'Car-id');
  } else {
    CarId.removeAttribute('data-state', 'Car-id');
  }
});
