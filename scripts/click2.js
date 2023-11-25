
// 動態方案選擇
var btn = document.getElementById("next");

function select(el, left) {
    var plan = "";
    if (!plan) {
        btn.disabled = false;
    }

    Array.from(el.parentElement.children).forEach(function (child) {
        child.classList.remove("plan-active");
    });

    el.classList.add("plan-active");

    if (left) {
        el.parentElement.children[2].classList.remove("plan-active");
        btn.innerHTML = "每週停車";
    } else if (el.nextElementSibling) {
        el.nextElementSibling.classList.remove("plan-active");
        btn.innerHTML = "每月停車";
    } else if (el.previousElementSibling) {
        el.previousElementSibling.classList.remove("plan-active");
        btn.innerHTML = "每年停車";
    }
}

// 抓進出場資料
document.getElementById("entryDate").addEventListener("change", updateOrderSummary);
document.getElementById("exitDate").addEventListener("change", updateOrderSummary);

function updateOrderSummary() {
    const entryDate = document.getElementById("entryDate").value;
    const exitDate = document.getElementById("exitDate").value;
    const url = `http://127.0.0.1:5501/Pages/parkingDetail.html`;

    axios.get(url)
         .then(response => {
            const entryTimeText = `${entryDate}`;
            const exitTimeText = `${exitDate}`;

            document.getElementById('entryTime').getElementsByTagName("span")[0].textContent = entryTimeText;
            document.getElementById('exitTime').getElementsByTagName("span")[0].textContent = exitTimeText;
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
    window.location.href = "parkingDetail.html";
})

// 跳回找車位
var canelButton = document.querySelector(".btn-secondary");

canelButton.addEventListener("click", function() {
    window.location.href = "../index.html";
})