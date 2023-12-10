// const navbar = document.querySelector('.navbar');
// const hamburger = document.querySelector('.navbar-toggler');
// const navbarCollapse = document.querySelector('.navbar-collapse');
const Url = 'http://localhost:3000';
const token = localStorage.getItem('token');
const usersId = localStorage.getItem('usersId'); // token與usersId為header辨識登入用，勿刪
// 辨識是否已登入
const userBtn = document.querySelector('#userBtn');
axios.get(Url + `/600/users/${usersId}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => {
    console.log(response);
    userBtn.children[0].innerText = "車主專區";
    userBtn.children[0].setAttribute('href', '/Pages/carOwnerNew.html');
  })
  .catch((error) => {
    console.log(error);
    userBtn.children[0].innerText = "登入 / 註冊";
    userBtn.children[0].setAttribute('href', '/Pages/login.html');
  });
