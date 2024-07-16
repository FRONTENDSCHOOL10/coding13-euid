import pb from '/api/pocketbase/';
import { UserService } from '/service/UserService';
import { getPbImagesURL } from '/api/getPbImageURL/';

// 변수 사용 편의를 위해 코드 전제를 함수로 감싸기
async function searchResultPage() {
  /* ---------------------- 로그인 유저 식별 --------------------- */
  const currentUser = await UserService.currentUser();

  /* ---------------------- 포켓베이스 데이터 --------------------- */
  const user = await pb.collection('users').getOne(currentUser.id);
  const recentSearch = user.recent_search;
  const recentSearchArray = recentSearch.split(',');

  /* ---------------------- DOM 요소 선택 --------------------- */
  const searchInput = document.querySelector('#search');
  const exchangeList = document.querySelector('#exchange-list');
  const filterList = document.querySelector('#filter-list');
  const orderButton = document.querySelector('#order-button');
  const modalCategory = document.querySelector('#category');
  const modalPrice = document.querySelector('#price');
  const modalOrder = document.querySelector('#order');
  const applyCategory = document.querySelector('#apply-category');
  const applyRange = document.querySelector('#apply-range');
  const orderOption = document.querySelector('#order-option');

  /* -------------------- query string -------------------- */
  const searchParams = new URLSearchParams(location.search);
  const recentSearchText = searchParams.get('search');

  // 검색어를 검색창에 입력
  searchInput.value = recentSearchText;

  /* ---------------------- 검색 기능 구현 ---------------------- */
  // 검색어 입력하고 엔터 입력 시 해당 검색어 검색 결과 페이지로 이동
  function handleSearch(e) {
    if (e.keyCode === 13) {
      e.preventDefault();

      const searchText = searchInput.value.trim();

      if (searchText.length > 0) {
        const encodeText = encodeURIComponent(searchText);
        window.location.href = `/pages/search-result/index.html?search=${encodeText}`;
      }
    }
  }

  searchInput.addEventListener('keypress', handleSearch);

  /* ---------------------- 검색 결과 렌더링 --------------------- */
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
      const createTimestamp = Date.parse(item.created.slice(0, 19));
      const now = new Date();
      const nowTimestamp = now.getTime();

      const seconds = Math.floor((nowTimestamp - createTimestamp) / 1000);
      if (seconds < 60) return '방금 전';

      const minutes = seconds / 60;
      if (minutes < 60) return `${Math.floor(minutes)}분 전`;

      const hours = minutes / 60;
      if (hours < 24) return `${Math.floor(hours)}시간 전`;

      const days = hours / 24;
      if (days < 7) return `${Math.floor(days)}일 전`;
      else if (days < 30) return `${Math.floor(days / 7)}주 전`;
      else if (days < 365) return `${Math.floor(days / 30)}달 전`;
      else return '오래 전';
    };

    time.insertAdjacentHTML('beforeend', elapsedTime());
  }

  // 렌더링 함수
  async function renderSearchResult() {
    const searchTextArray = recentSearchText.split(' ');
    const filteringText = searchTextArray.map((item) => `title ~ '${item}'`).join(' && ');

    const postList = await pb.collection('posts').getFullList({
      sort: 'created',
      filter: `${filteringText}`,
    });

    for (let item of postList) {
      const postCreator = await pb.collection('users').getOne(item.user_id);

      // 좋아요 수에 각 게시글에 저장된 좋아요 개수를 불러오도록 수정해야 합니다. (pocketbase 항목 추가 필요)
      const template = `
      <li>
        <a
          href="/pages/exchange-detail/index.html?post=${item.id}"
          class="relative flex gap-3 border-b border-gray-200 bg-background p-3 outline-0 focus:shadow-[inset_0_0_0_2px_#719cf7] xs:gap-[1.05rem] xs:p-[1.05rem] sm:gap-[1.35rem] sm:p-[1.35rem]"
        >
          <figure
            class="aspect-square w-[5.625rem] flex-shrink-0 overflow-hidden rounded-md bg-gray-200 xs:w-[7.875rem] sm:w-[10.125rem]"
          >
            <img class="object-cover" src="${getPbImagesURL(item, 0)}" alt="거래 물품 대표 사진" />
          </figure>
          <section class="flex w-full flex-col justify-center overflow-hidden" aria-label="거래 물품 정보">
            <h2 class="text-base-group truncate leading-[1.6] text-contentPrimary">
              ${item.title}
            </h2>
            <span class="text-sm-group leading-[1.6] text-contentTertiary">${postCreator.address} · </span>
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
          >
            <img src="/icon/heart.svg" alt="좋아요" class="w-[0.875rem] xs:w-[1.225rem] sm:w-[1.575rem]" />
            4
          </span>
        </a>
      </li>
    `;

      exchangeList.insertAdjacentHTML('afterbegin', template);

      renderState(item);

      renderTime(item);
    }
  }

  renderSearchResult().then(() => {
    if (!exchangeList.textContent) {
      exchangeList.innerHTML = `
        <li class="text-base-group pt-40 text-center text-contentPrimary">
          앗! ${user.address} 근처에는 <br />
          '<span class="font-semibold">${recentSearchText}</span>' 검색 결과가 없어요.
        </li>
      `;
    }
  });

  /* ------------------ 검색어 최근 검색어 목록에 추가 ----------------- */
  if (recentSearchArray.includes(recentSearchText)) {
    // 이미 최근 검색어 목록에 있을 때
    // 삭제하고 맨 뒤에 다시 추가
    const filteredArray = recentSearchArray.filter((value) => value !== recentSearchText);
    filteredArray.push(recentSearchText);
    const data = { recent_search: filteredArray.toString() };

    await pb.collection('users').update(currentUser.id, data);
  } else {
    // 최근 검색어 목록에 없을 때
    recentSearchArray.push(recentSearchText);
    const data = { recent_search: recentSearchArray.toString() };

    await pb.collection('users').update(currentUser.id, data);
  }

  /* ----------------------- 모달창 열기 ----------------------- */
  function handleModal(e) {
    const modalOpenButton = e.target.closest('button');

    if (!modalOpenButton) return;
    if (modalOpenButton.dataset.name === 'category') {
      modalCategory.showModal();

      applyCategory.addEventListener('click', () => {
        modalCategory.close();
      });
    }

    if (modalOpenButton.dataset.name === 'price') {
      modalPrice.showModal();

      applyRange.addEventListener('click', () => {
        modalPrice.close();
      });
    }
    if (modalOpenButton.dataset.name === 'order') {
      modalOrder.showModal();

      orderOption.addEventListener('click', (e) => {
        const radioSelect = e.target.closest('label');

        if (!radioSelect) return;

        const selectText = radioSelect.textContent;

        orderButton.innerHTML = `${selectText} 
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3 xs:h-[1.05rem] xs:w-[1.05rem] sm:h-[1.35rem] sm:w-[1.35rem]"
          >
            <path
              d="M16.6923 7.94229L10.4423 14.1923C10.3842 14.2504 10.3153 14.2965 10.2394 14.328C10.1636 14.3594 10.0822 14.3756 10.0001 14.3756C9.91797 14.3756 9.83664 14.3594 9.76077 14.328C9.68489 14.2965 9.61596 14.2504 9.55792 14.1923L3.30792 7.94229C3.19064 7.82502 3.12476 7.66596 3.12476 7.5001C3.12476 7.33425 3.19064 7.17519 3.30792 7.05792C3.42519 6.94064 3.58425 6.87476 3.7501 6.87476C3.91596 6.87476 4.07502 6.94064 4.19229 7.05792L10.0001 12.8665L15.8079 7.05792C15.866 6.99985 15.9349 6.95378 16.0108 6.92236C16.0867 6.89093 16.168 6.87476 16.2501 6.87476C16.3322 6.87476 16.4135 6.89093 16.4894 6.92236C16.5653 6.95378 16.6342 6.99985 16.6923 7.05792C16.7504 7.11598 16.7964 7.18492 16.8278 7.26079C16.8593 7.33666 16.8755 7.41798 16.8755 7.5001C16.8755 7.58223 16.8593 7.66354 16.8278 7.73941C16.7964 7.81528 16.7504 7.88422 16.6923 7.94229Z"
              fill="black"
              class="group-focus:fill-white"
            />
          </svg>
        `;

        modalOrder.close();
      });
    }
  }

  filterList.addEventListener('click', handleModal);
}

searchResultPage();
