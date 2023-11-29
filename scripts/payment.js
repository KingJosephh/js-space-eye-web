window.addEventListener('DOMContentLoaded', (event) => {
    const button1 = document.getElementById("button1");
    const button2 = document.getElementById("button2");
    const button3 = document.getElementById("button3");
    const button4 = document.getElementById("button4");
    const button5 = document.getElementById("button5");
    const summaryButton = document.getElementById("showWatermarkBtn");
    const summaryWindow = document.getElementById("elementToClose"); 

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
    
    // 檢查是否填寫信用卡卡號
    summaryButton.addEventListener("click", (event) => {
      const cardNumber = document.getElementById("cardnumber").value;
      const expirationDate = document.getElementById("expirationdate").value;
      const securityCode = document.getElementById("securitycode").value;

      if (cardNumber && expirationDate && securityCode) {
        document.getElementById("cardData").textContent = "信用卡資料是否填寫: 是";
        
        // 顯示訂單摘要視窗
        summaryWindow.style.display = "block";
      } else {
        document.getElementById("cardData").textContent = "信用卡資料是否填寫: 否";
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


