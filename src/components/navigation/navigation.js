import tailwindCSS from '/styles/tailwind.css?inline'; // css 파일 inline 가져오기

import home from '/icon/home.svg';
import fullHome from '/icon/full-home.svg';
import board from '/icon/board.svg';
import fullBoard from '/icon/full-board.svg';
import map from '/icon/map.svg';
import fullMap from '/icon/full-map.svg';
import chat from '/icon/chat.svg';
import fullChat from '/icon/full-chat.svg';
import my from '/icon/my.svg';
import fullMy from '/icon/full-my.svg';

const navigationTemplate = document.createElement('template');
navigationTemplate.innerHTML = `
  <style> ${tailwindCSS} </style>
  <nav
    class="fixed z-40 bottom-0 w-full bg-background px-3 pb-6 pt-2 xs:px-[1.05rem] xs:pb-[2.1rem] xs:pt-[0.7rem] sm:px-[1.35rem] sm:pb-[2.7rem] sm:pt-[0.9rem]"
  >
    <ul class="flex justify-between">
      <li>
        <a href="/" class="flex flex-col items-center text-sm">
          <img id="nav-img-home" src=${home} alt="" class="aspect-square w-5 xs:w-[1.75rem] sm:w-[2.25rem]" />
          <span class="text-sm-group leading-[160%]">홈</span>
        </a>
      </li>
      <li>
        <a href="/pages/board/" class="flex flex-col items-center text-sm">
          <img id="nav-img-board" src=${board} alt="" class="aspect-square w-5 xs:w-[1.75rem] sm:w-[2.25rem]" />
          <span class="text-sm-group leading-[160%]">게시판</span>
        </a>
      </li>
      <li>
        <a href="/pages/exchange/" class="flex flex-col items-center text-sm">
          <img id="nav-img-map" src=${map} alt="" class="aspect-square w-5 xs:w-[1.75rem] sm:w-[2.25rem]" />
          <span class="text-sm-group leading-[160%]">내 근처</span>
        </a>
      </li>
      <li>
        <a href="/pages/chat/" class="flex flex-col items-center text-sm">
          <img id="nav-img-chat" src=${chat} alt="" class="aspect-square w-5 xs:w-[1.75rem] sm:w-[2.25rem]" />
          <span class="text-sm-group leading-[160%]">채팅</span>
        </a>
      </li>
      <li>
        <a href="/pages/profile/" class="flex flex-col items-center text-sm">
          <img id="nav-img-my" src=${my} alt="" class="aspect-square w-5 xs:w-[1.75rem] sm:w-[2.25rem]" />
          <span class="text-sm-group leading-[160%]">나의 이듬</span>
        </a>
      </li>
    </ul>
  </nav>
`;

export class Navigation extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(navigationTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.setNavigationImage();
  }

  setNavigationImage() {
    const dataPage = this.getAttribute('data-page');
    switch (dataPage) {
      case '홈':
        this.shadowRoot.getElementById('nav-img-home').src = fullHome;
        break;
      case '게시판':
        this.shadowRoot.getElementById('nav-img-board').src = fullBoard;
        break;
      case '내 근처':
        this.shadowRoot.getElementById('nav-img-map').src = fullMap;
        break;
      case '채팅':
        this.shadowRoot.getElementById('nav-img-chat').src = fullChat;
        break;
      case '나의 이듬':
        this.shadowRoot.getElementById('nav-img-my').src = fullMy;
        break;

      default:
        break;
    }
  }
}

customElements.define('c-navigation', Navigation);
