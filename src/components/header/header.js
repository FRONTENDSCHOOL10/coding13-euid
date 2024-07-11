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
      <header
        class="text-lg-group fixed top-0 z-10 flex w-full justify-between bg-background px-5 py-[0.38rem] text-contentPrimary xs:px-[1.75rem] xs:py-[0.532rem] sm:px-[2.25rem] sm:py-[0.684rem]"
      >
        <span class="text-lg-group font-semibold">
          <span class="sr-only">현재 주소</span>
          남가좌제2동
        </span>
        <div class="flex gap-[0.4375rem] xs:gap-[0.6125rem] sm:gap-[0.7875rem]">
          <a href="#">
            <img src=${search} alt="검색" class="w-[1.625rem] xs:w-[2.275rem] sm:w-[2.925rem]" />
          </a>
          <a href="#">
            <img src=${hamburger} alt="메뉴바" class="w-[1.625rem] xs:w-[2.275rem] sm:w-[2.925rem]" />
          </a>
          <a href="#">
            <img src=${alarmBell} alt="알림" class="w-[1.625rem] xs:w-[2.275rem] sm:w-[2.925rem]" />
          </a>
        </div>
      </header>

      <div class="pt-[2.509375rem] xs:pt-[4.171875rem] sm:pt-[5.51125rem]"></div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // data-page="거래글"
  renderTradeHeader() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>${tailwindCSS}</style>
      <header
        class="fixed top-0 z-10 flex w-full justify-between bg-background px-[1.125rem] py-2 xs:px-[1.575rem] xs:py-[0.7rem] sm:px-[2.025rem] sm:py-[0.9rem]"
      >
        <!-- 뒤로 가기, 홈으로 가기 -->
        <div class="flex gap-2 xs:gap-[0.7rem] sm:gap-[0.9rem]">
          <a role="button" href="javascript:history.back()" aria-label="이전 페이지로 이동">
            <img src=${directionLeft} alt="이전 페이지로 이동" aria-hidden="true" class="w-5 xs:w-[1.75rem] sm:w-[2.25rem]" />
          </a>
          <a role="button" href="/" aria-label="홈 페이지로 이동">
            <img src=${home} alt="홈 페이지로 이동" aria-hidden="true" class="w-5 xs:w-[1.75rem] sm:w-[2.25rem]" />
          </a>
        </div>

        <!-- 공유하기, 메뉴 더보기 -->
        <div class="flex gap-2 xs:gap-4">
          <button type="button" aria-label="공유하기" class="cursor-pointer">
            <img src=${share} alt="공유하기" aria-hidden="true" class="w-5 xs:w-[1.75rem] sm:w-[2.25rem]" />
          </button>
          <button type="button" aria-label="메뉴 더보기" class="cursor-pointer">
            <img src=${more} alt="메뉴 더보기" aria-hidden="true" class="w-5 xs:w-[1.75rem] sm:w-[2.25rem]" />
          </button>
        </div>
      </header>

      <div class="pt-[2.3125rem] xs:pt-[3.236875rem] sm:pt-[4.161875rem]">
      </div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('c-header', Header);
