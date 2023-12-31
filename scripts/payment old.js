window.addEventListener('DOMContentLoaded', (event) => {
    const button1 = document.getElementById("button1");
    const button2 = document.getElementById("button2");
    const button3 = document.getElementById("button3");
    const button4 = document.getElementById("button4");
    const button5 = document.getElementById("button5");

    // 前往網路ATM按扭
    const paymentButton = document.querySelector(".btn-payment");
    const summaryButton = document.getElementById("showWatermarkBtn");
    const summaryWindow = document.getElementById("elementToClose"); 
    // 前往車主專區按扭
    const cardButton2 = document.getElementById("button6");
    // 儲存選擇銀行資料
    const bankSelect = document.getElementById("bankSelect");
    const showBankDataBtn2 = document.getElementById("showWatermarkBtn2");
    const showBankDataBtn3 = document.getElementById("showWatermarkBtn3");

    function showPage(pageId, pagesClass) {
        const allPages = document.querySelectorAll(`.${pagesClass}`);
        allPages.forEach((page) => {
            page.style.display = page.id === pageId ? "block" : "none";
        });

        const selectedPage = document.getElementById(pageId);
        if (selectedPage) {
            selectedPage.style.display = "block";
        }
    }
    
    function generateOrderNumber() {
        var randomOrderNumber = Math.floor(Math.random() * 10000);
        document.getElementById("orderNumber").textContent = randomOrderNumber;
        document.getElementById("orderNumber2").textContent = randomOrderNumber;
        showPage("page5");
        
        // 設定三天內
        var deadlineDate = new Date();
        deadlineDate.setDate(deadlineDate.getDate() + 3);
        var formattedDeadline = deadlineDate.toISOString().slice(0, 19).replace("T", " ");
        document.getElementById("deadlineDate").textContent = formattedDeadline;

        // 取得 localStorage 中的值
        const chosePlanHeader = localStorage.getItem("chosePlan");
        // 顯示進場時間、出場時間和方案選擇
        document.getElementById("chosePlan").textContent = `方案選擇: ${chosePlanHeader}`;

        // 將訊息顯現在訂單方案區域
        const orderPlanElement = document.getElementById("paymoney");
        if (orderPlanElement) {
            orderPlanElement.textContent = chosePlanHeader;
        }
    }

    button1.addEventListener("click", () => {
        showPage("page1", "content-to-hide-owner");
    });

    button2.addEventListener("click", () => {
        showPage("page2", "content-to-hide-owner");
    });

    button3.addEventListener("click", () => {
        showPage("page3", "content-to-hide-owner");
    });

    button4.addEventListener("click", () => {
        showPage("page4", "content-to-hide-owner");
    });

    button5.addEventListener("click", generateOrderNumber);

    document.getElementById("button5").addEventListener("click",function(){
        swal("Success!", "訂單成立!", "success");
    });

    paymentButton.addEventListener("click", () => {
        showPage("page2", "content-to-hide-owner")
        summaryWindow.style.display = "none";
    })

    showBankDataBtn2.addEventListener("click", () => {
        Swal.fire({
            icon: "success",
            title: "付款成功",
            timer: 1500
        }).then(res => {
            summaryWindow.style.display = "flex";
        })
    })
    showBankDataBtn3.addEventListener("click", () => {
        Swal.fire({
            icon: "success",
            title: "付款成功",
            timer: 1500
        }).then(res => {
            summaryWindow.style.display = "flex";
        })
    })
    cardButton2.addEventListener("click", function() {
        window.location.href = "carOwnerNew.html";
    })
    document.getElementById("showWatermarkBtn2").addEventListener("click",function(){
        swal("Success!", "訂單確認成功!", "success");
    });
    // 檢查是否填寫信用卡卡號
    summaryButton.addEventListener("click", (event) => {
      const cardNumber = document.getElementById("cardnumber").value;
      const expirationDate = document.getElementById("expirationdate").value;
      const securityCode = document.getElementById("securitycode").value;

      if (cardNumber && expirationDate && securityCode) {
        
        // 顯示訂單摘要視窗
        summaryWindow.style.display = "flex";

        // 取得 localStorage 中的值
        const entryTimeHeader = localStorage.getItem("entryTime");
        const exitTimeHeader = localStorage.getItem("exitTime");
        const chosePlanHeader = localStorage.getItem("chosePlan");

        // 顯示進場時間、出場時間和方案選擇
        document.getElementById("entryTime").textContent = `進場時間: ${entryTimeHeader}`;
        document.getElementById("exitTime").textContent = `出場時間: ${exitTimeHeader}`;
        document.getElementById("chosePlan").textContent = `方案選擇: ${chosePlanHeader}`;

      } else {
        alert("请填寫完整的信用卡信息！");
    }
});

// 新增關閉按鈕點擊事件處理
const closeButton = document.getElementById("closeBtn");
    closeButton.addEventListener("click", () => {
    // 關閉訂單摘要視窗
    summaryWindow.style.display = "none";
   });
});



