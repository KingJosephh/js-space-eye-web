const emailInput = document.querySelector('.email');
const passWordInput = document.querySelector('.Password');
const logInBtn = document.querySelector('.logIn-btn')
const logInElm = [];

axios.get('http://localhost:3000/users')
    .then(function(response){
        logInElm.elmEmail=response.data[0].email;
        logInElm.elmPassword=response.data[0].password;
        // console.log(response.data)
})

function logIn(a,b){
    axios.post('http://localhost:3000/login', {
        'email': a,
        'password': b,
    })
}

logInBtn.addEventListener('click', function(e){
    let email = emailInput.value.trim();
    let passWord = emailInput.value.trim();
    // const signEmail = logInElm[0].elmEmail;
    // const signPassword = logInElm[0].elmPassword
    // if(email === signEmail && passWord === signPassword){
    //     console.log('成功')
    // }
    console.log(logInElm.elmPassword)
})
console.log(logInElm)

