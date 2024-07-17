import '/components/spinner/spinner';

import tailwindCSS from '/styles/tailwind.css?inline'; // css 파일 inline 가져오기
import { UserService } from '/service/UserService.js';

import location from '/icon/location.svg';
import search from '/icon/search.svg';
import hamburger from '/icon/hamburger.svg';
import alarmBell from '/icon/alarm-bell.svg';

import directionLeft from '/icon/direction-left.svg';
import home from '/icon/home.svg';
import share from '/icon/share.svg';
import more from '/icon/more.svg';

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
  async renderHomeHeader() {
    this.shadowRoot.innerHTML = '<c-spinner></c-spinner>';

    // 이 부분은 페이지에서도 실행하면 두번인데 어떻게 하지.......
    const currentUser = await UserService.currentUser();

    this.shadowRoot.innerHTML = '';

    const template = document.createElement('template');
    template.innerHTML = `
      <style>${tailwindCSS}</style>
      <header
        class="text-lg-group fixed top-0 z-10 flex w-full justify-between items-center bg-background px-5 py-[0.38rem] text-contentPrimary xs:px-[1.75rem] xs:py-[0.532rem] sm:px-[2.25rem] sm:py-[0.684rem]"
      >
        <div class="flex items-center gap-[0.375rem] xs:gap-[0.525rem] sm:gap-[0.675rem]">
          <img src=${location} alt="위치 아이콘" class="w-5 xs:w-[1.75rem] sm:w-[2.25rem]" />
          <span class="sr-only">현재 주소</span>
          <span class="text-lg-group font-semibold">${currentUser.address}</span>
        </div>
        <div class="flex gap-[0.4375rem] xs:gap-[0.6125rem] sm:gap-[0.7875rem]">
          <a href="/pages/search/" aria-label="검색 페이지로 이동">
            <img src=${search} alt="" class="w-[1.625rem] xs:w-[2.275rem] sm:w-[2.925rem]" />
          </a>
          <button type="button" aria-label="메뉴">
            <img src=${hamburger} alt="" class="w-[1.625rem] xs:w-[2.275rem] sm:w-[2.925rem]" />
          </button>
          <a href="#" aria-label="알림">
            <img src=${alarmBell} alt="" class="w-[1.625rem] xs:w-[2.275rem] sm:w-[2.925rem]" />
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
            <img src=${directionLeft} alt="" class="w-5 xs:w-[1.75rem] sm:w-[2.25rem]" />
          </a>
          <a role="button" href="/" aria-label="홈 페이지로 이동">
            <img src=${home} alt="" class="w-5 xs:w-[1.75rem] sm:w-[2.25rem]" />
          </a>
        </div>

        <!-- 공유하기, 메뉴 더보기 -->
        <div class="flex gap-2 xs:gap-4">
          <button type="button" aria-label="공유하기" class="cursor-pointer">
            <img src=${share} alt="" class="w-5 xs:w-[1.75rem] sm:w-[2.25rem]" />
          </button>
          <button type="button" aria-label="메뉴 더보기" class="cursor-pointer">
            <img src=${more} alt="" class="w-5 xs:w-[1.75rem] sm:w-[2.25rem]" />
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
