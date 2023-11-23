var paymentButton = document.querySelector(".btn-payment");

paymentButton.addEventListener("click", function() {
    window.location.href = "payment.html";
})

var closeBtn = document.getElementById("closeBtn");

closeBtn.addEventListener("click", function() {
    const watermark = document.querySelector(".watermark")
    watermark.style.display = "none";
})