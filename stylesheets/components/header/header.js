const UrlWebType = 'https://spaceeye.dewed.one';
const token = localStorage.getItem('token');
const usersId = localStorage.getItem('usersId');
// 辨識是否已登入
const userBtn = document.querySelector('#userBtn');
if (usersId) {
  axios
    .get(UrlWebType + `/600/users/${usersId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      userBtn.children[0].innerText = '車主專區';
      userBtn.children[0].setAttribute('href', 'carOwner.html');
      userBtn.addEventListener('click', () => {
        window.location.href = 'carOwner.html';
      });
    })
    .catch(() => {
      userBtn.children[0].innerText = '登入 / 註冊';
      userBtn.children[0].setAttribute('href', 'login.html');
      userBtn.addEventListener('click', () => {
        window.location.href = 'login.html';
      });
    });
} else {
  userBtn.children[0].innerText = '登入 / 註冊';
  userBtn.children[0].setAttribute('href', 'login.html');
  userBtn.addEventListener('click', () => {
    window.location.href = 'login.html';
  });
}
