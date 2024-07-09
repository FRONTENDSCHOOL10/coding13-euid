import tailwindCSS from '/styles/tailwind.css?inline'; // css 파일 inline 가져오기

import search from '/assets/icon/search.svg';
import hamburger from '/assets/icon/hamburger.svg';
import alarmBell from '/assets/icon/alarm-bell.svg';

import directionLeft from '/assets/icon/direction-left.svg';
import home from '/assets/icon/home.svg';
import share from '/assets/icon/share.svg';
import more from '/assets/icon/more.svg';

class Header extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.renderHeader();
  }

  renderHeader() {
    const dataPage = this.dataset.page;
    console.log(dataPage);

    if (dataPage === '홈' || dataPage === '내 근처') {
      this.renderHomeHeader();
    } else if (dataPage === '거래글') {
      this.renderTradeHeader();
    }
  }

  // data-page="홈"
  renderHomeHeader() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>${tailwindCSS}</style>
      <header class="fixed top-0 z-10 flex w-full max-w-screen-md justify-between bg-background px-5 py-[0.38rem] text-lg text-contentPrimary xs:py-2">
        <span class="text-lg font-semibold xs:text-xl">
          <span class="sr-only">현재 주소</span>
          남가좌제2동
        </span>
        <div class="flex gap-[0.4375rem]">
          <a href="#">
            <img src=${search} alt="검색" class="w-[1.625rem] xs:w-9" />
          </a>
          <a href="#">
            <img src=${hamburger} alt="메뉴바" class="w-[1.625rem] xs:w-9" />
          </a>
          <a href="#">
            <img src=${alarmBell} alt="알림" class="w-[1.625rem] xs:w-9" />
          </a>
        </div>
      </header>

      <div class="xs:pt-14 pt-10">
      </div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // data-page="거래글"
  renderTradeHeader() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>${tailwindCSS}</style>
      <header class="fixed top-0 z-10 flex w-full max-w-screen-md justify-between bg-background px-[1.125rem] py-2 xs:py-4">
        <!-- 뒤로 가기, 홈으로 가기 -->
        <div class="flex gap-2 xs:gap-4">
          <a role="button" href="javascript:history.back()" aria-label="이전 페이지로 이동">
            <img
              src=${directionLeft}
              alt="이전 페이지로 이동"
              aria-hidden="true"
              class="w-5 xs:w-7"
            />
          </a>
          <a role="button" href="/" aria-label="홈 페이지로 이동">
            <img src=${home} alt="홈 페이지로 이동" aria-hidden="true" class="w-5 xs:w-7" />
          </a>
        </div>

        <!-- 공유하기, 메뉴 더보기 -->
        <div class="flex gap-2 xs:gap-4">
          <button type="button" aria-label="공유하기" class="cursor-pointer">
            <img src=${share} alt="공유하기" aria-hidden="true" class="w-5 xs:w-7" />
          </button>
          <button type="button" aria-label="메뉴 더보기" class="cursor-pointer">
            <img src=${more} alt="메뉴 더보기" aria-hidden="true" class="w-5 xs:w-7" />
          </button>
        </div>
      </header>

      <div class="xs:pt-15 pt-9">
      </div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('c-header', Header);
