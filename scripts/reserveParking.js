const reservePark = localStorage.getItem('parkId');
const Url1 = 'http://localhost:3000';
const UrlWebType1 = 'https://space-eye-web-surver.onrender.com'
const token1 = localStorage.getItem('token');
const usersId1 = localStorage.getItem('usersId');
const userBtn1 = document.querySelector('#userBtn');
const dataDetail = document.querySelector('.dataDetail');
const plan = document.querySelector('#plan');
const inPark = document.querySelector('#inPark');
const outPark = document.querySelector('#outPark');
// const pay = document.querySelector('#pay');
const checkOut = document.querySelector('#checkOut');
const carId = document.querySelector('#carId')
let data;
let parkData;
let finalData = {};
let finalDataAll = [];
let charge;
let chargeList;
let totalCharge;

console.log(reservePark)
checkOut.addEventListener('click', () => {
    const planV = plan.value
    const inParkV = new Date(inPark.value)
    const outParkV = new Date(outPark.value)
    // const payV = pay.value
    const carIdV = carId.value
    if (carIdV === '') {
        alert('請填寫車牌號碼')
    }
    if (inParkV == 'Invalid Date' || outParkV == 'Invalid Date') {
        alert('請填寫日期')
    } else {
        const dateDifference = outParkV - inParkV;
        const reserveId = generateReserveNumber()
        let daysDifference = dateDifference / (1000 * 60 * 60 * 24);
        if (planV === '當日預約' && daysDifference > 1) {
            alert('天數錯誤')
        } else if (planV === '預約一個星期' && daysDifference > 7) {
            alert('天數錯誤')
        } else if (planV === '預約一個月' && daysDifference > 30) {
            alert('天數錯誤')
        } else if (planV === '預約一年' && daysDifference > 360) {
            alert('天數錯誤')
        } else {
            countCharge(daysDifference)
            finalData.reserveId = reserveId
            finalData.parkName = parkData.parkName
            finalData.address = parkData.address
            finalData.type = parkData.type
            finalData.plan = planV
            finalData.inTime = inParkV
            finalData.outTime = outParkV
            // finalData.payV = payV
            finalData.carIdV = carIdV
            finalData.totalCharge = totalCharge
            // localStorage 只能存儲字符串形式的數據，因此將物件直接存儲進去可能會導致不正確的結果。
            // 為了將物件以字符串形式存儲到 localStorage 中，你需要使用 JSON.stringify：
            finalDataAll.push(finalData)
            localStorage.setItem('finalData', JSON.stringify(finalData))
            localStorage.setItem('finalDataAll', JSON.stringify(finalDataAll))
            window.location.href = '/Pages/payment.html'
        }
    }
})
// 產出隨機訂單編號
function generateReserveNumber() {
    const timestamp = Date.now();
    // 將時間轉為字串，只取前面的一部分作為訂單編號的前綴
    const timePrefix = timestamp.toString().slice(0, 6);
    // 定義可能的字符
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    // 訂單編號的長度
    const reserveNumberLength = 4;
    // 生成隨機訂單編號
    let reserveNumber = timePrefix;
    for (let i = 0; i < reserveNumberLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        reserveNumber += characters.charAt(randomIndex);
    }
    return reserveNumber;
}
//用天數計算價錢
const countCharge = (daysDifference) => {
    if (daysDifference <= 1) {
        for (let i = 0; i < chargeList.length; i++) {
            if (chargeList[i].unit === 'd') {
                list = chargeList[i].amount
                totalCharge = list
            }
        }
    } else if (daysDifference == 7) {
        for (let i = 0; i < chargeList.length; i++) {
            if (chargeList[i].unit === 'w') {
                list = chargeList[i].amount
                totalCharge = list
            }
        }
    } else if (daysDifference == 30) {
        for (let i = 0; i < chargeList.length; i++) {
            if (chargeList[i].unit === 'm') {
                list = chargeList[i].amount
                totalCharge = list
            }
        }
    } else if (daysDifference == 360) {
        for (let i = 0; i < chargeList.length; i++) {
            if (chargeList[i].unit === 'y') {
                list = chargeList[i].amount
                totalCharge = list
            }
        }
    } else {
        for (let i = 0; i < chargeList.length; i++) {
            if (chargeList[i].unit === 'd') {
                list = chargeList[i].amount
                totalCharge = list * daysDifference
            }
        }
    }
}
axios.get(Url1 + '/parks?_expand=road')
    .then((res) => {
        console.log(res.data)
        data = res.data
        getPark()
        showParkDetail(parkData)
        charge = parkData.charge
        getCharge(charge)
    }).catch((err) => {
        console.log(err)
    })
const getPark = () => {
    data.forEach((item) => {
        if (item.id == reservePark) {
            parkData = item
        }
    })
    console.log(parkData)
}
const showParkDetail = (aa) => {
    str = `<div class="changePassWord d-flex justify-content-between mb-3">
        <label for="inputPassword" class="col-sm-2 col-form-label fw-bold  text-dark-gray">停車場</label>
        <div class="col-8 d-flex align-items-center">
            <label for="" class="fw-bold text-dark-gray">${aa.parkName}</label>
        </div>
    </div>
    <div class="changePassWord d-flex justify-content-between mb-3">
        <label for="inputPassword" class="col-sm-2 col-form-label fw-bold  text-dark-gray">地址</label>
        <div class="col-8 d-flex align-items-center">
            <label for="" class="fw-bold text-dark-gray">${aa.address}</label>
        </div>
    </div>
    <div class="changePassWord d-flex justify-content-between mb-3">
        <label for="inputPassword" class="col-sm-2 col-form-label fw-bold  text-dark-gray">收費方式</label>
        <div class="col-8 d-flex align-items-center">
            <label for="" class="fw-bold text-dark-gray">${aa.charge}</label>
        </div>
    </div>
    <div class="changePassWord d-flex justify-content-between mb-5">
        <label for="inputPassword" class="col-sm-2 col-form-label fw-bold  text-dark-gray">車格種類</label>
        <div class="col-8 d-flex align-items-center">
            <label for="" class="fw-bold text-dark-gray">${aa.type}</label>
        </div>
    </div>`
    dataDetail.innerHTML = str
}
//如果違停車格禁用當日預約以外選項
// const disableOption = (aa) => {
//     if(aa.parkName === '路邊停车格(僅提供當日預約)'){
//         document.getElementById('w').disabled = true;
//         document.getElementById('m').disabled = true;
//         document.getElementById('y').disabled = true;
//     }else{
//         document.getElementById('w').disabled = false;
//         document.getElementById('m').disabled = false;
//         document.getElementById('y').disabled = false;
//     }
// }
const getCharge = () => {
    const pattern = /(\d+)\/(\w+)/g;
    const matches = Array.from(charge.matchAll(pattern));
    const result = matches.map(match => ({
        amount: parseInt(match[1]),
        unit: match[2]
    }));
    chargeList = result;
    console.log(chargeList)
}
