const saveLikes = document.querySelectorAll('.save-like');
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
const btnBgMove = document.querySelector('.btn-bg-move');
const btnBgMove1 = document.querySelector('.btn-bg-move1');
const btnBgMove2 = document.querySelector('.btn-bg-move2');
const btnBgMove3 = document.querySelector('.btn-bg-move3');
const hideSearch = document.querySelector('.content-to-hide-search');
const hideShowPark = document.querySelector('.content-to-hide-showPark');
const showMapCard =document.querySelector('#showMapCard')
const areaOption = document.querySelector('#areaOption');
const roadOption = document.querySelector('#roadOption');
const Url = 'http://localhost:3000'
const btnNumList = 1;
const btnNumList1 = 1;
const btnNumList2 = 1;
const btnNumList3 = 1;
const token = localStorage.getItem('token');
const usersId = localStorage.getItem('usersId');
let getType = '一般車位';
let getSpaceOrNot = 'all';
let getParkValue = 'C01'
let data = [];
let filteredMapData = [];
let saveLikePark = '';

// 在后续请求中，将 token 添加到请求头中
axios.get('http://localhost:3000/600/users/2', {
    headers: {
        Authorization: `Bearer ${token}`,
        },
    })
    .then((response) => {
        const data = response.data;
        console.log('从受保护的端点获取的数据:', data);
    })
    .catch((error) => {
        console.error('请求受保护的端点失败:', error);
    });

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
//選搜尋停建或停車場一覽按鈕區塊移動
function moveBtn(x) {
    let num = parseInt(x.getAttribute('data-num'));
    if (num > btnNumList) {
        btnBgMove.style.marginLeft = (162 * (num-1)) + 'px';
    }else if(num=1){
        btnBgMove.style.marginLeft = 0;
    }
}
//選車位種類按鈕區塊移動
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
//顯示有車位停車場按鈕區塊移動
function moveBtn3(z) {
    let num = parseInt(z.getAttribute('data-num'));
    if (num > btnNumList2) {
        btnBgMove3.style.marginLeft = (136 * (num-1)) + 'px';
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
        btnBgMove1.style.marginLeft = (105 * (num-1)) + 'px';
    }else if(num=1){
        btnBgMove1.style.marginLeft = 0;
    }
}

//搜尋條件與停車場一覽監聽
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
    btnBgMove.style.marginLeft = 162 + 'px';
    hideSearch.style.display = 'none';
    hideShowPark.style.display = 'block';
    let area = areaOption.value;
    let road = roadOption.value;
    getMapDetail(area,road,getType,getSpaceOrNot,getParkValue)
    render(filteredMapData)
    console.log(area ,road ,getType ,getSpaceOrNot,getParkValue)
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
    console.log(area ,road ,getType ,getSpaceOrNot,getParkValue)
})
btn12.addEventListener('click' , () => {
    let area = areaOption.value;
    let road = roadOption.value;
    getParkValue = btn12.value
    getMapDetail(area,road,getType,getSpaceOrNot,getParkValue)
    render(filteredMapData)
    moveBtn1(btn12)
    console.log(area ,road ,getType ,getSpaceOrNot,getParkValue)
})
//收藏停車場的愛心按鈕監聽
showMapCard.addEventListener('click' ,(e) => {
    if(e.target.classList.contains('save-like')){
        let likeBtn = e.target
        if (!e.target.classList.contains('bi-suit-heart-broke')) {
            let someValue = likeBtn.getAttribute('data-some-value');
            getLikePark(filteredMapData,someValue)
            postLikePark(e)
            likeBtn.classList.add('bi-suit-heart-broke');
            console.log('aa')
        } else if (e.target.classList.contains('bi-suit-heart-broke')) {
            let someValue = likeBtn.getAttribute('data-some-value');
            // removeLikePark(saveLikePark,someValue)
            likeBtn.classList.remove('bi-suit-heart-broke');
        }
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
                <button type="button" class="btn btn-sm btn-light-gray px-3 py-1">詳細資料</button>
                <button id="detailBtn" type="button" class="btn btn-sm btn-light-gray px-3 py-1" data-bs-toggle="modal" data-bs-target="#showAllParkModel" data-bs-show-park="${item.parkName}" data-bs-show-type="${item.type}" data-bs-show-address="${item.address}" data-bs-show-space="${item.space}" data-bs-show-in="${item.height}">長期方案</button>
            </div>
        </div>
    </div>`
    str += content
    })
    showMapCard.innerHTML = str
}
//將喜愛停車場push到saveLikePark裡
const getLikePark = (aa,bb) => {
    aa.forEach((item) => {
        let locateNum = item.location.latitude.toString();
        if(locateNum === bb){
            // saveLikePark.push(item)
            // saveLikePark.push(locateNum)
            saveLikePark = locateNum
        }
    })
    console.log(saveLikePark)
}
//將喜愛停車場remove到saveLikePark裡
const removeLikePark = (cc, dd) => {
    const removeInd = cc.findIndex((item) => {
        return item.location.latitude.toString() === dd;
    });
    if (removeInd !== -1) {
        cc.splice(removeInd, 1);
    }
    console.log(saveLikePark)
};
const postLikePark = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/posts' , {
        "likePark": saveLikePark,
        "userId": usersId
    }).then(function (response) {
        // console.log(response)
        console.log('Response with status code:', response.status);
    }).catch(function (err) {
        console.log(err)
    })
}
window.addEventListener('beforeunload', function (event) {
    // 阻止页面刷新
    event.preventDefault();
    // 设置 event.returnValue 为空字符串，不会触发提示框
    event.returnValue = 'nnn';
  });
// const postLikePark = () => {
//     axios.get('http://localhost:3000/600/users/2' ,{
//         headers: {
//             Authorization: `Bearer ${token}`,
//             },
//     })
//     .then((response) => {
//         console.log(response)
//         const userData = response.data;
//         userData.likePark = saveLikePark;
//         axios.patch('http://localhost:3000/600/users/2', {
//             likePark: userData.likePark
//         },{
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 }
//         })
//         .then((postResponse) => {
//             console.log('Data updated and sent to the server:', postResponse.data);
//         })
//         .catch((postError) => {
//             console.error('Error sending updated data:', postError);
//         });
//     })
//     .catch((error) => {
//         console.error('Error fetching user data:', error);
//     });
// }
//選出路邊停車或停車場
// const getPark = (a,b) => {
//     const parkData = a.filter((item) => {
//         if(item.parkName.includes(b)){
//             return item
//         }
//     })
// }
// detailBtn.addEventListener("click", function() {
//     console.log("按钮点击事件触发");
//     $("#showAllParkModel").modal("show");
// });
//把資料先存在本地端然後在用重整網頁監聽方式存到資料庫