const btnUpL = document.querySelector('.btn-up-l');
const btnUpM = document.querySelector('.btn-up-m');

/* 按鈕 - 向上箭頭 */
if (btnUpL){
  btnUpL.addEventListener('mouseover', () =>{
    btnUpL.innerHTML = `
    <svg width="21" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.175 14.6L11 7.42501L3.825 14.6L0.5 11.3333L11 0.833344L21.5 11.3333L18.175 14.6Z" fill="#93FF00"/>
    </svg>
    `;
  }); 
  btnUpL.addEventListener('mouseleave', () => {
    btnUpL.innerHTML = `
    <svg width="21" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.175 14.6L11 7.42501L3.825 14.6L0.5 11.3333L11 0.833344L21.5 11.3333L18.175 14.6Z" fill="#1E1E1E" />
    </svg>
    `;
  });
}

if (btnUpM){
  btnUpM.addEventListener('mouseover', () => {
    btnUpM.innerHTML = `
    <svg width="16.5" height="12" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.175 14.6L11 7.42501L3.825 14.6L0.5 11.3333L11 0.833344L21.5 11.3333L18.175 14.6Z" fill="#93FF00"/>
    </svg>
    `;
  }); 
  btnUpM.addEventListener('mouseleave', () => {
    btnUpM.innerHTML = `
    <svg width="16.5" height="12" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.175 14.6L11 7.42501L3.825 14.6L0.5 11.3333L11 0.833344L21.5 11.3333L18.175 14.6Z" fill="#1E1E1E" />
    </svg>
    `;
  });
}