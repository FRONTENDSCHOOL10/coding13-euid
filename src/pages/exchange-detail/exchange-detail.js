import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const swiper = new Swiper('.swiper', {
  modules: [Pagination],
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },
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
