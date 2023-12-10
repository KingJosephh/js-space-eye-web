const logInForm = document.querySelector('#logInForm');
const emailInput = document.querySelector('.email');
const passWordInput = document.querySelector('.Password');
const logInBtn = document.querySelector('.logIn-btn');
const Url = 'http://localhost:3000';
const token = localStorage.getItem('token');
const usersId = localStorage.getItem('usersId'); // token與usersId為header辨識登入用，勿刪

function logIn(a, b) {
  axios.post(Url + '/login', {
    'email': a,
    'password': b,
  }).then(function (response) {
    console.log(response)
    const token = response.data.accessToken;
    const usersId = response.data.user.id;
    localStorage.setItem('token', token);
    localStorage.setItem('usersId', usersId);
    // document.querySelector('.btn2').style.display = 'block';
    // document.querySelector('.btn1').style.display = 'none'; // !這兩行會導致出錯，因為display undefined
    // emailInput.value = '';
    // passWordInput.value = '';
    logInForm.reset();
    alert('登入成功!');
    window.location.href = '/Pages/carOwnerNew.html';
  }).catch(function (err) {
    console.log(err)
    if (err.response.data === 'Email format is invalid') {
      showError('.email-warn')
    } else if (email !== '') {
      hideError('.email-warn')
    }
    if (err.response.data === 'Incorrect password') {
      showError('.Password-warn')
    } else if (email !== '') {
      hideError('.Password-warn')
    }
    alert('登入失敗');
  })
}

logInBtn.addEventListener('click', function (e) {
  let email = emailInput.value.trim();
  let passWord = passWordInput.value.trim();
  if (email === '') {
    showError('.email-warn')
  } else if (email !== '') {
    hideError('.email-warn')
  }
  if (passWord === '') {
    showError('.Password-warn')
  } else if (passWord !== '') {
    hideError('.Password-warn')
  }
  if (email !== '' && passWord !== '') {
    logIn(email, passWord)
  }
})

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


