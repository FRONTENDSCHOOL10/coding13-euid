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

const MainTemplate = document.createElement('template');
MainTemplate.innerHTML = `
<style>${tailwindCSS}</style>
<style>${globalCSS}</style>
<style>${swiperCSS}</style>
<style>${swiperPaginationCSS}</style>
<h1 class="sr-only">홈 페이지</h1>

<!-- 헤더 -->
<c-header data-page="홈" has-local></c-header>

<!-- 네비게이션 -->
<c-navigation data-page="홈"></c-navigation>

<!-- 추천 글 슬라이더 -->
<div role="region" aria-label="추천 글 슬라이더" class="swiper h-[66.875vw]">
  <div class="swiper-wrapper">
    <!-- 슬라이드 1 -->
    <article aria-roledescription="slide" class="swiper-slide relative bg-contentTertiary">
      <div class="p-5">
        <h2 id="slide1-title" class="text-lg-group font-semibold text-background">
          풀리지 않는 버그 속<br />개발자로 살아남기
        </h2>
        <a href="#" aria-describedby="slide1-title" class="text-sm-group text-background">자세히 보기</a>
      </div>
      <img
        src="/assets/slideImage.png"
        alt="슬라이드1"
        class="absolute bottom-0 right-0 w-[63.125vw] [aspect-ratio:1.086021505376344]"
      />
    </article>
    <!-- 슬라이드 2 -->
    <article aria-roledescription="slide" class="swiper-slide relative bg-contentTertiary">
      <div class="p-5">
        <h2 id="slide1-title" class="text-lg-group font-semibold text-background">
          풀리지 않는 버그 속<br />개발자로 살아남기
        </h2>
        <a href="#" aria-describedby="slide1-title" class="text-sm-group text-background">자세히 보기</a>
      </div>
      <img
        src="/assets/slideImage.png"
        alt="슬라이드1"
        class="absolute bottom-0 right-0 w-[63.125vw] [aspect-ratio:12.625/11.625]"
      />
    </article>
  </div>
  <div role="group" aria-label="슬라이드 페이지네이션" class="swiper-pagination"></div>
</div>

<!-- 글 목록 -->
<ul
  aria-label="전체 글 목록"
  class="flex flex-wrap justify-between px-4 py-3 xs:px-[1.4rem] xs:py-[1.05rem] sm:px-[1.8rem] sm:py-[1.35rem]"
>
  <li class="mb-7 w-[43.125vw] xs:mb-[2.45rem] sm:mb-[3.15rem]">
    <article>
      <img
        src="/assets/storyImage.png"
        alt="메인 글1"
        class="mb-3 w-[43.125vw] rounded-[5.797101449275362%] [aspect-ratio:8.625/6.5] xs:mb-[1.05rem] sm:mb-[1.35rem]"
      />
      <h2 class="text-sm-group mb-1 leading-[160%] xs:mb-[0.35rem] sm:mb-[0.45rem]">
        디자인에 대해 하나도 알지 못했던 내가 취업할 수 있었던 이유
      </h2>
      <p class="text-sm-group leading-[160%] text-contentSecondary">
        UIUX
        <span aria-hidden="true">&#124;</span>
        1기 수강생 박치열
      </p>
    </article>
  </li>
  <li class="mb-7 w-[43.125vw] xs:mb-[2.45rem] sm:mb-[3.15rem]">
    <article>
      <img
        src="/assets/storyImage.png"
        alt="메인 글2"
        class="mb-3 w-[43.125vw] rounded-[5.797101449275362%] [aspect-ratio:8.625/6.5] xs:mb-[1.05rem] sm:mb-[1.35rem]"
      />
      <h2 class="text-sm-group mb-1 leading-[160%] xs:mb-[0.35rem] sm:mb-[0.45rem]">
        영문과 전공생에서 UIUX 디자이너로 취업하기까지
      </h2>
      <p class="text-sm-group leading-[160%] text-contentSecondary">
        UIUX
        <span aria-hidden="true">&#124;</span>
        3기 수강생 김진우
      </p>
    </article>
  </li>
  <li class="mb-7 w-[43.125vw] xs:mb-[2.45rem] sm:mb-[3.15rem]">
    <article>
      <img
        src="/assets/storyImage.png"
        alt="메인 글3"
        class="mb-3 w-[43.125vw] rounded-[5.797101449275362%] [aspect-ratio:8.625/6.5] xs:mb-[1.05rem] sm:mb-[1.35rem]"
      />
      <h2 class="text-sm-group mb-1 leading-[160%] xs:mb-[0.35rem] sm:mb-[0.45rem]">
        7기 수강생의 삼성으로 가는 피그마 노하우
      </h2>
      <p class="text-sm-group leading-[160%] text-contentSecondary">
        UIUX
        <span aria-hidden="true">&#124;</span>
        7기 수강생 박치열
      </p>
    </article>
  </li>
  <li class="mb-7 w-[43.125vw] xs:mb-[2.45rem] sm:mb-[3.15rem]">
    <article>
      <img
        src="/assets/storyImage.png"
        alt="메인 글4"
        class="mb-3 w-[43.125vw] rounded-[5.797101449275362%] [aspect-ratio:8.625/6.5] xs:mb-[1.05rem] sm:mb-[1.35rem]"
      />
      <h2 class="text-sm-group mb-1 leading-[160%] xs:mb-[0.35rem] sm:mb-[0.45rem]">
        배울 때 내가 가장 힘들었던 A-Z 야, 너도 할 수 있어!
      </h2>
      <p class="text-sm-group leading-[160%] text-contentSecondary">
        UIUX
        <span aria-hidden="true">&#124;</span>
        1기 수강생 박치열
      </p>
    </article>
  </li>
</ul>
`

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
      await this.fetchCurrentUser();
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
  }
}

customElements.define('c-main', Main);
