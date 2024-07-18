import pb from '/api/pocketbase/';
import { UserService } from '/service/UserService.js';
import { getPbImagesURL } from '/api/getPbImageURL/';
import '/components/navigation/navigation';
import '/components/header/header';

async function exchange() {
  const currentUser = await UserService.localCurrentUser();

  if (!currentUser.address) {
    alert('주소 정보를 등록해주세요.');
    location.href = '/pages/edit-profile/';
  }

  /* ---------------------- DOM 요소 선택 --------------------- */
  const exchangeList = document.querySelector('#exchange-list');
  const plusButton = document.querySelector('#plus-button');

  /* ---------------------- 거래 목록 렌더링 --------------------- */
  // 게시글 상태 반영 함수
  function renderState(item) {
    const state = exchangeList.querySelector('li > a > section > div > span');

    if (item.state === '거래완료') {
      state.classList.add('bg-contentTertiary');
      state.innerText = '거래 완료';
    }

    if (item.state === '예약중') {
      state.classList.add('bg-tertiary');
      state.innerText = '예약중';
    }

    if (item.state === '') {
      state.classList.add('hidden');
    }
  }

  // 시간 반영 함수
  function renderTime(item) {
    // 31일, 28일 등 달마다 날짜가 다른 것, 윤달 등은 반영되지 않는 코드입니다.
    const time = exchangeList.querySelector('li > a > section > span');

    const elapsedTime = () => {
      const createTimestamp = new Date(item.created);
      const nowTimestamp = new Date();

      const seconds = Math.floor((nowTimestamp - createTimestamp) / 1000);
      const minutes = seconds / 60;
      const hours = minutes / 60;
      const days = hours / 24;

      if (seconds < 60) return '방금 전';
      if (minutes < 60) return `${Math.floor(minutes)}분 전`;
      if (hours < 24) return `${Math.floor(hours)}시간 전`;
      if (days < 7) return `${Math.floor(days)}일 전`;
      else if (days < 30) return `${Math.floor(days / 7)}주 전`;
      else if (days < 365) return `${Math.floor(days / 30)}달 전`;
      else return '오래 전';
    };

    time.insertAdjacentHTML('beforeend', elapsedTime());
  }

  // 렌더링 함수
  async function renderPostList() {
    const postList = await pb.collection('posts').getFullList({
      filter: `address = "${currentUser.address}"`,
      sort: 'created',
      expand: 'user_id',
    });

    for (let item of postList) {
      const postCreator = item.expand.user_id;

      const template = `
      <li>
        <a
          href="/pages/exchange-detail/index.html?post=${item.id}"
          class="relative flex gap-3 border-b border-gray-200 bg-background p-3 outline-0 focus:shadow-[inset_0_0_0_2px_#719cf7] xs:gap-[1.05rem] xs:p-[1.05rem] sm:gap-[1.35rem] sm:p-[1.35rem]"
        >
          <img 
            loading="lazy"
            class="aspect-square w-[5.625rem] flex-shrink-0 rounded-md xs:w-[7.875rem] sm:w-[10.125rem] object-cover" 
            src="${getPbImagesURL(item, 0)}" 
            alt="${item.title} 대표"
          />
          <section class="flex w-full flex-col justify-center overflow-hidden">
            <h2 class="text-base-group truncate leading-[1.6] text-contentPrimary">
              ${item.title}
            </h2>
            <span class="text-sm-group leading-[1.6] text-contentTertiary">${postCreator.address}<span aria-hidden="true"> · </span></span>
            <div class="flex items-center gap-2 xs:gap-[0.7rem] sm:gap-[0.9rem]" role="group">
              <!-- 거래 상태 -->
              <span
                class="text-sm-group rounded px-1 py-0.5 font-semibold leading-normal text-background xs:px-[0.35rem] xs:py-[0.175rem] sm:px-[0.45rem] sm:py-[0.225rem]"
              >
                <span class="sr-only">거래상태</span>
              </span>
              <!-- // 거래 상태 -->
              <span class="text-base-group font-semibold leading-normal">
                <span class="sr-only">물품가격</span>${item.price.toLocaleString()}원
              </span>
            </div>
          </section>
          <span
            class="text-sm-group absolute bottom-2 right-3 flex items-center gap-0.5 leading-[1.6] xs:bottom-[0.7rem] xs:right-[1.05rem] xs:gap-[0.175rem] sm:bottom-[0.9rem] sm:right-[1.35rem] sm:gap-[0.225rem]"
            aria-label="좋아요 개수"
          >
            <img src="/icon/heart.svg" alt="" class=" h-[0.875rem] w-[0.875rem] xs:h-[1.225rem] xs:w-[1.225rem] sm:h-[1.575rem] sm:w-[1.575rem]" />
            ${item.interested.length}
          </span>
        </a>
      </li>
    `;

      exchangeList.insertAdjacentHTML('afterbegin', template);

      renderState(item);

      renderTime(item);
    }
  }

  /* ---------------------- + 버튼 이벤트 ---------------------- */
  function handleClick() {
    const writeButtonList = document.querySelector('#write-button-list');

    writeButtonList.classList.toggle('hidden');
    writeButtonList.classList.toggle('flex');
    plusButton.classList.toggle('bg-background');
    plusButton.classList.toggle('bg-primary');
    plusButton.classList.toggle('before:rotate-45');
    plusButton.classList.toggle('before:bg-contentPrimary');
    plusButton.classList.toggle('after:rotate-45');
    plusButton.classList.toggle('after:bg-contentPrimary');
  }

  renderPostList();

  plusButton.addEventListener('click', handleClick);
}

exchange();
