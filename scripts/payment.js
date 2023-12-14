let nowPageId = 'page1';

// 換頁顯示
const paymentMethods = document.querySelectorAll('.payment-method-group');
paymentMethods.forEach(method => {
  method.addEventListener('click',e => {
    nowPageId = e.target.dataset.page;
    pageChange(e.target.dataset.page);

    if (nowPageId === 'page4'){
      supermarketDetails();
    }
  })
});

const allPages = document.querySelectorAll('.payment-content-page');
function pageChange(id){
  allPages.forEach(page => {
    const selectedPage = document.getElementById(id);
    if(page.id === id){
      selectedPage.style.display = 'block';
    }else{
      page.style.display = 'none';
    }
  })
};

// 產出訂單摘要
const showSummaryBtns = document.querySelectorAll('[data-showSummaryBtn]');
const OrderSummary = document.querySelector('#OrderSummary');

// 監聽結帳按鈕
showSummaryBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    // 信用卡-驗證
    if (nowPageId === 'page1'){
      const creditCardForm = document.querySelector('.payment-creditCard-input-container');
      // 驗證限制條件
      const constraints = {
        name: {
          presence: { message: "必填" }
        },
        cardnumber: {
          presence: { message: "必填" },
          length: {
            is: 19,
            message: "信用卡須為16碼"
          }
        },
        expirationdate: {
          presence: { message: "必填" },
          length: {
            is: 5,
            message: "日期須為4碼"
          }
        },
        securitycode: {
          presence: { message: "必填" }
        }
      };
      // 回傳錯誤
      const errors = validate(creditCardForm, constraints);
      // 取得全部輸入框
      const inputs = document.querySelectorAll("input[type=text]");
      inputs.forEach((item) => {
        // 取得輸入框的下一個元素
        // 清空所有錯誤提示 
        item.nextElementSibling.textContent = '';

        if (errors) {
          // Object.keys(errors) 取得errors的所有屬性
          Object.keys(errors).forEach(key => {
            // 用 input name屬性的值、p data-msg屬性的值來找對應項目
            document.querySelector(`p[data-msg=${key}]`).textContent = errors[key];
          })
        };
      });

      // 如果表單驗證未通過，不繼續結帳流程
      if (errors) return
    };

    // 同意相關資訊按鈕-驗證
    const agreeCheckbox = document.querySelector(`[data-page${nowPageId[4]*1}]`);
    if(agreeCheckbox.checked){
      agreeCheckbox.nextElementSibling.textContent = '';
    } else if (!agreeCheckbox.checked){
      agreeCheckbox.nextElementSibling.textContent = '未勾選';
      return
    }

    storeOrderInfo();
    
    // 通知結帳成功
    Swal.fire({
      title: "付款成功",
      icon: "success"
    })
    .then(res => {
      // 顯示訂單摘要
      OrderSummary.style.display = 'flex';
      
      const orderSummaryPlan = document.querySelector('[data-orderSummaryPlan]');
      const orderSummaryEntryTime = document.querySelector('[data-orderSummaryEntryTime]');
      const orderSummaryExitTime = document.querySelector('[data-orderSummaryExitTime]');

      orderSummaryPlan.textContent = localStorage.getItem('chosePlan');
      orderSummaryEntryTime.textContent = localStorage.getItem('entryTime');
      orderSummaryExitTime.textContent = localStorage.getItem('exitTime');
      
      // 監聽訂單摘要按鈕 - 前往車主專區
      const goCarOwnerPageBtn = document.querySelector('[data-goCarOwnerPage]');
      goCarOwnerPageBtn.addEventListener('click', e => {
        e.preventDefault();
        // 換頁
        window.location.href = 'carOwner.html';
      });
    })
  })
});

// 超商代碼
// 產出超商繳款資訊
function supermarketDetails(){
  const supermarketPageContainer = document.querySelector('.payment-supermarket-container');
  const detailsContainer = document.querySelector('.payment-supermarket-details-container');
  const showDetailsBtn = document.querySelector('[data-showDetailsBtn]');
  
  showDetailsBtn.addEventListener('click', e => {
    e.preventDefault();
    
    // 同意相關資訊按鈕-驗證
    const agreeCheckbox = document.querySelector(`[data-page4]`);
    if (agreeCheckbox.checked) {
      agreeCheckbox.nextElementSibling.textContent = '';
    } else if (!agreeCheckbox.checked) {
      agreeCheckbox.nextElementSibling.textContent = '未勾選';
      return
    }

    storeOrderInfo();

    Swal.fire({
      title: "訂單成立",
      icon: "success"
    }).then(res => {
      // 取得明細資料
      const orderId = document.querySelector('#supermarketOrderId');
      const orderPlan = document.querySelector('#supermarketChosePlan');
      const paymentDeadline = document.querySelector('#supermarketPaymentDeadline');

      orderId.textContent = localStorage.getItem('orderId');
      orderPlan.textContent = localStorage.getItem('chosePlan');
      // 繳費期限: 入場日期
      paymentDeadline.textContent = localStorage.getItem('entryTime');

      // 顯示明細
      detailsContainer.style.display = 'block';
      supermarketPageContainer.style.display = 'none';
    })
  })
}

// 儲存訂單資料到localStorage
function storeOrderInfo(){
  const orderNum = generateOrderNumber();
  const paymentMethod = nowPageId[4] === '1' ? "信用卡" : nowPageId[4] === '2' ? "網路ATM" : nowPageId[4] === 3 ? "ATM櫃員機" : "超商代碼";
  const paymentStatus = nowPageId[4] === '1' ? true : nowPageId[4] === '2' ? true : false;
  localStorage.setItem('orderId', orderNum);
  localStorage.setItem('paymentMethod', paymentMethod); 
  // 信用卡跟網路ATM付款狀態預設為true，其二為false
  localStorage.setItem('paymentStatus', paymentStatus); 
}

// 產出隨機訂單編號
function generateOrderNumber() {
  const timestamp = Date.now();
  // 將時間轉為字串，只取前面的一部分作為訂單編號的前綴
  const timePrefix = timestamp.toString().slice(0, 6);

  // 定義可能的字符
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  // 訂單編號的長度
  const orderNumberLength = 4;

  // 生成隨機訂單編號
  let orderNumber = timePrefix;
  for (let i = 0;i < orderNumberLength;i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    orderNumber += characters.charAt(randomIndex);
  }

  return orderNumber;
}