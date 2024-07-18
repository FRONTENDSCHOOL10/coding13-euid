import pb from '/api/pocketbase/';
import { UserService } from '/service/UserService';
import { getPbImagesURL } from '/api/getPbImageURL/';
import '/components/spinner/spinner';

// 변수 사용 편의를 위해 코드 전제를 함수로 감싸기
async function searchResultPage() {
  /* ---------------------- 로그인 유저 식별 --------------------- */
  const currentUser = await UserService.currentUser();

  /* ---------------------- 포켓베이스 데이터 --------------------- */
  const user = await pb.collection('users').getOne(currentUser.id);
  const recentSearch = user.recent_search;
  const recentSearchArray = recentSearch?.split(',');

  /* ---------------------- DOM 요소 선택 --------------------- */
  // 스피너
  const spinnerContainer = document.querySelector('.spinner-container');
  // 검색 결과 관련 요소
  const searchInput = document.querySelector('#search');
  const exchangeList = document.querySelector('#exchange-list');
  const possibleCheck = document.querySelector('#possible');
  // 모달창 관련 요소
  const filterList = document.querySelector('#filter-list');
  const orderButton = document.querySelector('#order-button');
  const modalCategory = document.querySelector('#category');
  const modalPrice = document.querySelector('#price');
  const modalOrder = document.querySelector('#order');
  const resetCategoryButton = document.querySelector('#reset-category');
  const resetRangeButton = document.querySelector('#reset-range');
  const applyCategoryButton = document.querySelector('#apply-category');
  const applyRangeButton = document.querySelector('#apply-range');
  const categoryOption = document.querySelector('#category-option');
  const categoryCheckList = categoryOption.querySelectorAll('li input');
  const minPrice = document.querySelector('#min-price');
  const maxPrice = document.querySelector('#max-price');
  const orderOption = document.querySelector('#order-option');

  /* -------------------- query string -------------------- */
  const searchParams = new URLSearchParams(location.search);
  const recentSearchText = searchParams.get('search');

  /* ------------------------------ 중첩 필터링을 위한 문자열 ----------------------------- */
  let optionString = {
    exchangable: '',
    categoryOption: '',
    priceOption: '',
  };

  // 검색어를 검색창에 입력
  searchInput.value = recentSearchText;
  searchInput.placeholder = `${currentUser.address} 근처에서 검색`;

  // html title 설정
  document.title = `Enter EUID | ${recentSearchText} 검색 결과`;

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
  async function renderSearchResult(option, sort = 'created') {
    console.log(option);
    const searchTextArray = recentSearchText.split(' ');
    const searchText = searchTextArray.map((item) => `title ~ "${item}"`).join(' && ');
    console.log(searchText);
    const postList = await pb.collection('posts').getFullList({
      sort,
      expand: 'user_id',
      filter: `address = "${currentUser.address}" && (${searchText}) ${option.exchangable} ${option.categoryOption} ${option.priceOption}`,
    });

    exchangeList.textContent = '';

    for (let item of postList) {
      const postCreator = item.expand.user_id;

      const template = `
      <li>
        <a
          href="/pages/exchange-detail/index.html?post=${item.id}"
          class="relative flex gap-3 border-b border-gray-200 bg-background p-3 outline-0 focus:shadow-[inset_0_0_0_2px_#719cf7] xs:gap-[1.05rem] xs:p-[1.05rem] sm:gap-[1.35rem] sm:p-[1.35rem]"
        >
          <img 
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
            <img src="/icon/heart.svg" alt="" class="w-[0.875rem] xs:w-[1.225rem] sm:w-[1.575rem]" />
            ${item.interested.length}
          </span>
        </a>
      </li>
    `;

      exchangeList.insertAdjacentHTML('afterbegin', template);

      renderState(item);

      renderTime(item);
    }
    spinnerContainer.remove();
  }

  // 검색 결과 없을 시 렌더링 함수
  function noSearchResult() {
    if (!exchangeList.textContent) {
      exchangeList.innerHTML = `
        <li class="text-base-group pt-40 text-center text-contentPrimary">
          앗! ${user.address} 근처에는 <br />
          '<span class="font-semibold">${recentSearchText}</span>' 검색 결과가 없어요.
        </li>
      `;
    }
  }

  renderSearchResult(optionString).then(noSearchResult);

  // '거래가능만 보기' 체크 시
  possibleCheck.addEventListener('click', () => {
    if (possibleCheck.checked) {
      optionString.exchangable = " && state = ''";
      renderSearchResult(optionString).then(noSearchResult);
    } else {
      optionString.exchangable = '';
      renderSearchResult(optionString).then(noSearchResult);
    }
  });

  /* ------------------ 검색어 최근 검색어 목록에 추가 ----------------- */
  // 최근 검색어가 빈문자가 아닐 때만 추가하도록
  if (recentSearchText) {
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
  }

  /* ------------------------- 모달창 ------------------------ */
  // 모달창 열기
  function handleModal(e) {
    const modalOpenButton = e.target.closest('button');

    if (!modalOpenButton) return;
    if (modalOpenButton.dataset.name === 'category') {
      modalCategory.showModal();
    }

    if (modalOpenButton.dataset.name === 'price') {
      modalPrice.showModal();
    }
    if (modalOpenButton.dataset.name === 'order') {
      modalOrder.showModal();
    }
  }

  // 모달창 닫기
  function closeModalOutside(modal) {
    window.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.close();
      }
    });
  }

  closeModalOutside(modalCategory);
  closeModalOutside(modalPrice);
  closeModalOutside(modalOrder);

  // 카테고리 필터링 함수
  function haddleApplyCategory() {
    modalCategory.close();

    const checkedCategories = [...categoryCheckList].filter((input) => input.checked);

    // 어떤 카테고리도 선택되지 않았을 때
    if (checkedCategories.length === 0) {
      optionString.categoryOption = '';
      renderSearchResult(optionString).then(noSearchResult);
      return;
    }

    const filteringTextArray = [];
    for (let item of checkedCategories) {
      filteringTextArray.push(item.nextElementSibling.textContent);
    }

    const filteringText = filteringTextArray.map((item) => `category = "${item}"`).join(' || ');
    console.log(filteringText);
    optionString.categoryOption = ` && (${filteringText})`;
    renderSearchResult(optionString).then(noSearchResult);
  }

  // 카테고리 선택 초기화 함수
  function handleResetCategory() {
    const categoryCheckBox = categoryOption.querySelectorAll('li input');

    categoryCheckBox.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }

  // 가격 범위 필터링 함수
  function handleApplyRange() {
    let priceOption;

    if (!minPrice.value && !maxPrice.value) {
      alert('가격 범위를 입력해주세요.');
      return;
    } else if (!minPrice.value) {
      priceOption = ` && (price >= '0' && price <= '${maxPrice.value}')`;
    } else if (!maxPrice.value) {
      priceOption = ` && (price >= '${minPrice.value}')`;
    } else if (minPrice.value * 1 > maxPrice.value * 1) {
      alert('최대 금액이 최소 금액보다 커야 합니다.');
      return;
    } else {
      priceOption = ` && (price >= '${minPrice.value}' && price <= '${maxPrice.value}')`;
    }

    modalPrice.close();
    optionString.priceOption = priceOption;
    renderSearchResult(optionString).then(noSearchResult);
  }

  // 가격 범위 입력 초기화 함수
  function handleResetRange() {
    minPrice.value = '';
    maxPrice.value = '';
  }

  // 순서 정렬 함수
  function handleOrderOption(e) {
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
            />
          </svg>
        `;

    modalOrder.close();

    if (selectText === '오래된순') {
      renderSearchResult(optionString, '-created').then(noSearchResult);
    } else {
      renderSearchResult(optionString).then(noSearchResult);
    }
  }

  filterList.addEventListener('click', handleModal);
  applyCategoryButton.addEventListener('click', haddleApplyCategory);
  resetCategoryButton.addEventListener('click', handleResetCategory);
  applyRangeButton.addEventListener('click', handleApplyRange);
  resetRangeButton.addEventListener('click', handleResetRange);
  orderOption.addEventListener('click', handleOrderOption);
}

searchResultPage();
