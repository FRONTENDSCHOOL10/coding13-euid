import { UserService } from '/service/UserService';
import tailwindCSS from '/styles/tailwind.css?inline'; // css 파일 inline 가져오기
import { getPbImageURL } from '/api/getPbImageURL';
import '/components/navigation/navigation';

const ProfileTemplate = document.createElement('template');
ProfileTemplate.innerHTML = `
  <style>${tailwindCSS}</style>
  <main>
    <!-- profile menu -->
    <section
      class="px-[1.9375rem] pb-[1.125rem] pt-[2.625rem] xs:px-[2.7125rem] xs:pb-[1.575rem] xs:pt-[3.675rem] sm:px-[3.4875rem] sm:pb-[2.025rem] sm:pt-[4.725rem]"
    >
      <div
        id="profileSummary"
        class="mb-[0.9375rem] flex flex-col items-center xs:mb-[1.3125rem] sm:mb-[1.6875rem]"
      >
        <img
          src="/assets/avatar-placeholder.png"
          alt="프로필 이미지"
          class="avatar-image mb-[0.5625rem] aspect-square w-[21.25vw] rounded-full [box-shadow:0.25rem_0.25rem_0.25rem_0px_rgba(0,_0,_0,_0.10)] xs:mb-[0.7875rem] sm:mb-[1.0125rem]"
        />
        <div class="flex h-[1.75rem] flex-row items-center xs:h-[2.45rem] sm:h-[3.15rem]">
          <span class="text-lg-group pt-[0.125rem] font-bold leading-[1.5]"
            ><span class="sr-only">내 닉네임</span><span id="username"></span
          ></span>
          <span
            class="text-sm-group ml-[0.375rem] h-[1.0625rem] rounded-full border-[0.04375rem] border-secondary px-1 leading-[1.6] text-secondary xs:ml-[0.525rem] xs:h-[1.4875rem] xs:px-2 xs:pt-[0.0625rem] xs:text-base sm:ml-[0.675rem]"
            ><span class="sr-only">내 기수</span>4기</span
          >
        </div>
        <span class="text-sm-group leading-[1.6] text-contentSecondary"
          ><span class="sr-only">내가 남긴 답변</span>답변 35</span
        >
      </div>

      <nav class="mx-auto">
        <ul
          aria-label="프로필 메뉴"
          class="flex h-[3.25rem] justify-center space-x-[3.875rem] xs:h-[4.55rem] xs:space-x-[5.425rem] sm:h-[5.85rem] sm:space-x-[6.975rem]"
        >
          <li>
            <a
              href="#"
              class="inline-flex h-full w-fit flex-col items-center space-y-[0.4375rem] pt-1 xs:space-y-[0.6125rem] xs:pt-[0.35rem] sm:space-y-[0.7875rem] sm:pt-[0.45rem]"
            >
              <img
                aria-hidden="true"
                src="/icon/qna.svg"
                alt="qna 아이콘"
                class="aspect-square w-[1.625rem] shrink-0 xs:w-[2.275rem] sm:w-[2.925rem]"
              />
              <span class="text-sm-group font-semibold leading-[1.5] text-primary">나의 Q&amp;A</span>
            </a>
          </li>
          <li>
            <a
              href="/pages/edit-profile/"
              class="inline-flex h-full w-fit flex-col items-center space-y-[0.375rem] xs:space-y-[0.525rem] sm:space-y-[0.675rem]"
            >
              <img
                aria-hidden="true"
                src="/icon/profile.svg"
                alt="프로필 아이콘"
                class="aspect-square w-[1.875rem] shrink-0 xs:w-[2.625rem] sm:w-[3.375rem]"
              /><span class="text-sm-group font-semibold leading-[1.5] text-primary">나의 프로필</span></a
            >
          </li>
          <li>
            <a
              href="#"
              class="inline-flex h-full w-fit flex-col items-center space-y-[0.375rem] xs:space-y-[0.525rem] sm:space-y-[0.675rem]"
            >
              <img
                aria-hidden="true"
                src="/icon/alarm-bell.svg"
                alt="알림 아이콘"
                class="aspect-square w-[1.875rem] shrink-0 xs:w-[2.625rem] sm:w-[3.375rem]"
              /><span class="text-sm-group font-semibold leading-[1.5] text-primary">내소식</span>
            </a>
          </li>
        </ul>
      </nav>
    </section>
    <!-- profile menu -->

    <!-- passion section -->
    <section id="passion" class="p-3 xs:p-[1.05rem] sm:p-[1.35rem]">
      <!-- passion temperature -->
      <div id="passionTemperature" class="-space-y-[0.3125rem] xs:-space-y-[0.4375rem] sm:-space-y-[0.5625rem]">
        <div class="flex flex-row items-center">
          <span class="text-[0.75rem] xs:text-[1.05rem] sm:text-[1.35rem]">열정온도</span>
          <img
            src="/icon/information.svg"
            alt="tooltip"
            class="mb-[0.125rem] aspect-square w-[0.875rem] shrink-0 xs:mb-[0.175rem] xs:w-[1.225rem] sm:mb-[0.225rem] sm:w-[1.575rem]"
          />
        </div>

        <div class="flex flex-col items-end">
          <div
            class="flex h-[2.1875rem] w-[calc(63.5%+1.9046875rem)] flex-row items-center justify-between xs:h-[3.0625rem] xs:w-[calc(63.5%+2.5396875rem)] sm:h-[3.9375rem] sm:w-[calc(63.5%+3.3853125rem)]"
          >
            <div class="flex h-[1.4375rem] flex-col items-center xs:h-[2.0125rem] sm:h-[2.5875rem]">
              <span class="text-sm-group leading-[1.6] text-contentSecondary">첫 온도 36.5°C</span>
              <img
                aria-hidden="true"
                src="/icon/polygon.svg"
                alt="아래를 가리키는 삼각형"
                class="aspect-[8.8/5] w-[0.55rem] xs:w-[0.77rem] sm:w-[0.99rem]"
              />
            </div>
            <span class="text-base-group font-semibold text-secondary"
              ><span class="sr-only">나의 열정 온도</span>41.2°C 😀</span
            >
          </div>

          <div
            aria-label="percentage bar"
            class="mb-3 h-[0.51625rem] w-full rounded-full bg-contentSecondary xs:mb-[1.05rem] xs:h-[0.72275rem] sm:mb-[1.35rem] sm:h-[0.92925rem]"
          >
            <div aria-label="41.2%" class="h-full w-[41.2%] rounded-full bg-primary"></div>
          </div>
        </div>
      </div>
      <!-- passion temperature -->

      <!-- passion details -->
      <div
        id="passionDetails"
        class="flex h-[4.4375rem] flex-row px-2 py-4 xs:h-[6.2125rem] xs:px-[0.7rem] xs:py-[1.4rem] sm:h-[7.9875rem] sm:px-[0.9rem] sm:py-[1.8rem]"
      >
        <div id="ratings" class="flex flex-1 flex-col">
          <div class="flex flex-row space-x-[0.3125rem] xs:space-x-[0.4375rem] sm:space-x-[0.5625rem]">
            <img
              aria-hidden="true"
              src="/icon/heart.svg"
              alt="받은 좋아요"
              class="mt-1 h-4 w-4 shrink-0 xs:mt-0 xs:h-[1.4rem] xs:w-[1.4rem] sm:h-[1.8rem] sm:w-[1.8rem]"
            />
            <div class="flex flex-col items-start space-y-[0.3125rem]">
              <div class="">
                <span class="text-sm-group leading-[1.6]">받은 좋아요 </span>
                <span class="text-sm-group font-semibold leading-[1.5]"
                  ><span class="sr-only">내 답변에 대해 만족한 사람의 비율</span>100%</span
                >
              </div>
              <span class="text-sm-group leading-[1.6] text-contentSecondary"
                ><span class="sr-only">내 답변에 대해 만족한 사람의 수</span>11개 중 11명이 만족</span
              >
            </div>
          </div>
        </div>
        <div id="responseRate" class="flex flex-1 flex-col">
          <div class="flex flex-row space-x-[0.3125rem] xs:space-x-[0.4375rem] sm:space-x-[0.5625rem]">
            <img
              aria-hidden="true"
              src="/icon/speech.svg"
              alt="응답률"
              class="mt-1 h-4 w-4 shrink-0 xs:mt-0 xs:h-[1.4rem] xs:w-[1.4rem] sm:h-[1.8rem] sm:w-[1.8rem]"
            />
            <div class="flex flex-col items-start space-y-[0.3125rem]">
              <div>
                <span class="text-sm-group leading-[1.6]">응답률 </span>
                <span class="text-sm-group font-semibold leading-[1.5]">-%</span>
              </div>
              <span class="text-sm-group leading-[1.6] text-contentSecondary"
                >표시된 만큼 충분히 채팅하지 않았어요.</span
              >
            </div>
          </div>
        </div>
      </div>
      <!-- passion details -->
    </section>
    <!-- passion section -->

    <!-- badges -->
    <section id="badge" class="border-b-[0.01875rem] border-contentSecondary">
      <a
        href="#"
        aria-label="내 활동배지 자세히 보기"
        class="flex w-full flex-row items-center justify-between px-[1.3125rem] py-4 xs:px-[1.8375rem] xs:py-[1.4rem] sm:px-[2.3625rem] sm:py-[1.8rem]"
      >
        <span class="text-base-group font-semibold leading-[1.5]"
          ><span class="sr-only">내 활동배지 수</span>활동배지 10개</span
        >
        <img
          aria-hidden="true"
          src="/icon/right.svg"
          alt="오른쪽 이동 아이콘"
          class="aspect-square w-4 xs:w-[1.4rem] sm:w-[1.8rem]"
        />
      </a>
    </section>
    <!-- badges -->

    <!-- my products -->
    <section id="listings" class="border-b-[0.01875rem] border-contentSecondary">
      <a
        href="#"
        aria-label="내 판매상품 바로가기"
        class="flex w-full flex-row items-center justify-between px-[1.3125rem] py-4 xs:px-[1.8375rem] xs:py-[1.4rem] sm:px-[2.3625rem] sm:py-[1.8rem]"
      >
        <span class="text-base-group font-semibold leading-[1.5]">판매상품 3개</span>
        <img
          aria-hidden="true"
          src="/icon/right.svg"
          alt="오른쪽 이동 아이콘"
          class="aspect-square w-4 xs:w-[1.4rem] sm:w-[1.8rem]"
        />
      </a>
    </section>
    <!-- my products -->

    <!-- manner feedback -->
    <section id="mannerFeedback" class="flex flex-col border-b-[0.01875rem] border-contentSecondary">
      <a
        aria-label="받은 매너 평가 자세히 보기"
        href="#"
        class="flex flex-row items-center justify-between px-[1.3125rem] py-4 xs:px-[1.8375rem] xs:py-[1.4rem] sm:px-[2.3625rem] sm:py-[1.8rem]"
      >
        <span class="text-base-group font-semibold leading-[1.5]">받은 매너 평가</span>
        <img
          aria-hidden="true"
          src="/icon/right.svg"
          alt="오른쪽 이동 아이콘"
          class="aspect-square w-4 xs:w-[1.4rem] sm:w-[1.8rem]"
        />
      </a>

      <!-- manner reviews -->
      <ul
        aria-label="받은 매너 평가 리스트"
        class="space-y-2 px-[0.625rem] py-[0.875rem] xs:space-y-[0.7rem] xs:px-[0.875rem] xs:py-[1.225rem] sm:space-y-[0.9rem] sm:px-[1.125rem] sm:py-[1.575rem]"
      >
        <li class="flex items-center space-x-2 xs:space-x-[0.7rem] sm:space-x-[0.9rem]">
          <img
            aria-hidden="true"
            src="/icon/people.svg"
            alt="평가자 수"
            class="aspect-square w-4 xs:w-[1.4rem] sm:w-[1.8rem]"
          />

          <span
            class="text-base-group mt-[0.125rem] w-[1.125rem] font-semibold leading-[1.5] xs:mt-[0.175rem] xs:w-[1.575rem] sm:mt-[0.225rem] sm:w-[2.025rem]"
            ><span class="sr-only">평가자 수</span>10</span
          >
          <div
            class="flex h-[2.375rem] items-center rounded-[0.5rem] rounded-tl-none bg-tertiary p-2 xs:h-[3.325rem] xs:rounded-[0.7rem] xs:p-[0.7rem] sm:h-[4.275rem] sm:rounded-[0.9rem] sm:p-[0.9rem]"
          >
            <span class="text-base-group leading-[1.5]">시간 약속을 잘 지켜요.</span>
          </div>
        </li>
        <li class="flex items-center space-x-2 xs:space-x-[0.7rem] sm:space-x-[0.9rem]">
          <img
            aria-hidden="true"
            src="/icon/people.svg"
            alt="평가자 수"
            class="aspect-square w-4 xs:w-[1.4rem] sm:w-[1.8rem]"
          />

          <span
            class="text-base-group mt-[0.125rem] w-[1.125rem] font-semibold leading-[1.5] xs:mt-[0.175rem] xs:w-[1.575rem] sm:mt-[0.225rem] sm:w-[2.025rem]"
            ><span class="sr-only">평가자 수</span>9</span
          >
          <div
            class="flex h-[2.375rem] items-center rounded-[0.5rem] rounded-tl-none bg-tertiary p-2 xs:h-[3.325rem] xs:rounded-[0.7rem] xs:p-[0.7rem] sm:h-[4.275rem] sm:rounded-[0.9rem] sm:p-[0.9rem]"
          >
            <span class="text-base-group leading-[1.5]">친절하고 매너가 좋아요.</span>
          </div>
        </li>
        <li class="flex items-center space-x-2 xs:space-x-[0.7rem] sm:space-x-[0.9rem]">
          <img
            aria-hidden="true"
            src="/icon/people.svg"
            alt="평가자 수"
            class="aspect-square w-4 xs:w-[1.4rem] sm:w-[1.8rem]"
          />

          <span
            class="text-base-group mt-[0.125rem] w-[1.125rem] font-semibold leading-[1.5] xs:mt-[0.175rem] xs:w-[1.575rem] sm:mt-[0.225rem] sm:w-[2.025rem]"
            ><span class="sr-only">평가자 수</span>8</span
          >
          <div
            class="flex h-[2.375rem] items-center rounded-[0.5rem] rounded-tl-none bg-tertiary p-2 xs:h-[3.325rem] xs:rounded-[0.7rem] xs:p-[0.7rem] sm:h-[4.275rem] sm:rounded-[0.9rem] sm:p-[0.9rem]"
          >
            <span class="text-base-group leading-[1.5]">제가 있는 곳까지 와서 거래했어요.</span>
          </div>
        </li>
      </ul>
      <!-- manner reviews -->
    </section>
    <!-- manner feedback -->

    <!-- reviews -->
    <section id="reviews" class="flex flex-col border-b-[0.01875rem] border-contentSecondary">
      <a
        aria-label="받은 거래 후기 모두 보기"
        href="#"
        class="flex flex-row items-center justify-between border-b-[0.01875rem] border-contentSecondary px-[1.125rem] py-4 xs:px-[1.575rem] xs:py-[1.4rem] sm:px-[2.025rem] sm:py-[1.8rem]"
      >
        <span class="text-base-group font-semibold leading-[1.5]">받은 거래 후기 1</span>
        <img
          aria-hidden="true"
          src="/icon/right.svg"
          alt="오른쪽 이동 아이콘"
          class="aspect-square w-4 xs:w-[1.4rem] sm:w-[1.8rem]"
        />
      </a>
      <!-- reviews list -->
      <ul aria-label="받은 리뷰 리스트">
        <li
          class="flex items-start justify-between px-[0.625rem] pb-[1.25rem] pt-[0.875rem] xs:px-[0.875rem] xs:pb-[1.75rem] xs:pt-[1.225rem] sm:px-[1.125rem] sm:pb-[2.25rem] sm:pt-[1.575rem]"
        >
          <div class="flex items-start space-x-[0.5625rem] xs:space-x-[0.7875rem] sm:space-x-[1.0125rem]">
            <img
              aria-hidden="true"
              src="/assets/reviews-avatar-placeholder.png"
              alt="리뷰 작성자의 프로필 이미지"
              class="aspect-square w-7 rounded-full xs:w-[2.45rem] sm:w-[3.15rem]"
            />
            <div class="flex flex-col">
              <span class="text-sm-group font-semibold leading-[1.5]"
                ><span class="sr-only">리뷰 작성자 닉네임</span>으갸갸갹</span
              >
              <span class="text-sm-group text-contentSecondary"
                ><span class="sr-only">리뷰 작성자 정보</span>구매자 · 인천광역시 계양구 · 4개월 전</span
              >
              <span class="text-base-group mt-2 leading-[1.6] xs:mt-[0.7rem] sm:mt-[0.9rem]"
                ><span class="sr-only">리뷰 작성자가 남긴 리뷰 본문</span>감사감사 감사합니다</span
              >
            </div>
          </div>
          <div class="flex items-center">
            <button aria-label="더보기" type="button">
              <img
                aria-hidden="true"
                src="/icon/more.svg"
                alt="더보기 아이콘"
                class="aspect-square w-5 text-contentSecondary xs:w-[1.75rem] sm:w-[2.25rem]"
              />
            </button>
          </div>
        </li>
      </ul>
      <!-- reviews list -->
    </section>
    <!-- reviews -->

    <!-- additional info -->
    <section id="additional-info" class="pt-[0.4375rem] xs:pt-[0.6125rem] sm:pt-[0.7875rem]">
      <ul aria-label="부가정보">
        <li class="flex flex-row">
          <a
            href="#"
            class="text-base-group w-full py-[0.5625rem] pl-[1.125rem] pr-[0.75rem] leading-[1.6] xs:py-[0.7875rem] xs:pl-[1.575rem] xs:pr-[1.05rem] sm:py-[1.0125rem] sm:pl-[2.025rem] sm:pr-[1.35rem]"
            >보관 질문</a
          >
        </li>
        <li class="flex flex-row">
          <a
            href="#"
            class="text-base-group w-full py-[0.5625rem] pl-[1.125rem] pr-[0.75rem] leading-[1.6] xs:py-[0.7875rem] xs:pl-[1.575rem] xs:pr-[1.05rem] sm:py-[1.0125rem] sm:pl-[2.025rem] sm:pr-[1.35rem]"
            >설정</a
          >
        </li>

        <li class="flex flex-row">
          <a
            href="#"
            class="text-base-group w-full py-[0.5625rem] pl-[1.125rem] pr-[0.75rem] leading-[1.6] xs:py-[0.7875rem] xs:pl-[1.575rem] xs:pr-[1.05rem] sm:py-[1.0125rem] sm:pl-[2.025rem] sm:pr-[1.35rem]"
            >지식 iN 공식 블로그</a
          >
        </li>

        <li class="flex flex-row">
          <a
            href="#"
            class="text-base-group w-full py-[0.5625rem] pl-[1.125rem] pr-[0.75rem] leading-[1.6] xs:py-[0.7875rem] xs:pl-[1.575rem] xs:pr-[1.05rem] sm:py-[1.0125rem] sm:pl-[2.025rem] sm:pr-[1.35rem]"
            >서비스 정보</a
          >
        </li>
        <li class="flex flex-row">
          <a
            href="#"
            class="text-base-group w-full py-[0.5625rem] pl-[1.125rem] pr-[0.75rem] leading-[1.6] xs:py-[0.7875rem] xs:pl-[1.575rem] xs:pr-[1.05rem] sm:py-[1.0125rem] sm:pl-[2.025rem] sm:pr-[1.35rem]"
            >공지사항</a
          >
        </li>
        <li class="flex flex-row">
          <button
            id="logout-button"
            type="button"
            class="text-base-group flex w-full flex-row justify-between py-[0.5625rem] pl-[1.125rem] pr-[0.75rem] leading-[1.6] xs:py-[0.7875rem] xs:pl-[1.575rem] xs:pr-[1.05rem] sm:py-[1.0125rem] sm:pl-[2.025rem] sm:pr-[1.35rem]"
          >
            <span>로그아웃</span
            ><span class="text-secondary"
              ><span class="sr-only">현재 사용자</span><span id="logout-button__username"></span
            ></span>
          </button>
        </li>
      </ul>
    </section>
    <!-- additional info -->
  </main>
`;

class Profile extends HTMLElement {
  static observedAttributes = ['loading', 'error'];

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.loading = true;
    this.currentUser = null;
  }

  connectedCallback() {
    this.render();
    this.addEventListener('click', this.handleClick);

    // 첫 렌더링 후 데이터 fetching 시작하기
    this.fetchData();
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick);
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

  handleLogout() {
    UserService.logout();
  }

  handleClick = (e) => {
    const $logoutButton = this.shadowRoot.getElementById('logout-button');
    if (e.composedPath().includes($logoutButton)) {
      this.handleLogout();
    }
  };

  render() {
    // 렌더링 전 초기화
    this.shadowRoot.innerHTML = '';

    if (this.loading) {
      this.shadowRoot.innerHTML = `
        <style>${tailwindCSS}</style>
        <main>
          <!-- profile menu -->
          <section
            class="px-[1.9375rem] pb-[1.125rem] pt-[2.625rem] xs:px-[2.7125rem] xs:pb-[1.575rem] xs:pt-[3.675rem] sm:px-[3.4875rem] sm:pb-[2.025rem] sm:pt-[4.725rem]"
          >
            <div class="mb-[0.9375rem] flex flex-col items-center xs:mb-[1.3125rem] sm:mb-[1.6875rem]">
              <div
                class="bg-gray-300 mb-[0.5625rem] animate-pulse aspect-square w-[21.25vw] rounded-full xs:mb-[0.7875rem] sm:mb-[1.0125rem]"
              ></div>
              <div class="flex h-[1.75rem] flex-row items-center xs:h-[2.45rem] sm:h-[3.15rem]">
                <div class="pt-[0.125rem] h-2.5 xs:h-3 sm:h-4 w-[30vw] bg-gray-200 rounded-full animate-pulse"
                ></div>
              </div>
              <div class="h-2.5 xs:h-3 sm:h-4 w-[20vw] bg-gray-200 rounded-full animate-pulse"></div>
            </div>
            <div class="mx-auto">
              <div
                class="flex h-[3.25rem] justify-center w-full bg-gray-300 animate-pulse xs:h-[4.55rem] xs:space-x-[5.425rem] sm:h-[5.85rem] sm:space-x-[6.975rem] rounded-md xs:rounded-lg sm:rounded-xl"
              >
              </div>
            </div>
          </section>
          <!-- profile menu -->

          <!-- passion section -->
          <section class="p-3 xs:p-[1.05rem] sm:p-[1.35rem]">
            <!-- passion temperature -->
            <div>
              <div class="bg-gray-200 animate-pulse h-2.5 xs:h-3 sm:h-4 w-[30vw] rounded-full"></div>
              <div
                class="my-6 h-2.5 xs:h-3 sm:h-4 w-full rounded-full bg-gray-300 animate-pulse xs:my-[2.1rem] sm:my-[2.7rem]"
              >
              </div>
            </div>
            <!-- passion temperature -->

            <!-- passion details -->
            <div
              class="flex h-[4.4375rem] flex-row px-2 py-4 xs:h-[6.2125rem] xs:px-[0.7rem] xs:py-[1.4rem] sm:h-[7.9875rem] sm:px-[0.9rem] sm:py-[1.8rem] space-x-5"
            >
              <div class="flex flex-col w-1/2">
                <div class="flex flex-row space-x-[0.3125rem] xs:space-x-[0.4375rem] sm:space-x-[0.5625rem]">
                  <div class="flex flex-col items-start space-y-2 xs:space-y-4 sm:space-y-6">
                    <div class="h-2.5 xs:h-3 sm:h-4 w-[25vw] bg-gray-300 animate-pulse rounded-full"></div>
                    <div class="h-2.5 xs:h-3 sm:h-4 w-[40vw] bg-gray-200 animate-pulse rounded-full"></div>
                    <div class="h-2.5 xs:h-3 sm:h-4 w-[40vw] bg-gray-200 animate-pulse rounded-full"></div>
                  </div>
                </div>
              </div>
              <div class="flex flex-col w-1/2">
                <div class="flex flex-row space-x-[0.3125rem] xs:space-x-[0.4375rem] sm:space-x-[0.5625rem]">
                  <div class="flex flex-col items-start space-y-2 xs:space-y-4 sm:space-y-6">
                    <div class="h-2.5 xs:h-3 sm:h-4 w-[25vw] bg-gray-300 animate-pulse rounded-full"></div>
                    <div class="h-2.5 xs:h-3 sm:h-4 w-[40vw] bg-gray-200 animate-pulse rounded-full"></div>
                    <div class="h-2.5 xs:h-3 sm:h-4 w-[40vw] bg-gray-200 animate-pulse rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            <!-- passion details -->
          </section>
          <!-- passion section -->

          <!-- badges -->
          <section class="border-b-[0.01875rem] border-gray-300">
            <div class="flex w-full flex-row items-center px-[1.3125rem] py-4 xs:px-[1.8375rem] xs:py-[1.4rem] sm:px-[2.3625rem] sm:py-[1.8rem]">
              <div class="h-2.5 xs:h-3 sm:h-4 w-[30vw] bg-gray-300 animate-pulse rounded-full"></div>
            </div>
          </section>
          <!-- badges -->
          <!-- my products -->
          <section class="border-b-[0.01875rem] border-gray-300">
            <div class="flex w-full flex-row items-center px-[1.3125rem] py-4 xs:px-[1.8375rem] xs:py-[1.4rem] sm:px-[2.3625rem] sm:py-[1.8rem]">
              <div class="h-2.5 xs:h-3 sm:h-4 w-[30vw] bg-gray-300 animate-pulse rounded-full"></div>
            </div>
          </section>
          <!-- my products -->
          <!-- manner feedback -->
          <section class="flex flex-col border-b-[0.01875rem] border-gray-300">
            <div class="flex w-full flex-row items-center px-[1.3125rem] py-4 xs:px-[1.8375rem] xs:py-[1.4rem] sm:px-[2.3625rem] sm:py-[1.8rem]">
              <div class="h-2.5 xs:h-3 sm:h-4 w-[30vw] bg-gray-300 animate-pulse rounded-full"></div>
            </div>
            <!-- manner reviews -->
            <div
              class="space-y-4 px-[0.625rem] py-[0.875rem] xs:px-[0.875rem] xs:py-[1.225rem] sm:px-[1.125rem] sm:py-[1.575rem]"
            >
              <div class="flex items-center space-x-2 xs:space-x-[0.7rem] sm:space-x-[0.9rem]">
                <div class="aspect-square w-5 xs:w-[1.75rem] sm:w-[2.25rem] animate-pulse rounded-full bg-gray-200"></div>
                <div class="h-2.5 xs:h-3 sm:h-4 rounded-full bg-gray-300 animate-pulse w-[40vw]"></div>
              </div>
              <div class="flex items-center space-x-2 xs:space-x-[0.7rem] sm:space-x-[0.9rem]">
                <div class="aspect-square w-5 xs:w-[1.75rem] sm:w-[2.25rem] animate-pulse rounded-full bg-gray-300"></div>
                <div class="h-2.5 xs:h-3 sm:h-4 rounded-full bg-gray-200 animate-pulse w-[45vw]"></div>
              </div>
              <div class="flex items-center space-x-2 xs:space-x-[0.7rem] sm:space-x-[0.9rem]">
                <div class="aspect-square w-5 xs:w-[1.75rem] sm:w-[2.25rem] animate-pulse rounded-full bg-gray-200"></div>
                <div class="h-2.5 xs:h-3 sm:h-4 rounded-full bg-gray-300 animate-pulse w-[50vw]"></div>
              </div>
            </div>
            <!-- manner reviews -->
          </section>
          <!-- manner feedback -->
          <!-- reviews -->
          <section class="border-b-[0.01875rem] border-gray-300">
            <div class="flex w-full flex-row items-center px-[1.3125rem] py-4 xs:px-[1.8375rem] xs:py-[1.4rem] sm:px-[2.3625rem] sm:py-[1.8rem]">
              <div class="h-2.5 xs:h-3 sm:h-4 w-[30vw] bg-gray-300 animate-pulse rounded-full"></div>
            </div>
          </section>
          <!-- reviews -->
          <!-- reviews list -->
          <section class="border-b-[0.01875rem] border-gray-300">
            <div class="flex w-full flex-col space-y-3 xs:space-y-5 sm:space-y-7 px-[1.3125rem] py-4 xs:px-[1.8375rem] xs:py-[1.4rem] sm:px-[2.3625rem] sm:py-[1.8rem]">
              <div class="h-2.5 xs:h-3 sm:h-4 w-[30vw] bg-gray-300 animate-pulse rounded-full"></div>
              <div class="h-2.5 xs:h-3 sm:h-4 w-full bg-gray-200 animate-pulse rounded-full"></div>
              <div class="h-2.5 xs:h-3 sm:h-4 w-full bg-gray-200 animate-pulse rounded-full"></div>
            </div>
          </section>
          <!-- reviews list -->
        </main>
      `;
      return;
    } else if (this.error) {
      this.shadowRoot.innerHTML = `<p>${this.error}</p>`;
      return;
    }

    // currentUser가 없으면 초기 시작 화면으로 redirect해둠, 따라서 로딩 이후 currentUser를 가져오지 못한 경우는 신경쓰지 않음.

    this.shadowRoot.appendChild(ProfileTemplate.content.cloneNode(true));

    // template에 데이터 넣기
    const $usernameSpan = this.shadowRoot.getElementById('username');
    $usernameSpan.textContent = this.currentUser.username;
    const $logoutButtonSpan = this.shadowRoot.getElementById('logout-button__username');
    $logoutButtonSpan.textContent = this.currentUser.username;

    if (this.currentUser.avatar) {
      const avatarImageUrl = getPbImageURL(this.currentUser, 'avatar');
      const $avatarImages = this.shadowRoot.querySelectorAll('.avatar-image');
      $avatarImages.forEach(($avatarImage) => {
        $avatarImage.src = avatarImageUrl;
      });
    }
  }
}

customElements.define('c-profile', Profile);
