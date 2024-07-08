import tailwindCSS from '/styles/tailwind.css?inline'; // css 파일 inline 가져오기

import home from '/assets/icon/home.svg';
import fullHome from '/assets/icon/full-home.svg';
import board from '/assets/icon/board.svg';
import fullBoard from '/assets/icon/full-board.svg';
import map from '/assets/icon/map.svg';
import fullMap from '/assets/icon/full-map.svg';
import chat from '/assets/icon/chat.svg';
import fullChat from '/assets/icon/full-chat.svg';
import my from '/assets/icon/my.svg';
import fullMy from '/assets/icon/full-my.svg';

export class Navigation extends HTMLElement {
  constructor() {
    super();

    const navigationTemplate = document.createElement('template');
    navigationTemplate.innerHTML = `
      <style> ${tailwindCSS} </style>
      <nav class="fixed bottom-0 w-full max-w-screen-md bg-background px-3 pb-6 pt-2">
        <ul class="flex justify-between">
          <li>
            <a href="/" class="flex flex-col items-center text-sm">
              <img src=${this.dataset.page === '홈' ? fullHome : home} alt="홈" aria-hidden="true" class="w-5 xs:w-7" />
              <span class="text-sm leading-[160%] xs:text-base">홈</span>
            </a>
          </li>
          <li>
            <a href="/pages/board/" class="flex flex-col items-center text-sm">
              <img src=${this.dataset.page === '게시판' ? fullBoard : board} alt="홈" aria-hidden="true" class="w-5 xs:w-7" />
              <span class="text-sm leading-[160%] xs:text-base">게시판</span>
            </a>
          </li>
          <li>
            <a href="/pages/exchange/" class="flex flex-col items-center text-sm">
              <img src=${this.dataset.page === '내 근처' ? fullMap : map} alt="홈" aria-hidden="true" class="w-5 xs:w-7" />
              <span class="text-sm leading-[160%] xs:text-base">내 근처</span>
            </a>
          </li>
          <li>
            <a href="pages/chat/" class="flex flex-col items-center text-sm">
              <img src=${this.dataset.page === '채팅' ? fullChat : chat} alt="홈" aria-hidden="true" class="w-5 xs:w-7" />
              <span class="text-sm leading-[160%] xs:text-base">채팅</span>
            </a>
          </li>
          <li>
            <a href="/pages/profile/" class="flex flex-col items-center text-sm">
              <img src=${this.dataset.page === '나의 이듬' ? fullMy : my} alt="홈" aria-hidden="true" class="w-5 xs:w-7" />
              <span class="text-sm leading-[160%] xs:text-base">나의 이듬</span>
            </a>
          </li>
        </ul>
      </nav>
    `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(navigationTemplate.content.cloneNode(true));
  }
}

customElements.define('c-navigation', Navigation);
