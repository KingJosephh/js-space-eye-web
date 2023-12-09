
//   地圖中心位置，縮放大小(台中市)
var map = L.map('map', {
    center: [24.156906481724832, 120.65458649800334],
    zoom: 16
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);