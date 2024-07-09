import '/styles/global.css';

import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const swiper = new Swiper('.swiper', {
  modules: [Pagination, Autoplay],
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
    renderFraction: function (currentClass, totalClass) {
      return `
        <span aria-label="현재 슬라이드 번호" class="${currentClass}"></span>
        <svg aria-hidden="true" width="41" height="2" viewBox="0 0 41 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_238_3875)">
          <rect y="0.5" width="41" height="1" fill="white"/>
          <rect y="0.5" width="9" height="1" fill="white"/>
          </g>
          <defs>
          <clipPath id="clip0_238_3875">
          <rect width="41" height="1" fill="white" transform="translate(0 0.5)"/>
          </clipPath>
          </defs>
        </svg>
        <span aria-label="전체 슬라이드 수" class="${totalClass}"></span>
      `;
    },
  },
  // 접근성
  keyboard: {
    enabled: true,
  },
  a11y: {
    enabled: true,
    prevSlideMessage: '이전 슬라이드',
    nextSlideMessage: '다음 슬라이드',
    firstSlideMessage: '첫 번째 슬라이드',
    lastSlideMessage: '마지막 슬라이드',
    paginationBulletMessage: '{{index}}번째 슬라이드로 이동',
  },
});
