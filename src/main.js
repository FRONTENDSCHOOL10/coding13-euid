import globalCSS from '/styles/global.css?inline';
import tailwindCSS from '/styles/tailwind.css?inline';
import swiperCSS from 'swiper/css?inline';
import swiperPaginationCSS from 'swiper/css/pagination?inline';
import '/components/header/header';
import '/components/navigation/navigation';
import '/components/spinner/spinner';

import { UserService } from '/service/UserService.js';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { getPbImagesURL } from '/api/getPbImageURL.js';
import pb from '/api/pocketbase.js';

const MainTemplate = document.createElement('template');
MainTemplate.innerHTML = `
<style>${tailwindCSS}</style>
<style>${globalCSS}</style>
<style>${swiperCSS}</style>
<style>${swiperPaginationCSS}</style>
<h1 class="sr-only">홈 페이지</h1>

<!-- 헤더 -->
<c-header data-page="홈" has-local></c-header>

<!-- 추천 글 슬라이더 -->
<div role="region" aria-label="추천 글 슬라이더" class="swiper h-[66.875vw]">
  <div class="swiper-wrapper">
  </div>
  <div role="group" aria-label="슬라이드 페이지네이션" class="swiper-pagination"></div>
</div>

<!-- 글 목록 -->
<ul
  id="post-list"
  aria-label="전체 글 목록"
  class="flex flex-wrap justify-between px-4 py-3 xs:px-[1.4rem] xs:py-[1.05rem] sm:px-[1.8rem] sm:py-[1.35rem]"
></ul>

<!-- 네비게이션 -->
<c-navigation data-page="홈"></c-navigation>
`;

class Main extends HTMLElement {
  static observedAttributes = ['loading', 'error'];

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.loading = true;
    this.currentUser = null;
  }

  connectedCallback() {
    this.render();

    // 첫 렌더링 후 데이터 fetching 시작하기
    this.fetchData();
  }

  attributeChangedCallback(_attrName, _oldVal, _newVal) {
    this.render();
  }

  get loading() {
    return JSON.parse(this.getAttribute('loading'));
  }

  set loading(value) {
    this.setAttribute('loading', JSON.stringify(value));
  }

  get error() {
    return JSON.parse(this.getAttribute('error'));
  }

  set error(value) {
    this.setAttribute('error', JSON.stringify(value));
  }

  async fetchData() {
    try {
      this.loading = true;
      this.error = null;
      await Promise.all([this.fetchCurrentUser(), this.fetchPosts()]);
    } catch (error) {
      this.error = error?.message
        ? `에러가 발생했습니다: ${error.message}. 잠시 후 새로고침 해주세요.`
        : `에러가 발생했습니다, 잠시 후 새로고침 해주세요.`;
    } finally {
      this.loading = false;
    }
  }

  async fetchCurrentUser() {
    this.currentUser = await UserService.currentUser();
  }

  async fetchPosts() {
    const list = await pb.collection('posts').getList(1, 10, {
      sort: 'interested',
      expand: 'user_id',
    });
    this.items = list.items;
  }

  render() {
    // 렌더링 전 초기화
    this.shadowRoot.innerHTML = '';

    if (this.loading || !this.currentUser) {
      this.shadowRoot.innerHTML = '<c-spinner></c-spinner>';
      return;
    } else if (this.error) {
      this.shadowRoot.innerHTML = `<p>${this.error}</p>`;
      return;
    }

    this.shadowRoot.appendChild(MainTemplate.content.cloneNode(true));

    const postList = this.shadowRoot.getElementById('post-list');
    this.items.forEach((item, index) => {
      if (index > 1) {
        const liTemplate = `
          <li class="mb-7 w-[43.125vw] xs:mb-[2.45rem] sm:mb-[3.15rem]">
            <article>
              <a href="/pages/exchange-detail/index.html?post=${item.id}">
                <img
                  loading="lazy"
                  src=${getPbImagesURL(item, 0)}
                  alt="메인 글${index - 1}"
                  class="mb-3 w-[43.125vw] rounded-[5.797101449275362%] [aspect-ratio:8.625/6.5] xs:mb-[1.05rem] sm:mb-[1.35rem] border object-cover"
                />
                <h2 class="text-sm-group mb-1 leading-[160%] xs:mb-[0.35rem] sm:mb-[0.45rem]">
                  ${item.title}
                </h2>
                <p class="text-sm-group leading-[160%] text-contentSecondary">
                  <span class="sr-only">카테고리: </span>
                  ${item.expand.user_id.category[0]}
                  <span aria-hidden="true">&#124;</span>
                  <span class="sr-only">작성자: </span>
                  ${item.expand.user_id.username}
                </p>
              </a>
            </article>
          </li>
          `;

        postList.insertAdjacentHTML('beforeend', liTemplate);
      } else {
        const swiperTemplate = `
          <article aria-roledescription="slide" class="swiper-slide relative border">
            <div class="p-5 xs:p-[1.75rem] sm:p-[2.25rem]">
              <h2 id="slide1-title" class="text-lg-group font-semibold">
                ${item.title}
              </h2>
              <a href="/pages/exchange-detail/index.html?post=${item.id}" aria-describedby="slide1-title" class="text-sm-group">자세히 보기</a>
            </div>
            <img
              lodading="lazy"
              src=${getPbImagesURL(item, 0)}
              alt="슬라이드${index + 1}"
              class="absolute bottom-0 right-0 w-[50vw] aspect-square"
            />
          </article>
        `;
        this.shadowRoot.querySelector('.swiper-wrapper').insertAdjacentHTML('beforeend', swiperTemplate);
      }
    });

    const swiper = new Swiper(this.shadowRoot.querySelector('.swiper'), {
      modules: [Pagination, Autoplay],
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: this.shadowRoot.querySelector('.swiper-pagination'),
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
          return `
            <span aria-label="현재 슬라이드 번호" class="${currentClass}"></span>
            <div class="w-10 xs:w-[3.5rem] sm:w-[4.5rem] h-[1px] bg-black mx-1"></div>
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
  }
}

customElements.define('c-main', Main);
