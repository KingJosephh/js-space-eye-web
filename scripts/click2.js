const Url = 'http://localhost:3000'
const UrlWebType = 'https://space-eye-web-surver.onrender.com'
const optionPark = localStorage.getItem('optionPark');
const detailsCard = document.querySelector('#detailsCard')
let data = []
let getSpaceDetails = []

//取得地圖資料
axios.get(Url + '/parks?_expand=road')
.then(function(response){
    data = response.data
    getFindSpace(data)
    cardBody()
    // console.log(getFindSpace)
}).catch(function(err){
    console.log(err)
})
//選出預約的停車場資料
const getFindSpace = (aa) => {
    getSpaceDetails = aa.filter((item) => {
        if(item.location.latitude == optionPark){
           return item
        }
    })
}
//將停車場資訊渲染到畫面上
const cardBody = () => {
    console.log(getSpaceDetails)
    let Card = `<thead>
    <tr>
        <th scope="col">停車場資訊</th>
        <th scope="col">地址</th>
        <th scope="col">室內/室外</th>
        <th scope="col">車格種類</th>
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
// 動態方案選擇
var btn = document.getElementById("next");
function select(el, left) {
    var plan = el.id;
    if (!plan) {
        btn.disabled = false;
    }

    Array.from(el.parentElement.children).forEach(function (child) {
        child.classList.remove("plan-active");
    });

    el.classList.add("plan-active");

    switch (plan) {
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
    }
}

// 抓進出場資料
document.getElementById("entryDate").addEventListener("change", updateOrderSummary);
document.getElementById("exitDate").addEventListener("change", updateOrderSummary);

function updateOrderSummary() {
    const entryDate = document.getElementById("entryDate").value;
    const exitDate = document.getElementById("exitDate").value;
    const url = `http://127.0.0.1:5502/Pages/planSelection.html`;

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
    const servalUrl = `http://127.0.0.1:5502/Pages/planSelection.html`;

    const planText = `${selectedPlan.querySelector('h3').textContent} - ${selectedPlan.querySelector('li:first-child').textContent}`;

    axios.get(servalUrl, {
        params: {
            planId: planId,
            planText: planText
        }
    })
         .then(response => {
            document.getElementById('chosePlan').getElementsByTagName("span")[0].textContent = planText;
            localStorage.setItem("chosePlan", planText);
         })
         .catch(error => {
            console.log("Error fetching data:", error);
         })
}



// 提醒設定
var rightButton = document.querySelector(".btn-primary");

rightButton.addEventListener("click", function() {
    var entryDateValue = document.getElementById("entryDate").value;
    var exitDateValue = document.getElementById("exitDate").value;
    
    if (!entryDateValue && !exitDateValue) {
        alert ("請選擇入場日期和離場日期");
    }else{
        showWatermark();
        return true;
    }
})

// 跳出訂單
function showWatermark() {
    document.querySelector(".watermark").style.display = "block";
}

// 關閉訂單按鈕
var closeButton = document.querySelector(".bi-x-circle");

closeButton.addEventListener("click", function() {
    var elementToClose = document.getElementById("elementToClose")
    elementToClose.style.display = "none";
})

// 前往付款頁面
var paymentButton = document.querySelector(".btn-payment");

paymentButton.addEventListener("click", function() {
    window.location.href = "payment.html";
})

// 關閉訂單按鈕2
var closeButton2 = document.querySelector(".btn-submit");

closeButton2.addEventListener("click", function() {
    window.location.href = "planSelection.html";
})

// 跳回找車位
var canelButton = document.querySelector(".btn-secondary");

canelButton.addEventListener("click", function() {
    window.location.href = "../index.html";
})

// 确保 optionPark 不为空
if (optionPark) {
    console.log('Received optionPark in another page:', optionPark);
} else {
    console.log('No optionPark data available.');
}

