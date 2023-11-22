const hamburger = document.querySelector('.hamburger');
const header = document.querySelector('header');
const svg = document.querySelectorAll('header > div > svg');
const nav = document.querySelector('nav');

/* 監聽漢堡點擊動作 */
if(hamburger){
  hamburger.addEventListener('click',e=>{
    header.classList.toggle('active');

    /* 初始的nav導覽列class就有hide */
    nav.classList.toggle('hide');

    if (header.getAttribute('class') === 'active'){
      /* logo換成白字版本 */
      svg[0].innerHTML = `
      <path
        d="M46 15.668C46 14.7902 46.1754 13.9651 46.5261 13.1925C46.8768 12.424 47.3521 11.7505 47.9521 11.1721C48.5563 10.5937 49.2619 10.1366 50.069 9.80088C50.8718 9.46516 51.7316 9.2973 52.6485 9.2973H62.8337V13.5505H52.6485C52.3401 13.5505 52.0528 13.6051 51.7866 13.7143C51.5161 13.8195 51.2816 13.9691 51.0831 14.1633C50.8802 14.3574 50.7218 14.5819 50.6077 14.8367C50.4936 15.0956 50.4366 15.3727 50.4366 15.668C50.4366 15.9632 50.4936 16.2423 50.6077 16.5052C50.7218 16.7641 50.8802 16.9906 51.0831 17.1848C51.2816 17.3789 51.5161 17.5306 51.7866 17.6398C52.0528 17.745 52.3401 17.7976 52.6485 17.7976H57.0915C58.0083 17.7976 58.8724 17.9634 59.6837 18.2951C60.4949 18.6268 61.2027 19.0818 61.8069 19.6602C62.4069 20.2386 62.8801 20.9141 63.2266 21.6867C63.5731 22.4633 63.7463 23.2905 63.7463 24.1682C63.7463 25.046 63.5731 25.8711 63.2266 26.6437C62.8801 27.4122 62.4069 28.0857 61.8069 28.6641C61.2027 29.2425 60.4949 29.6996 59.6837 30.0353C58.8724 30.371 58.0083 30.5389 57.0915 30.5389H47.2359V26.2857H57.0915C57.3999 26.2857 57.6893 26.2311 57.9598 26.1219C58.226 26.0167 58.4605 25.8671 58.6633 25.6729C58.8661 25.4788 59.0224 25.2543 59.1323 24.9994C59.2464 24.7406 59.3034 24.4635 59.3034 24.1682C59.3034 23.873 59.2464 23.5959 59.1323 23.337C59.0224 23.0822 58.8661 22.8577 58.6633 22.6635C58.4605 22.4734 58.226 22.3238 57.9598 22.2146C57.6893 22.1054 57.3999 22.0507 57.0915 22.0507H52.6485C51.7316 22.0507 50.8718 21.8829 50.069 21.5472C49.2619 21.2114 48.5563 20.7544 47.9521 20.176C47.3521 19.5975 46.8768 18.922 46.5261 18.1495C46.1754 17.3729 46 16.5457 46 15.668ZM75.535 13.5505H71.092V22.0507H75.535C76.1434 22.0507 76.7159 21.9395 77.2525 21.717C77.7892 21.4946 78.2582 21.1912 78.6596 20.8069C79.061 20.4227 79.3779 19.9717 79.6103 19.4539C79.8427 18.9322 79.9589 18.38 79.9589 17.7976C79.9589 17.2151 79.8427 16.665 79.6103 16.1473C79.3779 15.6295 79.061 15.1785 78.6596 14.7943C78.2582 14.41 77.7892 14.1066 77.2525 13.8842C76.7159 13.6617 76.1434 13.5505 75.535 13.5505ZM71.092 26.2857V30.5389H66.6555V9.2973H75.535C76.3504 9.2973 77.1342 9.39842 77.8863 9.60066C78.6385 9.80291 79.342 10.0901 79.9969 10.4622C80.6518 10.8303 81.2518 11.2732 81.7969 11.791C82.3377 12.3127 82.8004 12.8891 83.1849 13.5201C83.5736 14.1511 83.8736 14.8266 84.0849 15.5466C84.2962 16.2706 84.4018 17.021 84.4018 17.7976C84.4018 18.9625 84.1694 20.0627 83.7046 21.0982C83.2398 22.1296 82.606 23.0296 81.8032 23.7981C80.9962 24.5707 80.0539 25.1774 78.9765 25.6183C77.899 26.0632 76.7518 26.2857 75.535 26.2857H71.092ZM91.1771 22.0507H100.057V17.7976C100.057 17.2151 99.9404 16.665 99.708 16.1473C99.4798 15.6295 99.1629 15.1785 98.7573 14.7943C98.3559 14.41 97.8848 14.1066 97.3439 13.8842C96.8031 13.6617 96.2284 13.5505 95.62 13.5505C95.0116 13.5505 94.4369 13.6617 93.8961 13.8842C93.351 14.1066 92.8778 14.41 92.4764 14.7943C92.075 15.1785 91.7581 15.6295 91.5257 16.1473C91.2933 16.665 91.1771 17.2151 91.1771 17.7976V22.0507ZM104.499 17.7976V30.5389H100.057V26.2857H91.1771V30.5389H86.7532V17.7976C86.7532 16.6246 86.9856 15.5223 87.4503 14.4909C87.9151 13.4595 88.5468 12.5575 89.3454 11.7849C90.144 11.0164 91.082 10.4096 92.1595 9.9647C93.2369 9.51976 94.3904 9.2973 95.62 9.2973C96.8453 9.2973 97.9967 9.51976 99.0742 9.9647C100.156 10.4096 101.098 11.0164 101.901 11.7849C102.704 12.5575 103.338 13.4595 103.802 14.4909C104.267 15.5223 104.499 16.6246 104.499 17.7976ZM123.716 24.6597L126.068 28.3607C125.037 29.2101 123.881 29.8614 122.601 30.3144C121.325 30.7715 120 31 118.627 31C117.575 31 116.561 30.8685 115.585 30.6056C114.609 30.3427 113.696 29.9726 112.847 29.4953C111.997 29.014 111.222 28.4376 110.521 27.7661C109.819 27.0947 109.217 26.3525 108.714 25.5394C108.216 24.7264 107.829 23.8527 107.554 22.9184C107.28 21.984 107.142 21.0132 107.142 20.0061C107.142 18.9989 107.28 18.0261 107.554 17.0877C107.829 16.1493 108.216 15.2736 108.714 14.4606C109.217 13.6435 109.819 12.8992 110.521 12.2278C111.222 11.5564 111.997 10.982 112.847 10.5047C113.696 10.0274 114.609 9.65729 115.585 9.39437C116.561 9.13146 117.575 9 118.627 9C120 9 121.325 9.22449 122.601 9.67347C123.881 10.1224 125.037 10.7777 126.068 11.6393L123.716 15.3403C123.066 14.6689 122.297 14.1532 121.409 13.7932C120.522 13.4332 119.594 13.2532 118.627 13.2532C117.647 13.2532 116.728 13.4311 115.87 13.7871C115.016 14.143 114.268 14.6244 113.626 15.2311C112.988 15.8378 112.483 16.5538 112.111 17.3789C111.74 18.2041 111.554 19.0798 111.554 20.0061C111.554 20.9364 111.74 21.8081 112.111 22.6211C112.483 23.4341 112.988 24.148 113.626 24.7628C114.268 25.3736 115.016 25.857 115.87 26.2129C116.728 26.5689 117.647 26.7468 118.627 26.7468C119.594 26.7468 120.522 26.5668 121.409 26.2068C122.297 25.8468 123.066 25.3311 123.716 24.6597ZM143.846 26.2857V30.5389H128.634V9.2973H143.846V13.5505H133.077V17.7976H140.366V22.0507H133.077V26.2857H143.846ZM171.029 26.2857V30.5389H155.818V9.2973H171.029V13.5505H160.261V17.7976H167.55V22.0507H160.261V26.2857H171.029ZM184.117 23.8891V30.5389H179.693V23.8891C178.713 23.6505 177.813 23.2703 176.993 22.7485C176.174 22.2227 175.47 21.5977 174.883 20.8737C174.295 20.1497 173.839 19.3447 173.514 18.4589C173.188 17.5771 173.026 16.6468 173.026 15.668V9.2973H177.469V15.668C177.469 16.2504 177.583 16.8005 177.811 17.3183C178.043 17.836 178.362 18.287 178.768 18.6713C179.169 19.0596 179.64 19.365 180.181 19.5874C180.722 19.8099 181.297 19.9211 181.905 19.9211C182.514 19.9211 183.088 19.8099 183.629 19.5874C184.174 19.365 184.647 19.0596 185.049 18.6713C185.45 18.287 185.767 17.836 185.999 17.3183C186.232 16.8005 186.348 16.2504 186.348 15.668V9.2973H190.772V15.668C190.772 16.6468 190.609 17.5771 190.284 18.4589C189.959 19.3447 189.502 20.1497 188.915 20.8737C188.328 21.5977 187.626 22.2227 186.811 22.7485C185.995 23.2703 185.097 23.6505 184.117 23.8891ZM209 26.2857V30.5389H193.789V9.2973H209V13.5505H198.232V17.7976H205.52V22.0507H198.232V26.2857H209Z"
        fill="white" />
      <g clip-path="url(#clip0_2910_4983)">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M14.738 8.6665C14.2386 8.66666 13.7481 8.79883 13.3162 9.0496C12.8843 9.30038 12.5264 9.66085 12.2787 10.0945L7.20701 18.9699C6.96196 19.3983 6.83304 19.8832 6.83301 20.3767V26.7488C6.83304 27.1885 6.93538 27.6221 7.13192 28.0153L8.71576 31.183C8.95101 31.6538 9.31273 32.0497 9.76037 32.3265C10.208 32.6032 10.7239 32.7498 11.2502 32.7498H12.4997C13.2511 32.7498 13.9718 32.4513 14.5031 31.92C15.0345 31.3886 15.333 30.668 15.333 29.9165H26.6663C26.6663 30.668 26.9649 31.3886 27.4962 31.92C28.0276 32.4513 28.7482 32.7498 29.4997 32.7498H30.7492C31.2755 32.7498 31.7913 32.6032 32.239 32.3265C32.6866 32.0497 33.0483 31.6538 33.2836 31.183L34.8674 28.0153C35.0643 27.6229 35.1663 27.188 35.1663 26.7488V20.3767C35.1663 19.8832 35.0374 19.3983 34.7923 18.9699L29.7207 10.0945C29.473 9.66085 29.115 9.30038 28.6831 9.0496C28.2513 8.79883 27.7608 8.66666 27.2613 8.6665H14.738ZM20.9997 19.9998C18.7373 19.9998 16.6477 19.5139 14.5496 18.7319C14.2133 18.564 13.8241 18.5365 13.4676 18.6555C13.111 18.7745 12.8164 19.0303 12.6484 19.3666C12.4805 19.7029 12.453 20.0921 12.572 20.4486C12.691 20.8052 12.9468 21.0998 13.2831 21.2678C13.9829 21.6148 17.543 22.8332 20.9997 22.8332C23.6262 22.8332 26.3377 22.445 28.7134 21.2692C29.048 21.099 29.3023 20.8043 29.4216 20.4484C29.5408 20.0925 29.5154 19.704 29.3509 19.3666C29.2678 19.2 29.1527 19.0515 29.0122 18.9294C28.8716 18.8074 28.7084 18.7142 28.5319 18.6553C28.3553 18.5963 28.1689 18.5728 27.9832 18.5859C27.7975 18.5991 27.6162 18.6487 27.4498 18.7319C25.516 19.6981 23.119 19.9998 20.9997 19.9998Z"
          fill="white" />
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M20.9996 19.9997C18.7372 19.9997 16.6476 19.5138 14.5495 18.7318C14.2133 18.5639 13.824 18.5364 13.4675 18.6554C13.111 18.7744 12.8163 19.0302 12.6484 19.3665C12.4804 19.7028 12.4529 20.092 12.572 20.4485C12.691 20.805 12.9468 21.0997 13.283 21.2677C13.9829 21.6147 17.5429 22.8331 20.9996 22.8331C23.6261 22.8331 26.3376 22.4449 28.7134 21.2691C29.0479 21.0989 29.3023 20.8041 29.4215 20.4483C29.5408 20.0924 29.5154 19.7038 29.3509 19.3665C29.2678 19.1999 29.1527 19.0514 29.0121 18.9293C28.8716 18.8073 28.7084 18.7141 28.5318 18.6552C28.3552 18.5962 28.1688 18.5727 27.9831 18.5858C27.7974 18.599 27.6162 18.6486 27.4497 18.7318C25.5159 19.698 23.1189 19.9997 20.9996 19.9997Z"
          fill="#1E1E1E" />
      </g>
      <defs>
        <clipPath id="clip0_2910_4983">
          <rect width="34" height="34" fill="white" transform="translate(4 3)" />
        </clipPath>
      </defs>`;
      /* hamburger換成白色版本 */
      svg[1].innerHTML = `
      <mask id="mask0_3116_1199" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="28">
        <rect width="28" height="28" fill="#1E1E1E" />
      </mask>
      <g mask="url(#mask0_3116_1199)">
        <path d="M3.5 21V18.6667H24.5V21H3.5ZM3.5 15.1667V12.8333H24.5V15.1667H3.5ZM3.5 9.33333V7H24.5V9.33333H3.5Z"
          fill="white" />
      </g>
      `;

    }
    else{
      render();
    }
  })
}
/* 初始載入的預設畫面 */
function render(){
  /* logo換回黑字版本 */
  svg[0].innerHTML = `
      <path
        d="M46 15.668C46 14.7902 46.1754 13.9651 46.5261 13.1925C46.8768 12.424 47.3521 11.7505 47.9521 11.1721C48.5563 10.5937 49.2619 10.1366 50.069 9.80088C50.8718 9.46516 51.7316 9.2973 52.6485 9.2973H62.8337V13.5505H52.6485C52.3401 13.5505 52.0528 13.6051 51.7866 13.7143C51.5161 13.8195 51.2816 13.9691 51.0831 14.1633C50.8802 14.3574 50.7218 14.5819 50.6077 14.8367C50.4936 15.0956 50.4366 15.3727 50.4366 15.668C50.4366 15.9632 50.4936 16.2423 50.6077 16.5052C50.7218 16.7641 50.8802 16.9906 51.0831 17.1848C51.2816 17.3789 51.5161 17.5306 51.7866 17.6398C52.0528 17.745 52.3401 17.7976 52.6485 17.7976H57.0915C58.0083 17.7976 58.8724 17.9634 59.6837 18.2951C60.4949 18.6268 61.2027 19.0818 61.8069 19.6602C62.4069 20.2386 62.8801 20.9141 63.2266 21.6867C63.5731 22.4633 63.7463 23.2905 63.7463 24.1682C63.7463 25.046 63.5731 25.8711 63.2266 26.6437C62.8801 27.4122 62.4069 28.0857 61.8069 28.6641C61.2027 29.2425 60.4949 29.6996 59.6837 30.0353C58.8724 30.371 58.0083 30.5389 57.0915 30.5389H47.2359V26.2857H57.0915C57.3999 26.2857 57.6893 26.2311 57.9598 26.1219C58.226 26.0167 58.4605 25.8671 58.6633 25.6729C58.8661 25.4788 59.0224 25.2543 59.1323 24.9994C59.2464 24.7406 59.3034 24.4635 59.3034 24.1682C59.3034 23.873 59.2464 23.5959 59.1323 23.337C59.0224 23.0822 58.8661 22.8577 58.6633 22.6635C58.4605 22.4734 58.226 22.3238 57.9598 22.2146C57.6893 22.1054 57.3999 22.0507 57.0915 22.0507H52.6485C51.7316 22.0507 50.8718 21.8829 50.069 21.5472C49.2619 21.2114 48.5563 20.7544 47.9521 20.176C47.3521 19.5975 46.8768 18.922 46.5261 18.1495C46.1754 17.3729 46 16.5457 46 15.668ZM75.535 13.5505H71.092V22.0507H75.535C76.1434 22.0507 76.7159 21.9395 77.2525 21.717C77.7892 21.4946 78.2582 21.1912 78.6596 20.8069C79.061 20.4227 79.3779 19.9717 79.6103 19.4539C79.8427 18.9322 79.9589 18.38 79.9589 17.7976C79.9589 17.2151 79.8427 16.665 79.6103 16.1473C79.3779 15.6295 79.061 15.1785 78.6596 14.7943C78.2582 14.41 77.7892 14.1066 77.2525 13.8842C76.7159 13.6617 76.1434 13.5505 75.535 13.5505ZM71.092 26.2857V30.5389H66.6555V9.2973H75.535C76.3504 9.2973 77.1342 9.39842 77.8863 9.60066C78.6385 9.80291 79.342 10.0901 79.9969 10.4622C80.6518 10.8303 81.2518 11.2732 81.7969 11.791C82.3377 12.3127 82.8004 12.8891 83.1849 13.5201C83.5736 14.1511 83.8736 14.8266 84.0849 15.5466C84.2962 16.2706 84.4018 17.021 84.4018 17.7976C84.4018 18.9625 84.1694 20.0627 83.7046 21.0982C83.2398 22.1296 82.606 23.0296 81.8032 23.7981C80.9962 24.5707 80.0539 25.1774 78.9765 25.6183C77.899 26.0632 76.7518 26.2857 75.535 26.2857H71.092ZM91.1771 22.0507H100.057V17.7976C100.057 17.2151 99.9404 16.665 99.708 16.1473C99.4798 15.6295 99.1629 15.1785 98.7573 14.7943C98.3559 14.41 97.8848 14.1066 97.3439 13.8842C96.8031 13.6617 96.2284 13.5505 95.62 13.5505C95.0116 13.5505 94.4369 13.6617 93.8961 13.8842C93.351 14.1066 92.8778 14.41 92.4764 14.7943C92.075 15.1785 91.7581 15.6295 91.5257 16.1473C91.2933 16.665 91.1771 17.2151 91.1771 17.7976V22.0507ZM104.499 17.7976V30.5389H100.057V26.2857H91.1771V30.5389H86.7532V17.7976C86.7532 16.6246 86.9856 15.5223 87.4503 14.4909C87.9151 13.4595 88.5468 12.5575 89.3454 11.7849C90.144 11.0164 91.082 10.4096 92.1595 9.9647C93.2369 9.51976 94.3904 9.2973 95.62 9.2973C96.8453 9.2973 97.9967 9.51976 99.0742 9.9647C100.156 10.4096 101.098 11.0164 101.901 11.7849C102.704 12.5575 103.338 13.4595 103.802 14.4909C104.267 15.5223 104.499 16.6246 104.499 17.7976ZM123.716 24.6597L126.068 28.3607C125.037 29.2101 123.881 29.8614 122.601 30.3144C121.325 30.7715 120 31 118.627 31C117.575 31 116.561 30.8685 115.585 30.6056C114.609 30.3427 113.696 29.9726 112.847 29.4953C111.997 29.014 111.222 28.4376 110.521 27.7661C109.819 27.0947 109.217 26.3525 108.714 25.5394C108.216 24.7264 107.829 23.8527 107.554 22.9184C107.28 21.984 107.142 21.0132 107.142 20.0061C107.142 18.9989 107.28 18.0261 107.554 17.0877C107.829 16.1493 108.216 15.2736 108.714 14.4606C109.217 13.6435 109.819 12.8992 110.521 12.2278C111.222 11.5564 111.997 10.982 112.847 10.5047C113.696 10.0274 114.609 9.65729 115.585 9.39437C116.561 9.13146 117.575 9 118.627 9C120 9 121.325 9.22449 122.601 9.67347C123.881 10.1224 125.037 10.7777 126.068 11.6393L123.716 15.3403C123.066 14.6689 122.297 14.1532 121.409 13.7932C120.522 13.4332 119.594 13.2532 118.627 13.2532C117.647 13.2532 116.728 13.4311 115.87 13.7871C115.016 14.143 114.268 14.6244 113.626 15.2311C112.988 15.8378 112.483 16.5538 112.111 17.3789C111.74 18.2041 111.554 19.0798 111.554 20.0061C111.554 20.9364 111.74 21.8081 112.111 22.6211C112.483 23.4341 112.988 24.148 113.626 24.7628C114.268 25.3736 115.016 25.857 115.87 26.2129C116.728 26.5689 117.647 26.7468 118.627 26.7468C119.594 26.7468 120.522 26.5668 121.409 26.2068C122.297 25.8468 123.066 25.3311 123.716 24.6597ZM143.846 26.2857V30.5389H128.634V9.2973H143.846V13.5505H133.077V17.7976H140.366V22.0507H133.077V26.2857H143.846ZM171.029 26.2857V30.5389H155.818V9.2973H171.029V13.5505H160.261V17.7976H167.55V22.0507H160.261V26.2857H171.029ZM184.117 23.8891V30.5389H179.693V23.8891C178.713 23.6505 177.813 23.2703 176.993 22.7485C176.174 22.2227 175.47 21.5977 174.883 20.8737C174.295 20.1497 173.839 19.3447 173.514 18.4589C173.188 17.5771 173.026 16.6468 173.026 15.668V9.2973H177.469V15.668C177.469 16.2504 177.583 16.8005 177.811 17.3183C178.043 17.836 178.362 18.287 178.768 18.6713C179.169 19.0596 179.64 19.365 180.181 19.5874C180.722 19.8099 181.297 19.9211 181.905 19.9211C182.514 19.9211 183.088 19.8099 183.629 19.5874C184.174 19.365 184.647 19.0596 185.049 18.6713C185.45 18.287 185.767 17.836 185.999 17.3183C186.232 16.8005 186.348 16.2504 186.348 15.668V9.2973H190.772V15.668C190.772 16.6468 190.609 17.5771 190.284 18.4589C189.959 19.3447 189.502 20.1497 188.915 20.8737C188.328 21.5977 187.626 22.2227 186.811 22.7485C185.995 23.2703 185.097 23.6505 184.117 23.8891ZM209 26.2857V30.5389H193.789V9.2973H209V13.5505H198.232V17.7976H205.52V22.0507H198.232V26.2857H209Z"
        fill="#1E1E1E" />
      <g clip-path="url(#clip0_2907_3371)">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M14.738 8.6665C14.2386 8.66666 13.7481 8.79883 13.3162 9.0496C12.8843 9.30038 12.5264 9.66085 12.2787 10.0945L7.20701 18.9699C6.96196 19.3983 6.83304 19.8832 6.83301 20.3767V26.7488C6.83304 27.1885 6.93538 27.6221 7.13192 28.0153L8.71576 31.183C8.95101 31.6538 9.31273 32.0497 9.76037 32.3265C10.208 32.6032 10.7239 32.7498 11.2502 32.7498H12.4997C13.2511 32.7498 13.9718 32.4513 14.5031 31.92C15.0345 31.3886 15.333 30.668 15.333 29.9165H26.6663C26.6663 30.668 26.9649 31.3886 27.4962 31.92C28.0276 32.4513 28.7482 32.7498 29.4997 32.7498H30.7492C31.2755 32.7498 31.7913 32.6032 32.239 32.3265C32.6866 32.0497 33.0483 31.6538 33.2836 31.183L34.8674 28.0153C35.0643 27.6229 35.1663 27.188 35.1663 26.7488V20.3767C35.1663 19.8832 35.0374 19.3983 34.7923 18.9699L29.7207 10.0945C29.473 9.66085 29.115 9.30038 28.6831 9.0496C28.2513 8.79883 27.7608 8.66666 27.2613 8.6665H14.738ZM20.9997 19.9998C18.7373 19.9998 16.6477 19.5139 14.5496 18.7319C14.2133 18.564 13.8241 18.5365 13.4676 18.6555C13.111 18.7745 12.8164 19.0303 12.6484 19.3666C12.4805 19.7029 12.453 20.0921 12.572 20.4486C12.691 20.8052 12.9468 21.0998 13.2831 21.2678C13.9829 21.6148 17.543 22.8332 20.9997 22.8332C23.6262 22.8332 26.3377 22.445 28.7134 21.2692C29.048 21.099 29.3023 20.8043 29.4216 20.4484C29.5408 20.0925 29.5154 19.704 29.3509 19.3666C29.2678 19.2 29.1527 19.0515 29.0122 18.9294C28.8716 18.8074 28.7084 18.7142 28.5319 18.6553C28.3553 18.5963 28.1689 18.5728 27.9832 18.5859C27.7975 18.5991 27.6162 18.6487 27.4498 18.7319C25.516 19.6981 23.119 19.9998 20.9997 19.9998Z"
          fill="black" />
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M20.9996 19.9997C18.7372 19.9997 16.6476 19.5138 14.5495 18.7318C14.2133 18.5639 13.824 18.5364 13.4675 18.6554C13.111 18.7744 12.8163 19.0302 12.6484 19.3665C12.4804 19.7028 12.4529 20.092 12.572 20.4485C12.691 20.805 12.9468 21.0997 13.283 21.2677C13.9829 21.6147 17.5429 22.8331 20.9996 22.8331C23.6261 22.8331 26.3376 22.4449 28.7134 21.2691C29.0479 21.0989 29.3023 20.8041 29.4215 20.4483C29.5408 20.0924 29.5154 19.7038 29.3509 19.3665C29.2678 19.1999 29.1527 19.0514 29.0121 18.9293C28.8716 18.8073 28.7084 18.7141 28.5318 18.6552C28.3552 18.5962 28.1688 18.5727 27.9831 18.5858C27.7974 18.599 27.6162 18.6486 27.4497 18.7318C25.5159 19.698 23.1189 19.9997 20.9996 19.9997Z"
          fill="#93FF00" />
      </g>
      <defs>
        <clipPath id="clip0_2907_3371">
          <rect width="34" height="34" fill="white" transform="translate(4 3)" />
        </clipPath>
      </defs>
      `;
  /* hamburger換回黑色版本 */
  svg[1].innerHTML = `
      <mask id="mask0_2609_18108" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="28">
        <rect width="28" height="28" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2609_18108)">
        <path d="M3.5 21V18.6667H24.5V21H3.5ZM3.5 15.1667V12.8333H24.5V15.1667H3.5ZM3.5 9.33333V7H24.5V9.33333H3.5Z"
          fill="#1E1E1E" />
      </g>
    `;
}

render();