const btnMail = document.querySelectorAll('.btn-mail');

const svgM = document.querySelector('.btn-mail-m-svg');
const svgL = document.querySelector('.btn-mail-l-svg');
const btnUpL = document.querySelector('.btn-up-l');
const btnUpM = document.querySelector('.btn-up-m');
const btnUpSvg = document.querySelectorAll('.btn-up-svg');

/* 按鈕 - 歡迎免費諮詢 */
for(let i = 0;i < btnMail.length; i++){
  btnMail[i].addEventListener('mouseover', e => {
    btnMail[i].childNodes[5].children[1].innerHTML = `
    <mask id="mask0_2918_2430" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    <rect width="24" height="24" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_2918_2430)">
    <path d="M16.175 13H4V11H16.175L10.575 5.4L12 4L20 12L12 20L10.575 18.6L16.175 13Z" fill="#1E1E1E"/>
    </g>
    `
  })
  btnMail[i].addEventListener('mouseout', e => {
    btnMail[i].childNodes[5].children[1].innerHTML = `
      <mask id="mask0_2910_7237" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2910_7237)">
        <path d="M16.175 13H4V11H16.175L10.575 5.4L12 4L20 12L12 20L10.575 18.6L16.175 13Z" fill="white" />
      </g>
    `
  })
}


/* 按鈕 - 向上箭頭 */
if (btnUpL){
  btnUpL.addEventListener('mouseover',e=>{
    btnUpL.innerHTML = `
    <svg width="21" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.175 14.6L11 7.42501L3.825 14.6L0.5 11.3333L11 0.833344L21.5 11.3333L18.175 14.6Z" fill="#93FF00"/>
    </svg>
    `
  }); 
  btnUpL.addEventListener('mouseleave', e => {
    btnUpL.innerHTML = `
    <svg width="21" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.175 14.6L11 7.42501L3.825 14.6L0.5 11.3333L11 0.833344L21.5 11.3333L18.175 14.6Z" fill="#1E1E1E" />
    </svg>
    `
  });
}

if (btnUpM){
  btnUpM.addEventListener('mouseover',e=>{
    btnUpM.innerHTML = `
    <svg width="16.5" height="12" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.175 14.6L11 7.42501L3.825 14.6L0.5 11.3333L11 0.833344L21.5 11.3333L18.175 14.6Z" fill="#93FF00"/>
    </svg>
    `
  }); 
  btnUpM.addEventListener('mouseleave', e => {
    btnUpM.innerHTML = `
    <svg width="16.5" height="12" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.175 14.6L11 7.42501L3.825 14.6L0.5 11.3333L11 0.833344L21.5 11.3333L18.175 14.6Z" fill="#1E1E1E" />
    </svg>
    `
  });
}