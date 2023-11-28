// const { default: axios } = require("axios");

const UserName = document.getElementById('UserName')
const Email = document.getElementById('Email')
const Password = document.getElementById('Password-signIn')
const PasswordAgain = document.getElementById('Password-again')
const CarId = document.getElementById('Car-id')
const logInBtn = document.querySelector('.logIn-btn')
let aa = []
const Url = 'http://localhost:3000'


function signUp(a,b,c,d){
    axios.post(Url + '/users',{
        'username': a,
        'email': b,
        'password': c,
        'carId': d
    }).then(function (response) {
        console.log(response);
        Password.value = '';
        PasswordAgain.value = '';
        UserName.value = '';
        Email.value = '';
        CarId.value = '';
        window.location.href = 'http://127.0.0.1:5501/spaceEyeHtmlPage/login.html';
    }).catch(function(err){
        console.log(err)
        if(err.response.data === 'Email format is invalid'){
            showError('.warn-Email');
        }else if(err.response.data === 'Email and password are required'){
            showError('.warn-Email');
        }
        else{
            hideError('.warn-Email');
        }
        if(err.response.data === 'Email already exists'){
            showError('.warn-Email-exists');
        }else{
            hideError('.warn-Email-exists');
        }

    });
}
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
    if(pass !== passAgain){
        showError('.warn-Password-again-sign');
    }else if (pass === passAgain) {
        passWord = Password.value.trim();
        signUp(username, email, passWord, carsId);
        hideError('.warn-Password-again-sign');
    }
}

function showError(selector) {
    document.querySelector(selector).style.display = 'block';
}
function hideError(selector) {
    document.querySelector(selector).style.display = 'none';
}

logInBtn.addEventListener('click' , function(e){
    add()
})

UserName.addEventListener('input', function() {
    if (UserName.value !== '') {
        UserName.setAttribute('data-state', 'UserName');
    } else {
        UserName.removeAttribute('data-state', 'UserName');
    }
});
Email.addEventListener('input', function() {
    if (Email.value !== '') {
        Email.setAttribute('data-state', 'Email');
    } else {
        Email.removeAttribute('data-state', 'Email');
    }
});
Password.addEventListener('input', function() {
    if (Password.value !== '') {
        Password.setAttribute('data-state', 'Password-sign');
    } else {
        Password.removeAttribute('data-state', 'Password-sign');
    }
});
PasswordAgain.addEventListener('input', function() {
    if (PasswordAgain.value !== '') {
        PasswordAgain.setAttribute('data-state', 'Password-again-sign');
    } else {
        PasswordAgain.removeAttribute('data-state', 'Password-again');
    }
});
CarId.addEventListener('input', function() {
    if (CarId.value !== '') {
        CarId.setAttribute('data-state', 'Car-id');
    } else {
        CarId.removeAttribute('data-state', 'Car-id');
    }
});
// 在 Google Cloud Console 中创建 OAuth 2.0 客户端 ID