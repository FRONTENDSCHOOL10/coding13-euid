import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import { getPbImagesURL } from '/api/getPbImageURL';
import pb from '/api/pocketbase.js';
import calcTimeDifference from '/utils/calcTimeDifference.js';

import 'swiper/css';
import 'swiper/css/pagination';

// DOM 요소 선택
const swiperWrapper = document.querySelector('.swiper-wrapper');
const userName = document.getElementById('user-name');
const userAddress = document.getElementById('user-address');
const postTitle = document.getElementById('post-title');
const postCategory = document.getElementById('post-category');
const postCreated = document.getElementById('post-created');
const postDescription = document.getElementById('post-description');
const postPrice = document.getElementById('post-price');
const relatedList = document.getElementById('related-list');

// query string으로 판매글 식별
const params = new URLSearchParams(location.search);
const post_id = params.get('post');

// post 내용 렌더링 함수
async function renderPostDetail() {
  // post 정보 불러오기
  const data = await pb.collection('posts').getOne(post_id, {
    expand: 'user_id',
  });
  const { id, user_id, category, photo, title, description, price, state, created } = data;

  // 물품 사진 슬라이드 생성
  photo.forEach((item, index) => {
    // 슬라이드 템플릿
    const slideTemplate = `
      <div aria-roledescription="slide" class="swiper-slide w-screen">
        <img src=${getPbImagesURL(data, index)} alt="물품사진${index + 1}" class="w-screen aspect-square object-cover" />
      </div>
    `;
    // 슬라이드 삽입
    swiperWrapper.insertAdjacentHTML('beforeend', slideTemplate);
  });

  // 판매자 정보 삽입
  const { username, address } = data.expand.user_id;
  userName.innerText = username;
  userAddress.innerText = address;

  // 제목 삽입
  postTitle.innerText = title;
  // 카테고리 삽입
  postCategory.innerText = category;
  // 본문 삽입
  postDescription.innerText = description;
  // 가격 삽입
  postPrice.innerText = `${price.toLocaleString()}원`;
  // 판매글 작성시간 삽입
  postCreated.innerText = calcTimeDifference(created);

  return { id, category };
}

// 연관 글 목록 렌더링 함수
async function renderRelatedList({ id, category }) {
  const list = await pb.collection('posts').getList(1, 4, {
    filter: `category = "${category}" && id != "${id}"`,
    sort: '-created',
  });
  const { items } = list;

  items.forEach((item, index) => {
    const liTemplate = `
      <li class="mb-5 w-[43.125vw] xs:mb-[1.75rem] sm:mb-[2.25rem]">
        <article>
          <img
            src=${getPbImagesURL(item, index)}
            alt="관련 글${index + 1}"
            class="mb-3 w-[43.125vw] object-cover rounded-[5.797101449275362%] [aspect-ratio:8.625/6.5] xs:mb-[1.05rem] sm:mb-[1.35rem]"
          />
          <h4 class="text-sm-group leading-[160%]">${item.title}</h4>
          <strong class="text-sm-group font-semibold">${item.price.toLocaleString()}원</strong>
        </article>
      </li>
    `;

    relatedList.insertAdjacentHTML('beforeend', liTemplate);
  });
}

renderPostDetail().then((res) => {
  // 스와이퍼 정의
  const slides = document.querySelectorAll('.swiper-slide');

  const swiper = new Swiper('.swiper', {
    modules: [Pagination],
    loop: slides.length > 1,
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

  // 연관 글 목록 렌더링
  renderRelatedList(res);
});
