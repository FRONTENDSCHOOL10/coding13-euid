import { UserService } from '/service/UserService';
import tailwindCSS from '/styles/tailwind.css?inline'; // css 파일 inline 가져오기
import { getPbImageURL } from '/api/getPbImageURL';
import '/components/navigation/navigation';
import '/components/spinner/spinner';

const EditProfileTemplate = document.createElement('template');
EditProfileTemplate.innerHTML = `
  <style>${tailwindCSS}</style>
  <main
    class="space-y-[0.8125rem] px-[0.75rem] pb-[3rem] pt-[2.8125rem] xs:space-y-[1.1375rem] xs:px-[1.05rem] xs:pb-[4.2rem] xs:pt-[3.9375rem] sm:space-y-[1.4625rem] sm:px-[1.35rem] sm:pb-[5.4rem] sm:pt-[5.0625rem]"
  >
    <!-- profile card -->
    <section
      class="flex items-center justify-between rounded-[0.5rem] border-[0.01875rem] border-gray-300 p-3 shadow-md xs:rounded-[0.7rem] xs:p-[1.05rem] sm:rounded-[0.9rem] sm:p-[1.35rem]"
    >
      <div class="flex flex-col space-y-1 xs:space-y-[0.35rem] sm:space-y-[0.45rem]">
        <h3 class="username text-base-group font-semibold leading-[1.5]">
          <span class="sr-only">사용자 닉네임</span>
        </h3>
        <span
          class="text-sm-group h-[1.0625rem] w-fit rounded-full border-[0.04375rem] border-secondary px-1 text-center leading-[1.6] text-secondary xs:h-[1.4875rem] xs:px-[0.35rem] xs:pt-[0.125rem] sm:h-[1.9125rem] sm:w-[2.7rem] sm:pt-[0.0625rem]"
          ><span class="sr-only">내 기수</span>4기</span
        >
      </div>
      <img
        src="/assets/avatar-placeholder.png"
        alt="프로필 이미지"
        class="avatar-image aspect-square w-[15.625vw] rounded-full [box-shadow:0.25rem_0.25rem_0.25rem_0px_rgba(0,_0,_0,_0.10)]"
      />
    </section>
    <!-- profile card -->

    <!-- information -->
    <section
      class="rounded-t-[0.5rem] border-[0.01875rem] border-gray-300 shadow-md xs:rounded-t-[0.7rem] sm:rounded-t-[0.9rem]"
    >
      <div
        class="flex flex-row items-center justify-between border-b-[0.01875rem] border-contentSecondary p-3 pr-4 xs:p-[1.05rem] xs:pr-[1.4rem] sm:p-[1.35rem] sm:pr-[1.8rem]"
      >
        <h3 class="text-base-group font-semibold leading-[1.5]">기본 정보</h3>
        <a href="/pages/profile-detail/" class="text-sm-group text-secondary">수정하기</a>
      </div>
      <ul
        aria-label="기본 정보 리스트"
        class="space-y-[1.0625rem] px-[0.8125rem] py-[0.625rem] xs:space-y-[1.4875rem] xs:px-[1.1375rem] xs:py-[0.875rem] sm:space-y-[1.9125rem] sm:px-[1.4625rem] sm:py-[1.125rem]"
      >
        <li class="flex h-6 flex-row items-center justify-between xs:h-[2.1rem] sm:h-[2.7rem]">
          <h4 class="text-base-group font-semibold leading-[1.5]">프로필 사진</h4>
          <img
            src="/assets/avatar-placeholder.png"
            alt="프로필 이미지"
            class="avatar-image aspect-square w-6 rounded-full [box-shadow:0.125rem_0.125rem_0.125rem_0px_rgba(0,_0,_0,_0.10)] xs:w-[2.1rem] sm:w-[2.7rem]"
          />
        </li>
        <li class="flex flex-row items-center justify-between">
          <h4 class="text-base-group font-semibold leading-[1.5]">이름(별명)</h4>
          <span class="username text-sm-group font-semibold leading-[1.5]"></span>
        </li>
        <li class="flex flex-row items-center justify-between">
          <h4 class="text-base-group font-semibold leading-[1.5]">하는일</h4>
          <span class="text-sm-group font-semibold leading-[1.5] text-contentSecondary">미입력</span>
        </li>
        <li class="flex flex-row items-center justify-between">
          <h4 class="text-base-group font-semibold leading-[1.5]">프로필 키워드</h4>
          <span class="text-sm-group font-semibold leading-[1.5] text-contentSecondary">미입력</span>
        </li>
        <li class="flex flex-row items-center justify-between">
          <h4 class="text-base-group font-semibold leading-[1.5]">성별</h4>
          <span id="user-gender" class="text-sm-group font-semibold leading-[1.5] text-contentSecondary">미입력</span>
        </li>
        <li class="flex flex-row items-center justify-between">
          <h4 class="text-base-group font-semibold leading-[1.5]">연령</h4>
          <span class="text-sm-group font-semibold leading-[1.5] text-contentSecondary">미입력</span>
        </li>
        <li class="flex flex-row items-center justify-between">
          <h4 class="text-base-group font-semibold leading-[1.5]">회사</h4>
          <span class="text-sm-group font-semibold leading-[1.5] text-contentSecondary">미입력</span>
        </li>
        <li class="flex flex-row items-center justify-between">
          <h4 class="text-base-group font-semibold leading-[1.5]">학교</h4>
          <span class="text-sm-group font-semibold leading-[1.5] text-contentSecondary">미입력</span>
        </li>
        <li class="flex flex-row items-center justify-between">
          <h4 class="text-base-group font-semibold leading-[1.5]">자격</h4>
          <span class="text-sm-group font-semibold leading-[1.5] text-contentSecondary">미입력</span>
        </li>
      </ul>
    </section>
    <!-- information -->

    <!-- additional information -->
    <section
      class="rounded-t-[0.5rem] border-[0.01875rem] border-gray-300 shadow-md xs:rounded-t-[0.7rem] sm:rounded-t-[0.9rem]"
    >
      <div
        class="flex flex-row items-center justify-between border-b-[0.01875rem] border-contentSecondary p-3 pr-4 xs:p-[1.05rem] xs:pr-[1.4rem] sm:p-[1.35rem] sm:pr-[1.8rem]"
      >
        <h3 class="text-base-group font-semibold leading-[1.5]">추가 정보</h3>
        <a href="/pages/profile-detail/" class="text-sm-group text-secondary">수정하기</a>
      </div>
      <ul
        aria-label="추가 정보 리스트"
        class="space-y-[1.0625rem] px-[0.8125rem] pb-8 pt-[0.625rem] xs:space-y-[1.4875rem] xs:px-[1.1375rem] xs:pb-[2.8rem] xs:pt-[0.875rem] sm:space-y-[1.9125rem] sm:px-[1.4625rem] sm:pb-[3.6rem] sm:pt-[1.125rem]"
      >
        <li class="flex flex-row items-center justify-between">
          <h4 class="text-base-group font-semibold leading-[1.5]">소개</h4>
          <span class="text-sm-group font-semibold leading-[1.5] text-contentSecondary">미입력</span>
        </li>
        <li class="flex flex-row items-center justify-between">
          <h4 class="text-base-group font-semibold leading-[1.5]">연관 링크</h4>
          <span class="text-sm-group font-semibold leading-[1.5] text-contentSecondary">미입력</span>
        </li>
        <li class="flex flex-row items-center justify-between">
          <h4 class="text-base-group font-semibold leading-[1.5]">활동 분야</h4>
          <span class="text-sm-group font-semibold leading-[1.5] text-contentSecondary">미입력</span>
        </li>
        <li class="flex flex-row items-center justify-between">
          <h4 class="text-base-group font-semibold leading-[1.5]">업체 정보</h4>
          <span class="text-sm-group font-semibold leading-[1.5] text-contentSecondary">미입력</span>
        </li>
      </ul>
    </section>
    <!-- additional information -->
  </main>
`;

class EditProfile extends HTMLElement {
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

    if (this.loading) {
      this.shadowRoot.innerHTML = '<c-spinner></c-spinner>';
      return;
    } else if (this.error) {
      this.shadowRoot.innerHTML = `<p>${this.error}</p>`;
      return;
    }

    // currentUser가 없으면 초기 시작 화면으로 redirect해둠, 따라서 로딩 이후 currentUser를 가져오지 못한 경우는 신경쓰지 않음.

    this.shadowRoot.appendChild(EditProfileTemplate.content.cloneNode(true));

    // template에 데이터 넣기
    const $usernameSpans = this.shadowRoot.querySelectorAll('.username');
    $usernameSpans.forEach(($usernameSpan) => {
      $usernameSpan.textContent = this.currentUser.username;
    });

    const $userGender = this.shadowRoot.getElementById('user-gender');
    if (this.currentUser.gender === 'M') {
      $userGender.textContent = '남성';
    } else if (this.currentUser.gender === 'F') {
      $userGender.textContent = '여성';
    } else {
      $userGender.textContent = '미입력';
    }

    if (this.currentUser.avatar) {
      const avatarImageUrl = getPbImageURL(this.currentUser, 'avatar');
      const $avatarImages = this.shadowRoot.querySelectorAll('.avatar-image');
      $avatarImages.forEach(($avatarImage) => {
        $avatarImage.src = avatarImageUrl;
      });
    }
  }
}

customElements.define('c-edit-profile', EditProfile);
