const change = document.querySelector('#changeText')
const enterPassword = document.querySelector('#enterPassword')
const reEnterPassword = document.querySelector('#reEnterPassword')
const getNewPassword = document.querySelector('#getNewPass')
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');
const btn5 = document.getElementById('btn5');
const btn6 = document.getElementById('btn6');
const btn11 = document.querySelector('#btn1-1')
const btn12 = document.querySelector('#btn1-2')
const btnBgMove = document.querySelector('.btn-bg-move');
const btnBgMove1 = document.querySelector('.btn-bg-move1');
const contentToHide = document.querySelector('.content-to-hide-owner');
const contentToHide2 = document.querySelector('.content-to-hide-save');
const btnList = document.querySelector('#list')
const contentToHide3 = document.querySelector('.content-to-hide-trading-history');
const contentToHide4 = document.querySelector('.content-to-hide-appointment');
const contentToHide5 = document.querySelector('.content-to-hide-storage');
const showMapCard = document.querySelector('#showMapCard')
const btnNumList = 1;
const btnNumList1 = 1;
const allHide = [contentToHide, contentToHide2, contentToHide3, contentToHide4, contentToHide5];
let getParkValue = 'C01';
const localParkData = localStorage.getItem('likePark');
let saveLikePark = [];
// 從 localStorage 中讀取進場和出場時間和方案選擇
const entryTimeHeader = localStorage.getItem("entryTime");
const exitTimeHeader = localStorage.getItem("exitTime");
const chosePlanHeader = localStorage.getItem("chosePlan");
let locatedX = 24.162139;
let locatedY = 120.647021;

//切換六個項目按鈕
function getNum(x) {
  let num = parseInt(x.getAttribute('data-num'));
  if (num > btnNumList) {
    btnBgMove.style.marginLeft = (287 * (num - 1)) + 'px';
  } else if (num < btnNumList) {
    btnBgMove.style.marginLeft = (287 * (num - 1)) + 'px';
  } else if (num = 1) {
    btnBgMove.style.marginLeft = 0;
  }
}
//將未被選種項目style加上none
function getHide(same) {
  const differentBtn = allHide
    .filter((item) => item instanceof HTMLElement) // 過滤出DOM元素
    .filter((item) => item !== same);
  differentBtn.forEach((e) => {
    e.style.display = 'none';
  });
}
//如果num跟取得數值一樣將項目style加上block
function showContent(z) {
  let num = parseInt(z.getAttribute('data-num'));
  if (num === 1) {
    getHide(z)
    contentToHide.style.display = 'block';
  } else if (num === 2) {
    getHide(z)
    contentToHide2.style.display = 'block';
  } else if (num === 3) {
    getHide(z)
    contentToHide3.style.display = 'block';
  } else if (num === 4) {
    getHide(z)
    contentToHide4.style.display = 'block';
  } else if (num === 5) {
    getHide(z)
    contentToHide5.style.display = 'block';
  }
  // else if(num === 6){
  //     getHide(z)
  //     contentToHide6.style.display = 'block';
  // }
}
let grayBtnText = '車主專區'
//按鈕監聽
btn1.addEventListener('click', (e) => {
  grayBtnText = e.target.textContent
  changeText();
  getNum(btn1);
  showContent(btn1);
  btnStylingTogglerToLightL(btn1, btn2, btn3, btn4, btn5);
  ctrBtnBg();
});
btn2.addEventListener('click', (e) => {
  grayBtnText = e.target.textContent;
  changeText();
  getNum(btn2);
  showContent(btn2);
  btnStylingTogglerToLightL(btn2, btn1, btn3, btn4, btn5);
  ctrBtnBg();
});
btn3.addEventListener('click', (e) => {
  grayBtnText = e.target.textContent;
  changeText();
  getNum(btn3);
  showContent(btn3);
  btnStylingTogglerToLightL(btn3, btn2, btn1, btn4, btn5);
  ctrBtnBg();
});
btn4.addEventListener('click', (e) => {
  grayBtnText = e.target.textContent;
  changeText();
  getNum(btn4);
  showContent(btn4);
  btnStylingTogglerToLightL(btn4, btn2, btn3, btn1, btn5);
  ctrBtnBg();
});
btn5.addEventListener('click', (e) => {
  grayBtnText = e.target.textContent;
  changeText();
  getNum(btn5);
  showContent(btn5);
  btnStylingTogglerToLightL(btn5, btn2, btn3, btn4, btn1);
  ctrBtnBg();
});
btn11.addEventListener('click', () => {
  getParkValue = btn11.value;
  getLikePark(saveLikePark, getParkValue);
  btnStylingTogglerToLightM(btn11, btn12);
})
btn12.addEventListener('click', () => {
  getParkValue = btn12.value;
  getLikePark(saveLikePark, getParkValue);
  btnStylingTogglerToLightM(btn12, btn11);
})
var windowWidth = window.innerWidth;
btn.addEventListener('click', function () {
  if (btnList.classList.contains('sticky')) {
    btnList.classList.remove('sticky');
  }
});

const changeText = () => {
  change.innerHTML = grayBtnText;
}
const ctrBtnBg = () => {
  btnList.classList.add('sticky');
}
window.addEventListener('resize', function () {
  var windowWidth = window.innerWidth
  if (windowWidth < 780) {
    btnList.classList.add('sticky');
  } else if (windowWidth > 780) {
    btnList.classList.remove('sticky');
  }
});
// btn點擊樣式更動
function btnStylingTogglerToLightL(activeBtn, closeBtn1, closeBtn2, closeBtn3, closeBtn4) {
  closeBtn1.classList.remove('btn-light-solid-l');
  closeBtn1.classList.add('btn-dark-trans-l');
  closeBtn2.classList.remove('btn-light-solid-l');
  closeBtn2.classList.add('btn-dark-trans-l');
  closeBtn3.classList.remove('btn-light-solid-l');
  closeBtn3.classList.add('btn-dark-trans-l');
  closeBtn4.classList.remove('btn-light-solid-l');
  closeBtn4.classList.add('btn-dark-trans-l');
  activeBtn.classList.remove('btn-dark-trans-l');
  activeBtn.classList.add('btn-light-solid-l');
}
//我的收藏盤出視窗
const saveParkModel = document.querySelector('#saveModel')
saveParkModel.addEventListener('show.bs.modal', function (e) {
  const saveButton = e.relatedTarget
  const savePark = saveButton.dataset.bsSavePark
  const saveType = saveButton.dataset.bsSaveType
  const saveAddress = saveButton.dataset.bsSaveAddress
  const saveSpace = saveButton.dataset.bsSaveSpace
  const saveIn = saveButton.dataset.bsSaveIn
  const park = saveParkModel.querySelector('#park')
  const type = saveParkModel.querySelector('#type')
  const address = saveParkModel.querySelector('#address')
  const space = saveParkModel.querySelector('#space')
  const inOrOut = saveParkModel.querySelector('#in')
  park.textContent = savePark
  type.textContent = saveType
  address.textContent = saveAddress
  space.textContent = saveSpace
  inOrOut.textContent = saveIn
})
//交易紀錄提示框
const TradToDelete = document.querySelector('#deleteTrad');
TradToDelete.addEventListener('show.bs.modal', function (event) {
  const button = event.relatedTarget;
  const tradId = button.dataset.bsTradId;
  const tradText = TradToDelete.querySelector('#deleteTradText')
  tradText.textContent = tradId;
})
//預約紀錄提示框
const deleteAppointmentModel = document.querySelector('#deleteReserve')
deleteAppointmentModel.addEventListener('show.bs.modal', function (p) {
  const AppointmentButton = p.relatedTarget
  const getAppointment = AppointmentButton.dataset.bsTradId
  const text = deleteAppointmentModel.querySelector('#deleteReserveText')
  text.textContent = getAppointment
})
//更改密碼按鈕監聽
getNewPassword.addEventListener('click', (e) => {
  let passwordV = '';
  const enterV = enterPassword.value
  const reEnterV = reEnterPassword.value
  if (enterV === reEnterV && enterV !== '' && reEnterV !== '') {
    document.querySelector('.Password-warn').style.display = 'none';
    passwordV = enterV
    applyChangePassWord(passwordV)
  } else if (enterV === '' || reEnterV === '') {
    document.querySelector('.Password-warn').style.display = 'block';
  }
})
//更改密碼
const applyChangePassWord = (aa) => {
  axios.patch(UrlWebType + `/600/users/${usersId}`, {
    'password': `${aa}`
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    alert('密碼修改成功')
  }).catch((err) => {
    console, log(err)
  })
}

//取得用戶資料
axios.get(UrlWebType + `/600/users/${usersId}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => {
    let memberData = response.data
    getMemberData(memberData)
  })
  .catch((err) => {
    console.log(err)
  })
// 車主資訊-將會員資料渲染至畫面
const getMemberData = (aa) => {
  let content = `<div class="row mt-5 d-flex justify-content-lg-between gx-5 ps-2 pe-2 pb-5">
    <div class="col-lg-6 col-12">
        <div class="mb-4 row d-flex justify-content-between">
            <label for="inputPassword" class="col-sm-4 col-form-label">姓名</label>
            <div class="col col-sm-8">
                <input class="form-control  bg-white" type="text" value="${aa.username}" aria-label="Disabled input example" disabled readonly>
            </div>
        </div>
        <div class="mb-4 row d-flex justify-content-between">
            <label for="inputPassword" class="col-sm-4 col-form-label">Email</label>
            <div class="col col-sm-8">
                <input class="form-control  bg-white" type="text" value="${aa.email}" aria-label="Disabled input example" disabled readonly>
            </div>
        </div>
            <div class="row g-3 d-flex justify-content-between mb-4">
                <label for="PhoneNumber" class="col-sm-4 col-form-label">手機號碼</label>
                <div class="col d-flex">
                    <select class="form-select form-select-md mb-3 py-1" aria-label=".form-select-lg example" style="width: fit-content">
                        <option class="text-5" selected>+ 886</option>
                        <option value="1">+ 007</option>
                        <option value="2">+ 125</option>
                        <option value="3">+ 789</option>
                    </select>
                    <div class="ms-3">
                        <input class="form-control bg-white py-1" type="text" value="" aria-label="Disabled input example" disabled readonly>
                    </div>
                </div>
            </div>
        </form>
        <div class="changePassWord d-flex justify-content-between mb-4">
                <label for="inputPassword" class="col-sm-4 col-form-label">密碼</label>
                <div class="col col-sm-8 d-flex align-items-center">
                    <label for="" class=""><a href="" class="fw-bold text-decoration-none ps-2" data-bs-toggle="modal" data-bs-target="#changePass">更改密碼</a></label>
                </div>
        </div>
    </div>
    <div class="col-lg-6 col-12">
        <div class="mb-4 row d-flex justify-content-between">
            <label for="inputPassword" class="col-sm-4 col-form-label">車牌號碼</label>
            <div class="col col-sm-8">
                <input class="form-control  bg-white" type="text" value="${aa.carId}" aria-label="Disabled input example" disabled readonly>
            </div>
        </div>
        <div class="changePassWord d-flex justify-content-between mb-4">
            <label for="inputPassword" class="col-sm-4 col-form-label">信用卡</label>
            <div class="col col-sm-8 d-flex align-items-center">
                <label for="" class=""><a href="#" class="fw-bold text-decoration-none ps-2">新增信用卡</a></label>
            </div>
      </div>
      <div class="row g-3 d-flex justify-content-between mb-4">
        <label for="inputPassword" class="col-4 col-form-label">信用卡資訊</label>
            <div class="col col-sm-8 d-flex">
                <select class="form-select form-select-md mb-3 py-1" aria-label=".form-select-lg example">
                    <option class="text-5" selected>EASY  **** **** **** 1234</option>
                    <option value="1">EASY  **** **** **** 5147</option>
                    <option value="2">EASY  **** **** **** 8457</option>
                    <option value="3">EASY  **** **** **** 5147</option>
                </select>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col d-flex justify-content-end" style="margin-top: 50px;">
            <button type="button" class="btn btn-light-gray px-4">取消</button>
            <button type="button" class="btn btn-light-solid-m ms-4 px-4">確認送出</button>
        </div>
    </div>
</div>`
  contentToHide.innerHTML = content;

  const greetName = document.querySelector('#greetName');
  greetName.textContent = aa.username;
}
//leaflet語法
var map = L.map('map').setView([24.162139, 120.647021], 11);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
var greyIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

//將資料渲染到地圖上
// 在创建地图后，将图层保存到一个变量中
var markersLayer = L.layerGroup().addTo(map);

const dataToMap = (aa) => {
  markersLayer.clearLayers();
  for (let i = 0;i < aa.length;i++) {
    let dataDetail = aa[i]
    let marker;
    locatedX = dataDetail.location.latitude
    locatedY = dataDetail.location.longitude
    if (dataDetail.space === '0' && dataDetail.parkName === "路邊停車格") {
      marker = L.marker([locatedX, locatedY], { icon: greyIcon })
        .bindPopup(`<div class="card mt-3" style="width: 16rem;">
      <div class="card-body">
          <div class="d-flex justify-content-between">
              <h5 class="card-title">${dataDetail.parkName}</h5>
              <i class="save-like bi bi-suit-heart-fill" data-some-value="${dataDetail.location.latitude}"></i>
          </div>
          <div class="row">
              <div class="col-5">地址:</div>
              <div class="col-7">${dataDetail.address}</div>
          </div>
          <div class="row">
              <div class="col-5">剩餘空位:</div>
              <div class="col-7">${dataDetail.space}</div>
          </div>
          <div class="d-flex justify-content-end">
          <button id="detailBtn" type="button" class="btn btn-sm btn-light-gray px-3 py-1" data-bs-toggle="modal" data-bs-target="#saveModel" data-bs-save-park="${dataDetail.parkName}" data-bs-save-type="${dataDetail.type}" data-bs-save-address="${dataDetail.address}" data-bs-save-space="${dataDetail.space}" data-bs-save-in="${dataDetail.height}">詳細資料</button>
              <button type="button" class="btn btn-sm btn-light-gray px-3 py-1 d-none">長期方案</button>
          </div>
      </div>
  </div>`);
    }else if(dataDetail.space === '0' && dataDetail.parkName !== "路邊停車格") {
      marker = L.marker([locatedX, locatedY], { icon: greyIcon })
        .bindPopup(`<div class="card mt-3" style="width: 16rem;">
      <div class="card-body">
          <div class="d-flex justify-content-between">
              <h5 class="card-title">${dataDetail.parkName}</h5>
              <i class="save-like bi bi-suit-heart-fill" data-some-value="${dataDetail.location.latitude}"></i>
          </div>
          <div class="row">
              <div class="col-5">地址:</div>
              <div class="col-7">${dataDetail.address}</div>
          </div>
          <div class="row">
              <div class="col-5">剩餘空位:</div>
              <div class="col-7">${dataDetail.space}</div>
          </div>
          <div class="d-flex justify-content-between">
          <button id="detailBtn" type="button" class="btn btn-sm btn-light-gray px-3 py-1" data-bs-toggle="modal" data-bs-target="#saveModel" data-bs-save-park="${dataDetail.parkName}" data-bs-save-type="${dataDetail.type}" data-bs-save-address="${dataDetail.address}" data-bs-save-space="${dataDetail.space}" data-bs-save-in="${dataDetail.height}">詳細資料</button>
              <button type="button" class="btn btn-sm btn-light-gray px-3 py-1">長期方案</button>
          </div>
      </div>
  </div>`);
    } else if (dataDetail.space !== '0' && dataDetail.parkName === "路邊停車格") {
      marker = L.marker([locatedX, locatedY], { icon: greenIcon })
        .bindPopup(`<div class="card mt-3" style="width: 16rem;">
      <div class="card-body">
          <div class="d-flex justify-content-between">
              <h5 class="card-title">${dataDetail.parkName}</h5>
              <i class="save-like bi bi-suit-heart-fill" data-some-value="${dataDetail.location.latitude}"></i>
          </div>
          <div class="row">
              <div class="col-5">地址:</div>
              <div class="col-7">${dataDetail.address}</div>
          </div>
          <div class="row">
              <div class="col-5">剩餘空位:</div>
              <div class="col-7">${dataDetail.space}</div>
          </div>
          <div class="d-flex justify-content-between">
          <button id="detailBtn" type="button" class="btn btn-sm btn-light-gray px-3 py-1" data-bs-toggle="modal" data-bs-target="#saveModel" data-bs-save-park="${dataDetail.parkName}" data-bs-save-type="${dataDetail.type}" data-bs-save-address="${dataDetail.address}" data-bs-save-space="${dataDetail.space}" data-bs-save-in="${dataDetail.height}">詳細資料</button>
              <button type="button" class="btn btn-sm btn-light-gray px-3 py-1 d-none">長期方案</button>
          </div>
      </div>
  </div>`);
    } else if (dataDetail.space !== '0' && dataDetail.parkName !== "路邊停車格") {
      marker = L.marker([locatedX, locatedY], { icon: greenIcon })
        .bindPopup(`<div class="card mt-3" style="width: 16rem;">
      <div class="card-body">
          <div class="d-flex justify-content-between">
              <h5 class="card-title">${dataDetail.parkName}</h5>
              <i class="save-like bi bi-suit-heart-fill" data-some-value="${dataDetail.location.latitude}"></i>
          </div>
          <div class="row">
              <div class="col-5">地址:</div>
              <div class="col-7">${dataDetail.address}</div>
          </div>
          <div class="row">
              <div class="col-5">剩餘空位:</div>
              <div class="col-7">${dataDetail.space}</div>
          </div>
          <div class="d-flex justify-content-between">
          <button id="detailBtn" type="button" class="btn btn-sm btn-light-gray px-3 py-1" data-bs-toggle="modal" data-bs-target="#saveModel" data-bs-save-park="${dataDetail.parkName}" data-bs-save-type="${dataDetail.type}" data-bs-save-address="${dataDetail.address}" data-bs-save-space="${dataDetail.space}" data-bs-save-in="${dataDetail.height}">詳細資料</button>
              <button type="button" class="btn btn-sm btn-light-gray px-3 py-1">長期方案</button>
          </div>
      </div>
  </div>`);
    }
    markersLayer.addLayer(marker);
  }
}
//將取得的本地端值加入saveLikePark
const parsedLocalParkData = () => {
  if (localParkData === null) {
    saveLikePark = [];
  } else {
    let ss = localParkData.split(',').map(parseFloat);
    saveLikePark.push(...ss)
  }
}
parsedLocalParkData()
//取得所有停車場資料
let data = [];
const getMapData = () => {
  axios.get(UrlWebType + '/parks?_expand=road')
    .then((response) => {
      data = response.data
      getLikePark(saveLikePark, getParkValue)
    }).catch((err) => {
      console.log(err)
    })
}
getMapData()
//取得全部停車場資料中與收藏停車場資料相符
const getLikePark = (aa, bb) => {
  let mapDataFilterA = [];
  let str = '';
  aa.forEach((item) => {
    let mapDataFilter = data.filter((elm) => {
      return (elm.location.latitude === item) && (elm.categoryId === bb)
    })
    mapDataFilterA.push(...mapDataFilter)
  })
  //渲染我的收藏至畫面
  mapDataFilterA.forEach((item) => {
    let additionalClass = (item.parkName === "路邊停車格") ? 'd-none' : '';
    let content = `<div class="card mt-3" style="width: 16rem;">
        <div class="card-body">
            <div class="d-flex justify-content-between">
                <h5 class="card-title">${item.parkName}</h5>
                <i class="save-like bi bi-suit-heart-fill" data-some-value="${item.location.latitude}"></i>
            </div>
            <div class="row">
                <div class="col-5">地址:</div>
                <div class="col-7">${item.address}</div>
            </div>
            <div class="row">
                <div class="col-5">剩餘空位:</div>
                <div class="col-7">${item.space}</div>
            </div>
            <div class="d-flex justify-content-end">
            <button id="detailBtn" type="button" class="btn btn-sm btn-light-gray px-3 py-1" data-bs-toggle="modal" data-bs-target="#saveModel" data-bs-save-park="${item.parkName}" data-bs-save-type="${item.type}" data-bs-save-address="${item.address}" data-bs-save-space="${item.space}" data-bs-save-in="${item.height}" data-btnId="${item.location.latitude}">詳細資料</button>
                <button type="button" class="btn btn-sm btn-light-gray px-3 py-1 ${additionalClass}" data-btnId="${item.location.latitude}">長期方案</button>
            </div>
        </div>
    </div>`
    str += content
  })
  showMapCard.innerHTML = str
  plusLike(mapDataFilterA)
  dataToMap(mapDataFilterA)
}
//監聽愛心按鈕
showMapCard.addEventListener('click', (e) => {
  let btnValue = e.target.getAttribute('data-some-value')
  removeLikePark(saveLikePark, btnValue)
  localStorage.setItem('likePark', saveLikePark);
  getLikePark(saveLikePark, getParkValue)
})
//將收藏停車場愛心換成紅色
const plusLike = (aa) => {
  const saveLikes = document.querySelectorAll('.save-like[data-some-value]');
  aa.forEach((item) => {
    let locatedId = item.location.latitude;
    for (let i = 0;i < saveLikePark.length;i++) {
      if (locatedId === saveLikePark[i]) {
        let saveLikeElement = saveLikePark[i];
        for (let x = 0;x < saveLikes.length;x++) {
          if (saveLikeElement.toString() === saveLikes[x].getAttribute('data-some-value')) {
            saveLikes[x].classList.add('bi-suit-heart-broke');
          }
        }
      }
    }
  });
};
//刪除收藏停車場
const removeLikePark = (cc, dd) => {
  const removeInd = cc.findIndex((item) => {
    return item.toString() === dd;
  });
  if (removeInd !== -1) {
    cc.splice(removeInd, 1);
  }
};
//將交易紀錄渲染至畫面上
const order = localStorage.getItem('orderDetail')
const orderDetail = JSON.parse(order)
const tradingHistory = document.querySelector('#tradingHistory')

const showOrderDeal = (aa) => {
  let pay;
  let str = ''
  aa.forEach(item => {
    pay = item.paymentStatus ? '已付款' : '未付款';
    str += `<tr>
    <td scope="row" class="py-4">${item.orderId}</td>
    <td class="py-4">${item.inTime}</td>
    <td class="py-4">${item.outTime}</td>
    <td class="py-4">${item.planData}</td>
    <td class="py-4">
      ${item.totalCharge}
    </td>
    <td class="py-4">${item.paymentMethod}</td>
    <td class="py-4">${pay}</td>
    <td class="text-end pe-4 py-4">
        <div class="btn-group">
            <button class="btn btn-sm btn-outline-dark dropdown-toggle"
                type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"
                aria-expanded="false">
                操作
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" href="#">修改狀態</a></li>
                <li><a class="dropdown-item text-danger" href="#"
                        data-bs-toggle="modal" data-bs-target="#deleteTrad"
                        data-bs-trad-id="${item.orderId}">刪除訂單</a></li>
            </ul>
        </div>
    </td>
</tr>`
  })
  tradingHistory.innerHTML = str
}
showOrderDeal(orderDetail)

//完成編輯(刪除)交易紀錄
const deleteTradText = document.querySelector('#deleteTradText')
const deleteTradBtn = document.querySelector('#deleteTradBtn')

deleteTradBtn.addEventListener('click', (e) => {
  let deleteId = deleteTradText.textContent;
  let num = orderDetail.findIndex(item => item.orderId === deleteId);
  orderDetail.splice(num, 1)
  localStorage.setItem('orderDetail', JSON.stringify(orderDetail))
  showOrderDeal(orderDetail)
})


// 2.渲染預約紀錄到畫面上
const reserve = localStorage.getItem('finalDataAll')
const reserveLocal = JSON.parse(reserve)
const reserveHistory = document.querySelector('#reserveHistory')
const showReserveDetail = (bb) => {
  let str = ''
  bb.forEach(item => {
    str += `<tr>
    <td scope="row" class="py-4">${item.reserveId}</td>
    <td class="py-4">${item.inTime}</td>
    <td class="py-4">${item.outTime}</td>
    <td class="py-4">${item.plan}</td>
    <td class="py-4">${item.parkName}</td>
    <td class="py-4">${item.address}</td>
    <td class="text-end pe-4 py-4">
        <div class="btn-group">
            <button class="btn btn-sm btn-outline-dark dropdown-toggle"
                type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"
                aria-expanded="false">
                操作
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" href="#">修改狀態</a></li>
                <li><a class="dropdown-item text-danger" href="#"
                        data-bs-toggle="modal" data-bs-target="#deleteReserve"
                        data-bs-trad-id="${item.reserveId}">刪除訂單</a></li>
            </ul>
        </div>
    </td>
</tr>`
  })
  reserveHistory.innerHTML = str
}
showReserveDetail(reserveLocal)
//刪除預約紀錄
const deleteReserveBtn = document.querySelector('#deleteReserveBtn')
const deleteReserveText = document.querySelector('#deleteReserveText')

deleteReserveBtn.addEventListener('click', () => {
  let deleteId = deleteReserveText.textContent;
  let num = reserveLocal.findIndex(item => item.reserveId === deleteId)
  reserveLocal.splice(num, 1)
  localStorage.setItem('finalDataAll', JSON.stringify(reserveLocal))
  showReserveDetail(reserveLocal)
})

// 我的收藏-地圖按鈕樣式切換
function btnStylingTogglerToLightM(activeBtn, closeBtn) {
  closeBtn.classList.remove('btn-light-solid-m');
  closeBtn.classList.add('btn-dark-trans-m');
  closeBtn.classList.add('color-white');
  activeBtn.classList.remove('btn-dark-trans-m');
  activeBtn.classList.remove('color-white');
  activeBtn.classList.add('btn-light-solid-m');
}

// 我的收藏-按鈕modal連結往長期方案
const modalBtnContainer = document.querySelector('#modalBtnContainer');
modalBtnContainer.addEventListener('click',e => {
  e.preventDefault();
  window.location.href='planSelection.html';
})

// 儲值專區
const storageCheckoutBtn = document.querySelector('#storageCheckout');
const storageCheckoutCancelBtn = document.querySelector('#storageCheckoutCancel');
storageCheckoutBtn.addEventListener('click', e => {
  e.preventDefault();
  Swal.fire({
    icon: "warning",
    title: "尚未開放儲值功能",
    timer: 1500
  });
})