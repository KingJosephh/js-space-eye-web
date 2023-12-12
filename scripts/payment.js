let nowPageId = 'page1';
// 換頁顯示
const paymentMethods = document.querySelectorAll('.payment-method-group');
paymentMethods.forEach(method => {
  method.addEventListener('click',e => {
    nowPageId = e.target.dataset.page;
    pageChange(e.target.dataset.page);
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
      
      // 監聽訂單摘要按鈕 - 訂單資料上傳、前往車主專區
      const goCarOwnerPageBtn = document.querySelector('[data-goCarOwnerPage]');
      goCarOwnerPageBtn.addEventListener('click',e => {
        e.preventDefault();
        postOrder();
        // window.location.href = 'carOwnerNew.html';
      });
    })
  })
});

// 訂單資料上傳
// function postOrder() { 
//   axios.post(Url + '/users', {
//     // 注意連結指向
//   }).then
// }
