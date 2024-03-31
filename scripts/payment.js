let nowPageId = 'page1';
// const plan = localStorage.getItem('plan');
// const planData = JSON.parse(plan);
// const park = localStorage.getItem('parkDetail');
// const parkDetail = JSON.parse(park);
const order = localStorage.getItem('orderDetail');
const orderDetailLocal = JSON.parse(order);
let orderDetail = {};
let orderDetailAll = [];
const finalData = localStorage.getItem('finalData');
const finalDataLocal = JSON.parse(finalData);
let finalDataAll = [];

if (orderDetailLocal !== null) {
  for (let i = 0; i < orderDetailLocal.length; i++) {
    orderDetailAll.push(orderDetailLocal[i]);
  }
}
if (finalDataLocal !== null) {
  for (let i = 0; i < finalDataLocal.length; i++) {
    finalDataAll.push(finalDataLocal[i]);
  }
  localStorage.setItem('finalDataAll', finalDataAll);
}
// 換頁顯示
const paymentMethods = document.querySelectorAll('.payment-method-group');
paymentMethods.forEach((method) => {
  method.addEventListener('click', (e) => {
    nowPageId = e.target.dataset.page;
    if (nowPageId === undefined) return;
    pageChange(e.target.dataset.page);
    if (nowPageId === 'page4') {
      supermarketDetails();
    }
  });
});

const allPages = document.querySelectorAll('.payment-content-page');
function pageChange(id) {
  allPages.forEach((page) => {
    const selectedPage = document.getElementById(id);
    if (page.id === id) {
      selectedPage.style.display = 'block';
    } else {
      page.style.display = 'none';
    }
  });
}

// 產出訂單摘要
const showSummaryBtns = document.querySelectorAll('[data-showSummaryBtn]');
const OrderSummary = document.querySelector('#OrderSummary');

// 監聽結帳按鈕
showSummaryBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    // 信用卡-驗證
    if (nowPageId === 'page1') {
      const creditCardForm = document.querySelector('.payment-creditCard-input-container');
      // 驗證限制條件
      const constraints = {
        name: {
          presence: { message: '必填' },
        },
        cardNumber: {
          presence: { message: '必填' },
          length: {
            is: 19,
            message: '信用卡須為16碼',
          },
        },
        expirationDate: {
          presence: { message: '必填' },
          length: {
            is: 5,
            message: '日期須為4碼',
          },
        },
        securityCode: {
          presence: { message: '必填' },
        },
      };
      // 回傳錯誤
      const errors = validate(creditCardForm, constraints);
      // 取得全部輸入框
      const inputs = document.querySelectorAll('input[type=text]');
      inputs.forEach((item) => {
        // 取得輸入框的下一個元素
        // 清空所有錯誤提示
        item.nextElementSibling.textContent = '';

        if (errors) {
          // Object.keys(errors) 取得errors的所有屬性
          Object.keys(errors).forEach((key) => {
            // 用 input name屬性的值、p data-msg屬性的值來找對應項目
            document.querySelector(`p[data-msg=${key}]`).textContent = errors[key];
          });
        }
      });

      // 如果表單驗證未通過，不繼續結帳流程
      if (errors) return;
    }

    // 同意相關資訊按鈕-驗證
    const agreeCheckbox = document.querySelector(`[data-page${nowPageId[4] * 1}]`);
    if (agreeCheckbox.checked) {
      agreeCheckbox.nextElementSibling.textContent = '';
    } else if (!agreeCheckbox.checked) {
      agreeCheckbox.nextElementSibling.textContent = '未勾選';
      return;
    }

    storeOrderInfo();

    // 通知結帳成功
    Swal.fire({
      title: '付款成功',
      icon: 'success',
    }).then(() => {
      // 顯示訂單摘要
      OrderSummary.style.display = 'flex';

      const orderSummaryPlan = document.querySelector('[data-orderSummaryPlan]');
      const orderSummaryEntryTime = document.querySelector('[data-orderSummaryEntryTime]');
      const orderSummaryExitTime = document.querySelector('[data-orderSummaryExitTime]');

      orderSummaryPlan.textContent = finalDataLocal.plan;
      orderSummaryEntryTime.textContent = finalDataLocal.inTime;
      orderSummaryExitTime.textContent = finalDataLocal.outTime;

      // 監聽訂單摘要按鈕 - 前往車主專區
      const goCarOwnerPageBtn = document.querySelector('[data-goCarOwnerPage]');
      goCarOwnerPageBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // 換頁
        window.location.href = 'carOwner.html';
      });
    });
  });
});

// 超商代碼
// 產出超商繳款資訊
function supermarketDetails() {
  const supermarketPageContainer = document.querySelector('.payment-supermarket-container');
  const detailsContainer = document.querySelector('.payment-supermarket-details-container');
  const showDetailsBtn = document.querySelector('[data-showDetailsBtn]');

  showDetailsBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // 同意相關資訊按鈕-驗證
    const agreeCheckbox = document.querySelector('[data-page4]');
    if (agreeCheckbox.checked) {
      agreeCheckbox.nextElementSibling.textContent = '';
    } else if (!agreeCheckbox.checked) {
      agreeCheckbox.nextElementSibling.textContent = '未勾選';
      return;
    }

    storeOrderInfo();

    Swal.fire({
      title: '訂單成立',
      icon: 'success',
    }).then(() => {
      // 取得明細資料
      const orderNum = generateOrderNumber();
      const orderId = document.querySelector('#supermarketOrderId');
      const orderPlan = document.querySelector('#supermarketChosePlan');
      const paymentDeadline = document.querySelector('#supermarketPaymentDeadline');
      orderId.textContent = orderNum;
      orderPlan.textContent = localStorage.getItem('chosePlan');
      // 繳費期限: 入場日期
      paymentDeadline.textContent = localStorage.getItem('entryTime');

      // 顯示明細
      detailsContainer.style.display = 'block';
      supermarketPageContainer.style.display = 'none';
    });
  });
}

// 儲存訂單資料到localStorage
function storeOrderInfo() {
  const orderNum = generateOrderNumber();
  const paymentMethod = nowPageId[4] === '1' ? '信用卡' : nowPageId[4] === '2' ? '網路ATM' : nowPageId[4] === '3' ? 'ATM櫃員機' : '超商代碼';
  const paymentStatus = nowPageId[4] === 1 ? true : nowPageId[4] === 2 ? true : false;
  orderDetail.orderId = orderNum;
  orderDetail.paymentMethod = paymentMethod;
  orderDetail.paymentStatus = paymentStatus;
  orderDetail.planData = finalDataLocal.plan;
  orderDetail.inTime = finalDataLocal.inTime;
  orderDetail.outTime = finalDataLocal.outTime;
  orderDetail.totalCharge = finalDataLocal.totalCharge;
  orderDetailAll.push(orderDetail);
  localStorage.setItem('orderDetail', JSON.stringify(orderDetailAll));
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
  for (let i = 0; i < orderNumberLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    orderNumber += characters.charAt(randomIndex);
  }

  return orderNumber;
}
const detail = document.querySelector('#detail');
const showPark = () => {
  let str = `<div class="row flex-column flex-lg-row">
  <div class="col border-end border-3">
      <div class="d-flex">
          <label for="inputPassword" class="col-form-label pe-2 text-dark-gray text-nowrap">停車場名:</label>
          <div class="d-flex align-items-center">
              <label for="" class="text-dark-gray">${finalDataLocal.parkName}</label>
          </div>
      </div>
      <div class="d-flex">
          <label for="inputPassword" class="col-form-label pe-2 text-dark-gray text-nowrap">地址:</label>
          <div class="d-flex align-items-center">
              <label for="" class="text-dark-gray">${finalDataLocal.address}</label>
          </div>
      </div>
  </div>
  <div class="col border-end border-3">
      <div class="col">
          <div class="d-flex">
              <label for="inputPassword" class="col-form-label pe-2 text-dark-gray text-nowrap">進場時間:</label>
              <div class="d-flex align-items-center">
                  <label for="" class="text-dark-gray">${finalDataLocal.inTime}</label>
              </div>
          </div>
          <div class="d-flex">
              <label for="inputPassword" class="col-form-label pe-2 text-dark-gray text-nowrap">離場時間:</label>
              <div class="d-flex align-items-center">
                  <label for="" class="text-dark-gray">${finalDataLocal.outTime}</label>
              </div>
          </div>
      </div>
  </div>
  <div class="col">
      <div class="col">
          <div class="d-flex">
              <label for="inputPassword" class="col-form-label pe-2 text-dark-gray text-nowrap">車牌號碼:</label>
              <div class="d-flex align-items-center">
                  <label for="" class="text-dark-gray">${finalDataLocal.carIdV}</label>
              </div>
          </div>
          <div class="d-flex">
              <label for="inputPassword" class="col-form-label pe-2 text-dark-gray text-nowrap">應繳金額:</label>
              <div class="d-flex align-items-center">
                  <label for="" class="text-dark-gray">${finalDataLocal.totalCharge}</label>
              </div>
          </div>
      </div>
  </div>
</div>`;
  detail.innerHTML = str;
};
showPark();
