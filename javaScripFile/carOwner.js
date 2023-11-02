const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');
const btn5 = document.getElementById('btn5');
const btn6 = document.getElementById('btn6');
const btnBgMove = document.querySelector('.btn-bg-move');
const contentToHide = document.querySelector('.content-to-hide-owner');
const contentToHide2 = document.querySelector('.content-to-hide-save');
const contentToHide3 = document.querySelector('.content-to-hide-place-history');
const contentToHide4 = document.querySelector('.content-to-hide-trading-history');
const contentToHide5 = document.querySelector('.content-to-hide-appointment');
const contentToHide6 = document.querySelector('.content-to-hide-storage');
const btnNumList = 1;
const allHide = [contentToHide, contentToHide2, contentToHide3, contentToHide4, contentToHide5, contentToHide6]


function getNum(x) {
    let num = parseInt(x.getAttribute('data-num'));
    if (num > btnNumList) {
        btnBgMove.style.marginLeft = (194 * (num-1)) + 'px';
    } else if (num < btnNumList) {
        btnBgMove.style.marginLeft = (194 * (num - 1)) + 'px';
    }else if(num=1){
        btnBgMove.style.marginLeft = 0;
    }
}
function getHide(same) {
    const differentBtn = allHide
    .filter((item) => item instanceof HTMLElement) // 过滤出DOM元素
    .filter((item) => item !== same);
    differentBtn.forEach((e) => {
    e.style.display = 'none';
    });
}
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
    }else if(num === 6){
        getHide(z)
        contentToHide6.style.display = 'block';
    }
}


btn1.addEventListener('click', () => {
    getNum(btn1)
    showContent(btn1)
});
btn2.addEventListener('click', () => {
    getNum(btn2)
    showContent(btn2)
});
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
btn6.addEventListener('click', () => {
    getNum(btn6)
    showContent(btn6)
});

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

const modalByDelete = document.querySelector('#deleteModal');
modalByDelete.addEventListener('show.bs.modal', function(event) {
    const button = event.relatedTarget;
    const orderId = button.dataset.bsOrderId;
    const modalText = modalByDelete.querySelector('#deleteText');
    modalText.textContent = orderId;
})

const TradToDelete = document.querySelector('#deleteTrad');
TradToDelete.addEventListener('show.bs.modal' , function(event){
    const button = event.relatedTarget;
    const tradId = button.dataset.bsTradId;
    const tradText = TradToDelete.querySelector('#deleteTradText')
    tradText.textContent = tradId;
})

const deleteAppointmentModel = document.querySelector('#deleteAppointment')
deleteAppointmentModel.addEventListener('show.bs.modal', function(p){
    const AppointmentButton = p.relatedTarget
    const getAppointment = AppointmentButton.dataset.bsPaId
    const text = deleteAppointmentModel.querySelector('#deleteAppointmentText')
    text.textContent = getAppointment
})

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