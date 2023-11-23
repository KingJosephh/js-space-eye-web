const searchBtn = document.querySelector('.searchBtn');
const searchBg = document.querySelector('.searchBg');
const btnX = document.querySelector('#btnX');

//控制篩選藍
let rwdBtn = false
searchBtn.addEventListener('click' , (e) => {
    rwdBtn = !rwdBtn;
    showRwdChoice()
    rotateIcon()
})
const showRwdChoice = () => {
    if(rwdBtn === true){
        // searchBg.style.display = 'block'
        searchBg.classList.add('show')
    }else if(rwdBtn === false){
        // searchBg.style.display = 'none'
        searchBg.classList.remove('show')
    }
}
const rotateIcon = () => {
    if(rwdBtn === true){
        btnX.classList.add('xBtn2');
        btnX.classList.remove('xBtn');
    }else if(rwdBtn === false){
        btnX.classList.add('xBtn');
        btnX.classList.remove('xBtn2');
    }
}
