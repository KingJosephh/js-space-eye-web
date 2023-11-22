var btn = document.getElementById("next");


function select(el, left) {
    var plan = "";
    if (!plan) {
        btn.disabled = false;
    }

    Array.from(el.parentElement.children).forEach(function (child) {
        child.classList.remove("plan-active");
    });

    el.classList.add("plan-active");

    if (left) {
        el.parentElement.children[2].classList.remove("plan-active");
        btn.innerHTML = "每週停車";
    } else if (el.nextElementSibling) {
        el.nextElementSibling.classList.remove("plan-active");
        btn.innerHTML = "每月停車";
    } else if (el.previousElementSibling) {
        el.previousElementSibling.classList.remove("plan-active");
        btn.innerHTML = "每年停車";
    }
}



var rightButton = document.querySelector(".btn-primary");

rightButton.addEventListener("click", function() {
    var entryDateValue = document.getElementById("entryDate").value;
    var exitDateValue = document.getElementById("exitDate").value;
    
    if (!entryDateValue && !exitDateValue) {
        alert ("請選擇入場日期和離場日期");
    }else{
      window.location.href = "correct.html";
    }
})

var canelButton = document.querySelector(".btn-secondary");

canelButton.addEventListener("click", function() {
    window.location.href = "findSpace.html";
})