const logInForm = document.querySelector('#logInForm');
const emailInput = document.querySelector('.email');
const passWordInput = document.querySelector('.Password');
const logInBtn = document.querySelector('.logIn-btn');

function logIn(a, b) {
  axios.post(Url + '/login', {
    'email': a,
    'password': b,
  }).then(function (response) {
    console.log(response)

    localStorage.setItem('token', response.data.accessToken);
    localStorage.setItem('usersId', response.data.user.id);
    
    logInForm.reset();

    // 登入成功提示
    Swal.fire({
      icon: "success",
      title: "登入成功",
      showConfirmButton: false,
      timer: 1500
    }).then(res => {
      window.location.href = '/findSpace.html';
    })

  }).catch(function (err) {
    console.log(err);
    hideError('.email-warn');
    hideError('.Password-warn');

    // 錯誤信箱格式提示
    if (err.response.data === 'Email format is invalid') {
      showError('.email-warn')
    }
    // 錯誤密碼提示
    else if (err.response.data === 'Incorrect password') {
      showError('.Password-warn')
    }
    // 無帳號提示
    else if (err.response.data === 'Cannot find user'){
      Swal.fire({
        icon: "error",
        title: "登入失敗",
        text: "請確認您已註冊"
      });
    }
  })
}

// 芒果樹原版
/* function logIn(a, b) {
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
      return
    } else if (email !== '') {
      hideError('.Password-warn')
    }
    else{
      Swal.fire({
        icon: "error",
        title: "登入失敗",
        text: "請確認已註冊"
      });
    }
  })
} */

logInBtn.addEventListener('click', function (e) {
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


