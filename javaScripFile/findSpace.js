const saveLike = document.querySelector('#save-like')
const btn1 = document.querySelector('#btn1')
const btn2 = document.querySelector('#btn2')
const btn21 = document.querySelector('#btn2-1')
const btn22 = document.querySelector('#btn2-2')
const btn23 = document.querySelector('#btn2-3')
const btn31 = document.querySelector('#btn3-1')
const btn32 = document.querySelector('#btn3-2')
const btnBgMove = document.querySelector('.btn-bg-move');
const btnBgMove2 = document.querySelector('.btn-bg-move2');
const btnBgMove3 = document.querySelector('.btn-bg-move3');
const hideSearch = document.querySelector('.content-to-hide-search')
const hideShowPark = document.querySelector('.content-to-hide-showPark')
const btnNumList = 1;
const btnNumList2 = 1;
const btnNumList3 = 1;

saveLike.addEventListener('click', (e) =>{
    if(!e.target.classList.contains('bi-suit-heart-broke')){
        e.target.classList.add('bi-suit-heart-broke');
    }else if(e.target.classList.contains('bi-suit-heart-broke')){
        e.target.classList.remove('bi-suit-heart-broke');
    }
})

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

function moveBtn(x) {
    let num = parseInt(x.getAttribute('data-num'));
    if (num > btnNumList) {
        btnBgMove.style.marginLeft = (162 * (num-1)) + 'px';
    }else if(num=1){
        btnBgMove.style.marginLeft = 0;
    }
}
function moveBtn2(y) {
    let num = parseInt(y.getAttribute('data-num'));
    console.log(num)
    if (num > btnNumList2) {
        btnBgMove2.style.marginLeft = (90 * (num-1)) + 'px';
    }else if(num > btnNumList2){
        btnBgMove2.style.marginLeft = (90 * (num-1)) + 'px';
    }else if(num=1){
        btnBgMove2.style.marginLeft = 0;
    }
}
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

btn1.addEventListener('click', () => {
    moveBtn(btn1)
    hidePage(btn1)
});
btn2.addEventListener('click', () => {
    moveBtn(btn2)
    hidePage(btn2)
});
btn21.addEventListener('click', () => {
    moveBtn2(btn21)
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