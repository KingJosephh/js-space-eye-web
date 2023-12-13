const Url = 'http://localhost:3000';
const token = localStorage.getItem('token');
const usersId = localStorage.getItem('usersId');
// 辨識是否已登入
const userBtn = document.querySelector('#userBtn');
axios.get(Url + `/600/users/${usersId}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => {
    // console.log(response);
    userBtn.children[0].innerText = "車主專區";
    userBtn.children[0].setAttribute('href', 'carOwner.html');
  })
  .catch((error) => {
    // console.log(error);
    userBtn.children[0].innerText = "登入 / 註冊";
    userBtn.children[0].setAttribute('href', 'login.html');
  });
