const UrlWebType = 'https://space-eye-web-surver.onrender.com'
const optionPark = localStorage.getItem('optionPark');
const detailsCard = document.querySelector('#detailsCard');
let data = [];
let getSpaceDetails = [];

// 辨識是否登入，未登入跳往'登入頁面'
axios.get(Url + `/600/users/${usersId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    // console.log(response);
  })
  .catch((error) => {
    // console.log(error);
    Swal.fire({
      icon: "error",
      title: "尚未登入",
      text: "請前往登入，開通預約車位功能"
    }).then(res=>{
      window.location.href = "/Pages/login.html";
    })
  });

//取得地圖資料
axios.get(Url + '/parks?_expand=road')
  .then(function (response) {
    data = response.data
    getFindSpace(data)
    cardBody()
    // console.log(getFindSpace)
  }).catch(function (err) {
    console.log(err)
  })
//選出預約的停車場資料
const getFindSpace = (aa) => {
  getSpaceDetails = aa.filter((item) => {
    if (item.location.latitude == optionPark) {
      return item
    }
  })
}
//將停車場資訊渲染到畫面上
const cardBody = () => {
  // console.log(getSpaceDetails)
  let Card = `<thead>
                <tr>
                  <th scope="col" class="fs-6">停車場資訊</th>
                  <th scope="col" class="fs-6">地址</th>
                  <th scope="col" class="fs-6">室內/室外</th>
                  <th scope="col" class="fs-6">車格種類</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Account">${getSpaceDetails[0].parkName}</td>
                  <td data-label="Account">${getSpaceDetails[0].address}</td>
                  <td data-label="Account">${getSpaceDetails[0].inOrOut}</td>
                  <td data-label="Account">${getSpaceDetails[0].type}</td>
                </tr>
              </tbody>`
  detailsCard.innerHTML = Card;
}

// 方案點擊後樣式
// var btn = document.getElementById("next");
function select(el, left) {
  var plan = el.id;
  if (!plan) {
    btn.disabled = false;
  }

  Array.from(el.parentElement.children).forEach(function (child) {
    child.classList.remove("plan-active");
  });

  el.classList.add("plan-active");

  /* switch (plan) {
    case "monthPlan":
      btn.innerHTML = "每月停車";
      break;
    case "weekPlan":
      btn.innerHTML = "每週停車";
      break;
    case "dayPlan":
      btn.innerHTML = "單次停車";
      break;
    case "yearPlan":
      btn.innerHTML = "每年停車";
      break;
    default:
      btn.innerHTML = "請選擇停車方案";
  } */
}

// 抓進出場資料
document.getElementById("entryDate").addEventListener("change", updateOrderSummary);
document.getElementById("exitDate").addEventListener("change", updateOrderSummary);

function updateOrderSummary() {
  const entryDate = document.getElementById("entryDate").value;
  const exitDate = document.getElementById("exitDate").value;
  const url = `/Pages/planSelection.html`;

  axios.get(url)
    .then(response => {
      const entryTimeText = `${entryDate}`;
      const exitTimeText = `${exitDate}`;

      document.getElementById('entryTime').getElementsByTagName("span")[0].textContent = entryTimeText;
      document.getElementById('exitTime').getElementsByTagName("span")[0].textContent = exitTimeText;
      localStorage.setItem("entryTime", entryTimeText)
      localStorage.setItem("exitTime", exitTimeText)
    })
    .catch(error => {
      console.log("Error fetching data:", error);
    })
}

// 抓取方案資料
document.getElementById("monthPlan").addEventListener("click", () => updatePlanSummary('monthPlan'));
document.getElementById("weekPlan").addEventListener("click", () => updatePlanSummary('weekPlan'));
document.getElementById("yearPlan").addEventListener("click", () => updatePlanSummary('yearPlan'));
document.getElementById("dayPlan").addEventListener("click", () => updatePlanSummary('dayPlan'));

function updatePlanSummary(planId) {
  const selectedPlan = document.getElementById(planId);
  const servalUrl = `/Pages/planSelection.html`;

  const planText = `${selectedPlan.querySelector('[class="h4"]').textContent} - ${selectedPlan.querySelector('[class="plan-price"]').textContent}`;

  axios.get(servalUrl, {
    params: {
      planId: planId,
      planText: planText
    }
  })
    .then(response => {
      document.querySelector('[data-orderSummaryPlan]').textContent = planText;
      localStorage.setItem('chosePlan', planText);
    })
    .catch(error => {
      console.log("Error fetching data:", error);
    })
}



// 方案選擇-確認送出按鈕-日期選擇驗證
var submitPlanBtn = document.querySelector("[data-submitPlan]");
submitPlanBtn.addEventListener("click", function () {
  var entryDateValue = document.getElementById("entryDate").value;
  var exitDateValue = document.getElementById("exitDate").value;

  if (!entryDateValue && !exitDateValue) {
    Swal.fire({
      title: "入場日期和離場日期未選擇",
      text: "請重新選擇",
      icon: "question"
    });
  } else {
    showWatermark();
    return true;
  }
})

// 跳出訂單摘要
function showWatermark() {
  document.querySelector(".watermark").style.display = "flex";
}

// 關閉訂單摘要 按鈕
var closeButton = document.querySelector(".bi-x-circle");

closeButton.addEventListener("click", function () {
  var elementToClose = document.getElementById("elementToClose")
  elementToClose.style.display = "none";
})

// 訂單摘要-前往結帳按鈕
var paymentButton = document.querySelector(".btn-payment");

paymentButton.addEventListener("click", function () {
  window.location.href = "payment.html";
})

// 訂單摘要-取消按鈕
var orderSummaryCancelBtn = document.querySelector("[data-orderSummaryCancel]");

orderSummaryCancelBtn.addEventListener("click", function () {
  var elementToClose = document.getElementById("elementToClose")
  elementToClose.style.display = "none";
})

// 方案選擇-取消按紐：跳回找車位頁面
var cancelSubmitPlanBtn = document.querySelector("[data-cancelSubmitPlan]");
cancelSubmitPlanBtn.addEventListener("click", function () {
  window.location.href = "../findSpace.html";
})

// 确保 optionPark 不为空
if (optionPark) {
  console.log('Received optionPark in another page:', optionPark);
} else {
  console.log('No optionPark data available.');
}

