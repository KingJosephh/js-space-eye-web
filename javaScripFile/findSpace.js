const saveLike = document.querySelector('#save-like');
const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');;
const btn21 = document.querySelector('#btn2-1');
const btn22 = document.querySelector('#btn2-2');
const btn23 = document.querySelector('#btn2-3');
const btn31 = document.querySelector('#btn3-1');
const btn32 = document.querySelector('#btn3-2');
const confirmBtn = document.querySelector('#confirm');
const btnBgMove = document.querySelector('.btn-bg-move');
const btnBgMove2 = document.querySelector('.btn-bg-move2');
const btnBgMove3 = document.querySelector('.btn-bg-move3');
const hideSearch = document.querySelector('.content-to-hide-search');
const hideShowPark = document.querySelector('.content-to-hide-showPark');
const areaOption = document.querySelector('#areaOption');
const roadOption = document.querySelector('#roadOption');
const btnNumList = 1;
const btnNumList2 = 1;
const btnNumList3 = 1;
const urlGetArea = 'http://localhost:3000/road';


//控制顯示或隱藏頁面
function hidePage(a){
    let num = parseInt(a.getAttribute('data-num'));
    console.log(num)
    if(num === 1){
        hideSearch.style.display = 'block';
        hideShowPark.style.display = 'none';
    }else if(num === 2){
        hideSearch.style.display = 'none';
        hideShowPark.style.display = 'block';
    }
}
//選搜尋停建或停車場一覽
function moveBtn(x) {
    let num = parseInt(x.getAttribute('data-num'));
    if (num > btnNumList) {
        btnBgMove.style.marginLeft = (162 * (num-1)) + 'px';
    }else if(num=1){
        btnBgMove.style.marginLeft = 0;
    }
}
//選車位種類按鈕移動
function moveBtn2(y) {
    let num = parseInt(y.getAttribute('data-num'));
    // console.log(num)
    if (num > btnNumList2) {
        btnBgMove2.style.marginLeft = (90 * (num-1)) + 'px';
    }else if(num > btnNumList2){
        btnBgMove2.style.marginLeft = (90 * (num-1)) + 'px';
    }else if(num=1){
        btnBgMove2.style.marginLeft = 0;
    }
}
//顯示有車位停車場按鈕移動
function moveBtn3(z) {
    let num = parseInt(z.getAttribute('data-num'));
    console.log(num)
    if (num > btnNumList2) {
        btnBgMove3.style.marginLeft = (136 * (num-1)) + 'px';
    }else if(num > btnNumList2){
        btnBgMove3.style.marginLeft = (100 * (num-1)) + 'px';
    }else if(num=1){
        btnBgMove3.style.marginLeft = 0;
    }
}

//各種按鈕監聽
btn1.addEventListener('click', () => {
    moveBtn(btn1)
    hidePage(btn1)
});
btn2.addEventListener('click', () => {
    moveBtn(btn2)
    hidePage(btn2)
});
confirmBtn.addEventListener('click', () => {
    btnBgMove.style.marginLeft = 162 + 'px';
    hideSearch.style.display = 'none';
    hideShowPark.style.display = 'block';
})
btn21.addEventListener('click', () => {
    moveBtn2(btn21)
    console.log(btn21.value)
});
btn22.addEventListener('click', () => {
    moveBtn2(btn22)
});
btn23.addEventListener('click', () => {
    moveBtn2(btn23)
});
btn31.addEventListener('click', () => {
    moveBtn3(btn31)
});
btn32.addEventListener('click', () => {
    moveBtn3(btn32)
});
//收藏停車場的愛心按鈕監聽
saveLike.addEventListener('click', (e) =>{
    if(!e.target.classList.contains('bi-suit-heart-broke')){
        e.target.classList.add('bi-suit-heart-broke');
    }else if(e.target.classList.contains('bi-suit-heart-broke')){
        e.target.classList.remove('bi-suit-heart-broke');
    }
})
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
    axios.get('http://localhost:3000/sections')
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
    axios.get('http://localhost:3000/roads')
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
//渲染道路資料到畫面上
const showRoadOptionList = (a) => {
    let content = '';
    if (a.length === 0) {
        content =  ``
        } else {
            a.forEach((item) => {
                content += `<option value="${item.id}">${item.roadName}</option>`
            })
        }
        roadOption.innerHTML = content;
}
