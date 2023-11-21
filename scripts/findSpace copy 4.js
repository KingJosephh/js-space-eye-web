// const btn1 = document.querySelector('#btn1');
// const btn2 = document.querySelector('#btn2');;
// const btn21 = document.querySelector('#btn2-1');
// const btn22 = document.querySelector('#btn2-2');
// const btn23 = document.querySelector('#btn2-3');
// const btn31 = document.querySelector('#btn3-1');
// const btn32 = document.querySelector('#btn3-2');
// const btn11 = document.querySelector('#btn1-1')
// const btn12 = document.querySelector('#btn1-2')
// const confirmBtn = document.querySelector('#confirm');
const btnBgMove = document.querySelector('.btn-bg-move');
const btnBgMove1 = document.querySelector('.btn-bg-move1');
const btnBgMove2 = document.querySelector('.btn-bg-move2');
const btnBgMove3 = document.querySelector('.btn-bg-move3');
const hideSearch = document.querySelector('.content-to-hide-search');
const hideShowPark = document.querySelector('.content-to-hide-showPark');
const showMapCard =document.querySelector('#showMapCard')
const showParkSelect = document.querySelector('.showParkSelect')
const areaOption = document.querySelector('#areaOption');
const roadOption = document.querySelector('#roadOption');
const Url = 'http://localhost:3000'
const btnNumList = 1;
const btnNumList1 = 1;
const btnNumList2 = 1;
const btnNumList3 = 1;
const token = localStorage.getItem('token');
const usersId = localStorage.getItem('usersId');
const localParkData = localStorage.getItem('likePark');
let getType = '一般車位';
let getSpaceOrNot = 'all';
let getParkValue = 'C01'
let data = [];
let filteredMapData = [];
let saveLikePark = [];

//搜尋條件與停車場一覽監聽
const btnCtrl = () => {
    const btn1 = document.querySelector('#btn1');
    const btn2 = document.querySelector('#btn2');;
    const btn21 = document.querySelector('#btn2-1');
    const btn22 = document.querySelector('#btn2-2');
    const btn23 = document.querySelector('#btn2-3');
    const btn31 = document.querySelector('#btn3-1');
    const btn32 = document.querySelector('#btn3-2');
    const btn11 = document.querySelector('#btn1-1')
    const btn12 = document.querySelector('#btn1-2')
    const confirmBtn = document.querySelector('#confirm');
    
    btn1.addEventListener('click', () => {
        moveBtn(btn1)
        hidePage(btn1)
    });
    btn2.addEventListener('click', () => {
        moveBtn(btn2)
        hidePage(btn2)
    });
    //確認送出按鈕監聽
    confirmBtn.addEventListener('click', () => {
        btnBgMove.style.marginLeft = 214 + 'px';
        hideSearch.style.display = 'none';
        hideShowPark.style.display = 'block';
        let area = areaOption.value;
        let road = roadOption.value;
        getMapDetail(area,road,getType,getSpaceOrNot,getParkValue)
        render(filteredMapData)
    })
    //車位類別按鈕監聽
    btn21.addEventListener('click', () => {
        moveBtn2(btn21)
        getType = btn21.value
    });
    btn22.addEventListener('click', () => {
        moveBtn2(btn22)
        getType = btn22.value
    });
    btn23.addEventListener('click', () => {
        moveBtn2(btn23)
        getType = btn23.value
    });
    //顯示有車位或全部停車場按鈕監聽
    btn31.addEventListener('click', () => {
        moveBtn3(btn31)
        getSpaceOrNot = btn31.value
    });
    btn32.addEventListener('click', () => {
        moveBtn3(btn32)
        getSpaceOrNot = btn32.value
    });
    //路邊停車與停車場按鈕監聽
    btn11.addEventListener('click' , () => {
        let area = areaOption.value;
        let road = roadOption.value;
        getParkValue = btn11.value
        getMapDetail(area,road,getType,getSpaceOrNot,getParkValue)
        render(filteredMapData)
        moveBtn1(btn11)
    })
    btn12.addEventListener('click' , () => {
        let area = areaOption.value;
        let road = roadOption.value;
        getParkValue = btn12.value
        getMapDetail(area,road,getType,getSpaceOrNot,getParkValue)
        render(filteredMapData)
        moveBtn1(btn12)
    })
}
//渲染選擇停車場條件到畫面
const toShowParkSelect = () => {
    let content = `<div class="row d-flex justify-content-center">
    <div class="col-10 mt-4 mb-4 p-0">
        <div class="btn-bg-move-dad button-group d-flex justify-content-between bg-green-black rounded-2 py-2 ">
            <div class="position-absolute btn-bg-move">
                <div id="color-block" class=" bg-light-green mx-4 d-flex align-center rounded-2" style="height: 32px; width: 100px;"></div>
            </div>
            <button id="btn1" type="button" class="btn mx-4 px-3 py-1 border-0 shadow-none fw-bold" style="z-index: 2;" data-num="1">搜尋條件</button>
            <button id="btn2" type="button" class="btn mx-4 px-3 py-1 border-0 shadow-none fw-bold" style="z-index: 2;" data-num="2">停車場一覽</button>
        </div>
    </div>
</div>
<div class="row d-flex justify-content-center">
    <div class="col-10 bg-white mt-4 rounded-2" style="height: 470px; overflow: auto;">
        <div class="content-to-hide-search">
            <div class="row mt-5">
                <div class="col-12">
                    <div class="row g-3 mb-2 mx-3 d-flex justify-content-between">
                        <div class="col-5 p-0">
                            <select class="form-select form-select-lg mb-5 py-1" aria-label="form-select-lg example" id="areaOption">
                                <!-- <option value="USD">USD</option>
                                <option value="CNY">CNY</option>
                                <option value="HKD">HKD</option> -->
                            </select>
                        </div>
                        <div class="col-6 p-0">
                            <select class="form-select form-select-lg mb-5 py-1" aria-label="form-select-lg example" id="roadOption">
                                <!-- <option value="USD">USD</option>
                                <option value="CNY">CNY</option>
                                <option value="HKD">HKD</option> -->
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-5">
                <div class="col-10 p-0">
                    <div class="btn-bg-move-dad button-group d-flex justify-content-between bg-secondary rounded-2 py-2">
                        <div class="position-absolute btn-bg-move2">
                            <div id="color-block" class=" bg-light-gray mx-2 d-flex align-center rounded-2" style="height: 28px; width: 70px;"></div>
                        </div>
                        <button id="btn2-1" type="button" class="btn btn-sm mx-1 py-1 border-0 shadow-none" style="z-index: 2;" data-num="1" value="一般車位">一般車位</button>
                        <button id="btn2-2" type="button" class="btn btn-sm mx-1 py-1 border-0 shadow-none" style="z-index: 2;" data-num="2" value="親子車位">親子車位</button>
                        <button id="btn2-3" type="button" class="btn btn-sm mx-1 py-1 border-0 shadow-none" style="z-index: 2;" data-num="3" value="殘障車位">殘障車位</button>
                    </div>
                </div>
            </div>
            <div class="row d-flex justify-content-center mt-4">
                <div class="col-10 p-0">
                    <div class="btn-bg-move-dad button-group d-flex justify-content-between bg-secondary rounded-2 py-2">
                        <div class="position-absolute btn-bg-move3">
                            <div id="color-block" class=" bg-light-gray mx-3 d-flex align-center rounded-2" style="height: 28px; width: 90px;"></div>
                        </div>
                        <button id="btn3-1" type="button" class="btn btn-sm mx-3 py-1 border-0 shadow-none" style="z-index: 2;" data-num="1" value="all">全部停車場</button>
                        <button id="btn3-2" type="button" class="btn btn-sm mx-3 py-1 border-0 shadow-none" style="z-index: 2;" data-num="2" value="haveSpace">有空位停車場</button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col d-flex justify-content-center" style="margin-top: 100px;">
                    <button id="confirm" type="button" class="btn btn-info mx-3 px-5 py-1">確認送出</button>
                    <!-- <button type="button" class="btn btn-light-gray mx-3 px-3 py-1">取消</button> -->
                </div>
            </div>
        </div>
        <div class="content-to-hide-showPark" id="showMapCard">
        </div>
    </div>
</div>`
showParkSelect.innerHTML = content
btnCtrl()
}
toShowParkSelect()
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
// 在后续请求中，将 token 添加到请求头中
axios.get(`http://localhost:3000/600/users/${usersId}`, {
    headers: {
        Authorization: `Bearer ${token}`,
        },
    })
    .then((response) => {
        showMapCard.addEventListener('click' ,(e) => {
            addLikeParkToLocal(e)
        })
        parsedLocalParkData()
        const data = response.data;
        console.log('从受保护的端点获取的数据:', data);
    })
    .catch((error) => {
        showMapCard.addEventListener('click' ,(e) => {
            let likeBtn = e.target
            if(likeBtn.classList.contains('save-like') || likeBtn.textContent === '長期方案'){
                alert('請先登入')
            }
            console.log(e.target)
        })
        console.error('请求受保护的端点失败:', error);
    });

//控制顯示或隱藏頁面
function hidePage(a){
    let num = parseInt(a.getAttribute('data-num'));
    if(num === 1){
        hideSearch.style.display = 'block';
        hideShowPark.style.display = 'none';
    }else if(num === 2){
        hideSearch.style.display = 'none';
        hideShowPark.style.display = 'block';
    }
}
//選搜尋停建或停車場一覽按鈕區塊移動
function moveBtn(x) {
    let num = parseInt(x.getAttribute('data-num'));
    if (num > btnNumList) {
        btnBgMove.style.marginLeft = (214 * (num-1)) + 'px';
    }else if(num=1){
        btnBgMove.style.marginLeft = 0;
    }
}
//選車位種類按鈕區塊移動
function moveBtn2(y) {
    let num = parseInt(y.getAttribute('data-num'));
    if (num > btnNumList2) {
        btnBgMove2.style.marginLeft = (110 * (num-1)) + 'px';
    }else if(num > btnNumList2){
        btnBgMove2.style.marginLeft = (110 * (num-1)) + 'px';
    }else if(num=1){
        btnBgMove2.style.marginLeft = 0;
    }
}
//顯示有車位停車場按鈕區塊移動
function moveBtn3(z) {
    let num = parseInt(z.getAttribute('data-num'));
    if (num > btnNumList2) {
        btnBgMove3.style.marginLeft = (180 * (num-1)) + 'px';
    }else if(num > btnNumList2){
        btnBgMove3.style.marginLeft = (100 * (num-1)) + 'px';
    }else if(num=1){
        btnBgMove3.style.marginLeft = 0;
    }
}
//選擇路邊或停車唱按鈕區塊移動
const moveBtn1 = (w) => {
    let num = parseInt(w.getAttribute('data-num'));
    if (num > btnNumList1) {
        btnBgMove1.style.marginLeft = (135 * (num-1)) + 'px';
    }else if(num=1){
        btnBgMove1.style.marginLeft = 0;
    }
}

//收藏停車場的愛心按鈕監聽
const addLikeParkToLocal = (e) => {
    if(e.target.classList.contains('save-like')){
        let likeBtn = e.target
        if (!e.target.classList.contains('bi-suit-heart-broke')) {
            let someValue = likeBtn.getAttribute('data-some-value');
            getLikePark(filteredMapData,someValue)
            likeBtn.classList.add('bi-suit-heart-broke');
            updateLocalStorage()
            console.log(saveLikePark)
        } else if (e.target.classList.contains('bi-suit-heart-broke')) {
            let someValue = likeBtn.getAttribute('data-some-value');
            removeLikePark(saveLikePark,someValue)
            likeBtn.classList.remove('bi-suit-heart-broke');
            updateLocalStorage()
            console.log(saveLikePark)
        }
    }
}
//控制彈出視窗(modal)
const showAllPark = document.querySelector('#showAllParkModel')
                        showAllPark.addEventListener('show.bs.modal' , function (e) {
                        const showButton = e.relatedTarget
                        const showPark = showButton.dataset.bsShowPark
                        const showType = showButton.dataset.bsShowType
                        const showAddress = showButton.dataset.bsShowAddress
                        const showSpace = showButton.dataset.bsShowSpace
                        const showIn = showButton.dataset.bsShowIn
                        const park = showAllPark.querySelector('#park')
                        const type = showAllPark.querySelector('#type')
                        const address = showAllPark.querySelector('#address')
                        const space = showAllPark.querySelector('#space')
                        const inOrOut = showAllPark.querySelector('#in')
                        park.textContent = showPark
                        type.textContent = showType
                        address.textContent = showAddress
                        space.textContent = showSpace
                        inOrOut.textContent = showIn
                        })
//取得區域資料
let sectionData = [];
const getSection = () => {
    axios.get(Url + '/sections')
    .then(function(res){
        sectionData = res.data;
        showSectionList()
    })
    .catch(function(err){
        console.log(err);
    })
}
getSection();
//渲染區域資料到畫面上
const showSectionList = () => {
    let content = '';
    if (sectionData.length === 0) {
        content =  ``
        } else {
            sectionData.forEach((item) => {
                content += `<option value="${item.id}">${item.area}</option>`
            })
        }
        areaOption.innerHTML = content;
}
//監聽區域來取的區域內路段
let previousValue = null; // 变量用于存储上一次的值
areaOption.addEventListener('click', (event) => {
    let valueR = event.target.value;
    if (valueR !== previousValue) {//避免產生重複的值
        getRoad(valueR)
        previousValue = valueR; // 更新上一次的值
    }
});
//取得道路資料
let roadData = [];
const getRoad = (roadIdInData) => {
    axios.get(Url + '/roads')
    .then(function(res){
        roadData = res.data;
        const equalId = roadData.filter((item) => {
            return item.sectionId === roadIdInData
        })
        showRoadOptionList(equalId)
    })
    .catch(function(err){
        console.log(err);
    })
}
getRoad("S01")//預先渲染路段R001到畫面上
//渲染道路資料到畫面上
const showRoadOptionList = (a) => {
    let content = '';
    if (a === "S01") {
        content =  `<option value="R001">中山路</option>`
        } else {
            a.forEach((item) => {
                content += `<option value="${item.id}">${item.roadName}</option>`
            })
        }
        roadOption.innerHTML = content;
}
//取得停車場資訊
const getMap = () => {
    axios.get(Url + '/parks?_expand=road')
    .then(function(res){
        data = res.data
        console.log(data)
    })
    .catch(function(err){
        console.log(err)
    })
}
getMap()
//透過搜尋條件篩選資料
const getMapDetail = (a,b,c,d,e) => {
    filteredMapData = data.filter((item) => {
        if(item.road.sectionId === a && item.roadId === b && item.type.includes(c) && (d === 'haveSpace' && item.space !== "0") && item.categoryId === e){
            return item
        }else if(item.road.sectionId === a && item.roadId === b && item.type.includes(c) && d === 'all' && item.categoryId === e){
            return item
        }
    })
}
//將篩選過後的資料渲染到畫面上 
const render = (aa) => {
    let str = '';
    aa.forEach((item) => {
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
            <button id="detailBtn" type="button" class="btn btn-sm btn-light-gray px-3 py-1" data-bs-toggle="modal" data-bs-target="#showAllParkModel" data-bs-show-park="${item.parkName}" data-bs-show-type="${item.type}" data-bs-show-address="${item.address}" data-bs-show-space="${item.space}" data-bs-show-in="${item.height}">詳細資料</button>
                <button type="button" class="btn btn-sm btn-light-gray px-3 py-1">長期方案</button>
            </div>
        </div>
    </div>`
    str += content
    })
    showMapCard.innerHTML = str
    console.log(saveLikePark)
    plusLike(aa)
}
const getLikePark = (aa, bb) => {
    aa.forEach((item) => {
        let locateNum = parseFloat(item.location.latitude);
        if (locateNum === parseFloat(bb)) {
            saveLikePark.push(locateNum);
        }
    });
    console.log(saveLikePark);
};
//將saveLikePark裡喜愛停車場remove
const removeLikePark = (cc, dd) => {
    const removeInd = cc.findIndex((item) => {
        return item.toString() === dd;
    });
    if (removeInd !== -1) {
        cc.splice(removeInd, 1);
    }
};
//將有在saveLikePark裡的項目愛心加上顏色
const plusLike = (aa) => {
    const saveLikes = document.querySelectorAll('.save-like[data-some-value]');
    aa.forEach((item) => {
        let locatedId = item.location.latitude;
        console.log(locatedId)
        for (let i = 0; i < saveLikePark.length; i++) {
            if (locatedId === saveLikePark[i]) {
                let saveLikeElement = saveLikePark[i];
                for (let x = 0; x < saveLikes.length; x++) {
                    if (saveLikeElement.toString() === saveLikes[x].getAttribute('data-some-value')) {
                        saveLikes[x].classList.add('bi-suit-heart-broke');
                    }
                }
            }
        }
    });
};
//如果值為空就不儲存
const updateLocalStorage = () => {
    if(saveLikePark === ''){
        return
    }else{
        localStorage.setItem('likePark', saveLikePark);
    }
};
//"jwt expired"token過期
