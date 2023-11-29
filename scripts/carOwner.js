
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
// const contentToHide3 = document.querySelector('.content-to-hide-place-history');
const contentToHide3 = document.querySelector('.content-to-hide-trading-history');
const contentToHide4 = document.querySelector('.content-to-hide-appointment');
const contentToHide5 = document.querySelector('.content-to-hide-storage');
const showMapCard = document.querySelector('#showMapCard')
const btnNumList = 1;
const btnNumList1 = 1;
const allHide = [contentToHide, contentToHide2, contentToHide3, contentToHide4, contentToHide5]
let getParkValue = 'C01'
const localParkData = localStorage.getItem('likePark');
let saveLikePark = [];
const Url = 'http://localhost:3000'
const token = localStorage.getItem('token')
const usersId = localStorage.getItem('usersId')
// 從 localStorage 中讀取進場和出場時間和方案選擇
// const entryTimeHeader = localStorage.getItem("entryTime");
// const exitTimeHeader = localStorage.getItem("exitTime");
// const chosePlanHeader = localStorage.getItem("chosePlan");

// 將這些時間設置到表頭的相應元素中
// document.getElementById("entryTimeHeader").textContent = entryTimeHeader;
// document.getElementById("exitTimeHeader").textContent = exitTimeHeader;
// document.getElementById("chosePlanHeader").textContent = chosePlanHeader;

//切換六個項目按鈕
function getNum(x) {
    let num = parseInt(x.getAttribute('data-num'));
    if (num > btnNumList) {
        btnBgMove.style.marginLeft = (287 * (num-1)) + 'px';
    } else if (num < btnNumList) {
        btnBgMove.style.marginLeft = (287 * (num - 1)) + 'px';
    } else if(num=1){
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
    // console.log(num);
    if (num === 1) {
        getHide(z)
        contentToHide.style.display = 'block';
    }else if(num === 2){
        getHide(z)
        contentToHide2.style.display = 'block';
    }else if(num === 3){
        getHide(z)
        contentToHide3.style.display = 'block';
    }else if(num === 4){
        getHide(z)
        contentToHide4.style.display = 'block';
    }else if(num === 5){
        getHide(z)
        contentToHide5.style.display = 'block';
    }
    // else if(num === 6){
    //     getHide(z)
    //     contentToHide6.style.display = 'block';
    // }
}

//按鈕監聽
btn1.addEventListener('click', () => {
    getNum(btn1)
    showContent(btn1)
});
btn2.addEventListener('click', () => {
    getNum(btn2)
    showContent(btn2)
});
// btn3.addEventListener('click', () => {
//     getNum(btn3)
//     showContent(btn3)
// });
btn3.addEventListener('click', () => {
    getNum(btn3)
    showContent(btn3)
});
btn4.addEventListener('click', () => {
    getNum(btn4)
    showContent(btn4)
});
btn5.addEventListener('click', () => {
    getNum(btn5)
    showContent(btn5)
});
btn11.addEventListener('click' , () => {
    getParkValue = btn11.value
    getLikePark(saveLikePark,getParkValue)
    moveBtn1(btn11)
})
btn12.addEventListener('click' , () => {
    getParkValue = btn12.value
    getLikePark(saveLikePark,getParkValue)
    moveBtn1(btn12)
})

//選擇路邊或停車唱按鈕區塊移動
const moveBtn1 = (w) => {
    let num = parseInt(w.getAttribute('data-num'));
    if (num > btnNumList1) {
        btnBgMove1.style.marginLeft = (130 * (num-1)) + 'px';
    }else if(num=1){
        btnBgMove1.style.marginLeft = 0;
    }
}

//我的收藏盤出視窗
const saveParkModel = document.querySelector('#saveModel')
saveParkModel.addEventListener('show.bs.modal' , function (e) {
const saveButton = e.relatedTarget
const savePark = saveButton.dataset.bsSavePark
const saveType = saveButton.dataset.bsSaveType
const saveAddress = saveButton.dataset.bsSaveAddress
const saveSpace = saveButton.dataset.bsSaveSpace
const saveIn = saveButton.dataset.bsSaveIn
// console.log(saveButton,savePark)
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
//停車紀錄提示框
// const modalByDelete = document.querySelector('#deleteModal');
// modalByDelete.addEventListener('show.bs.modal', function(event) {
//     const button = event.relatedTarget;
//     const orderId = button.dataset.bsOrderId;
//     const modalText = modalByDelete.querySelector('#deleteText');
//     modalText.textContent = orderId;
// })
//交易紀錄提示框
const TradToDelete = document.querySelector('#deleteTrad');
TradToDelete.addEventListener('show.bs.modal' , function(event){
    const button = event.relatedTarget;
    const tradId = button.dataset.bsTradId;
    const tradText = TradToDelete.querySelector('#deleteTradText')
    tradText.textContent = tradId;
})
//預約紀錄提示框
const deleteAppointmentModel = document.querySelector('#deleteAppointment')
deleteAppointmentModel.addEventListener('show.bs.modal', function(p){
    const AppointmentButton = p.relatedTarget
    const getAppointment = AppointmentButton.dataset.bsPaId
    const text = deleteAppointmentModel.querySelector('#deleteAppointmentText')
    text.textContent = getAppointment
})
//預約紀錄提示框
const storageModel = document.querySelector('#storageModel')
storageModel.addEventListener('show.bs.modal' , function(event){
    const UnitValue = document.querySelector('#unitId').value.trim()
    const AmountValue = document.querySelector('#amountId').value.trim()
    const storageButton = event.relatedTarget
    const unit = storageModel.querySelector('#unit')
    const amount = storageModel.querySelector('#amount')
    unit.textContent = UnitValue
    amount.textContent = AmountValue
})
//更改密碼按鈕監聽
getNewPassword.addEventListener('click' , (e) => {
    let passwordV = '';
    const enterV = enterPassword.value
    const reEnterV = reEnterPassword.value
    if(enterV === reEnterV && enterV !== '' && reEnterV !== ''){
        document.querySelector('.Password-warn').style.display = 'none';
        passwordV = enterV
        applyChangePassWord(passwordV)
    }else if(enterV === '' || reEnterV === ''){
        document.querySelector('.Password-warn').style.display = 'block';
    }
})
//更改密碼
const applyChangePassWord = (aa) => {
    axios.patch(Url + `/600/users/${usersId}` , {
        'password': `${aa}`
    } , {
        headers: {
            Authorization: `Bearer ${token}`,
            },
    }).then((response) => {
        console.log(response)
        alert('密碼修改成功')
    }).catch((err) => {
        console,log(err)
    })
}

//取得用戶資料
axios.get(Url + `/600/users/${usersId}` , {
    headers: {
        Authorization: `Bearer ${token}`,
        },
}).then((response) => {
    let memberData = response.data
    getMemberData(memberData)
}).catch((err) => {
    console.log(err)
})
//將會員資料渲染至畫面
const getMemberData = (aa) => {
    let content = `<div class="row mt-5 d-flex justify-content-between gx-5">
    <div class="col-6">
        <div class="mb-4 row d-flex justify-content-between">
            <label for="inputPassword" class="col-sm-2 col-form-label">姓名</label>
            <div class="col-8">
                <input class="form-control  bg-white" type="text" value="${aa.username}" aria-label="Disabled input example" disabled readonly>
            </div>
        </div>
        <div class="mb-4 row d-flex justify-content-between">
            <label for="inputPassword" class="col-sm-2 col-form-label">Email</label>
            <div class="col-8">
                <input class="form-control  bg-white" type="text" value="${aa.email}" aria-label="Disabled input example" disabled readonly>
            </div>
        </div>
            <div class="row g-3 d-flex justify-content-between mb-4">
                <label for="PhoneNumber" class="col-sm-2 col-form-label">手機號碼</label>
                <div class="col-8 d-flex">
                    <select class="form-select form-select-md mb-3 py-1" aria-label=".form-select-lg example">
                        <option class="text-5" selected>+ 886</option>
                        <option value="1">+ 007</option>
                        <option value="2">+ 125</option>
                        <option value="3">+ 789</option>
                    </select>
                    <div class="col-8 ms-3">
                        <input class="form-control bg-white py-1" type="text" value="3524891" aria-label="Disabled input example" disabled readonly>
                    </div>
                </div>
            </div>
        </form>
        <div class="changePassWord d-flex justify-content-between">
                <label for="inputPassword" class="col-sm-2 col-form-label">密碼</label>
                <div class="col-8 d-flex align-items-center">
                    <label for="" class=""><a href="" class="fw-bold text-decoration-none text-strat ps-2" data-bs-toggle="modal" data-bs-target="#changePass">更改密碼</a></label>
                </div>
        </div>
    </div>
    <div class="col-6">
        <div class="mb-4 row d-flex justify-content-between">
            <label for="inputPassword" class="col-sm-2 col-form-label">車牌號碼</label>
            <div class="col-8">
                <input class="form-control  bg-white" type="text" value="${aa.carId}" aria-label="Disabled input example" disabled readonly>
            </div>
        </div>
        <div class="changePassWord d-flex justify-content-between mb-4">
            <label for="inputPassword" class="col-sm-2 col-form-label">信用卡</label>
            <div class="col-8 d-flex align-items-center">
                <label for="" class=""><a href="" class="fw-bold text-decoration-none text-strat ps-2">新增信用卡</a></label>
            </div>
    </div>
    <div class="row g-3 d-flex justify-content-between mb-4">
        <label for="inputPassword" class="col-4 col-form-label">信用卡資訊</label>
            <div class="col-8 d-flex">
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
        <div class="col d-flex flex-row-reverse" style="margin-top: 50px;">
            <button type="button" class="btn btn-info mx-3 px-5 py-1">確認送出</button>
            <button type="button" class="btn btn-light-gray mx-3 px-3 py-1">取消</button>
        </div>
    </div>
</div>`
contentToHide.innerHTML = content
}

console.log(saveLikePark)
//將取得的本地端值加入saveLikePark
const parsedLocalParkData = () => {
    if(localParkData === ''){
        saveLikePark = [];
    }else{
        let ss = localParkData.split(',').map(parseFloat);
        console.log(ss)
        saveLikePark.push(...ss)
    }
}
parsedLocalParkData()
//取得所有停車場資料
let data = [];
const getMapData = () => {
    axios.get(Url + '/parks?_expand=road')
    .then((response) => {
        data = response.data
        getLikePark(saveLikePark,getParkValue)
        console.log(response)
    }).catch((err) => {
        console.log(err)
    })
}
getMapData()
//取得全部停車場資料中與收藏停車場資料相符
const getLikePark = (aa,bb) => {
    let mapDataFilterA = [];
    let str = '';
    aa.forEach((item) => {
        let mapDataFilter = data.filter((elm) => {
            return (elm.location.latitude === item) && (elm.categoryId === bb)
        })
        mapDataFilterA.push(...mapDataFilter)
    })
    console.log(mapDataFilterA)
//渲染我的收藏至畫面
    mapDataFilterA.forEach((item) => {
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
            <div class="d-flex justify-content-between">
            <button id="detailBtn" type="button" class="btn btn-sm btn-light-gray px-3 py-1" data-bs-toggle="modal" data-bs-target="#saveModel" data-bs-save-park="${item.parkName}" data-bs-save-type="${item.type}" data-bs-save-address="${item.address}" data-bs-save-space="${item.space}" data-bs-save-in="${item.height}" data-btnId="${item.location.latitude}">詳細資料</button>
                <button type="button" class="btn btn-sm btn-light-gray px-3 py-1" data-btnId="${item.location.latitude}">長期方案</button>
            </div>
        </div>
    </div>`
    str += content
    })
    showMapCard.innerHTML = str
    // console.log(saveLikePark)
}
//監聽愛心按鈕
showMapCard.addEventListener('click' , (e) => {
    let btnValue = e.target.getAttribute('data-some-value')
    removeLikePark(saveLikePark, btnValue)
    localStorage.setItem('likePark', saveLikePark);
    getLikePark(saveLikePark,getParkValue)
    // console.log(e.target)
})
//刪除收藏停車場
const removeLikePark = (cc, dd) => {
    const removeInd = cc.findIndex((item) => {
        return item.toString() === dd;
    });
    if (removeInd !== -1) {
        cc.splice(removeInd, 1);
    }
};
