import { UserService } from '/service/UserService';
import tailwindCSS from '/styles/tailwind.css?inline'; // css 파일 inline 가져오기
import { getPbImageURL } from '/api/getPbImageURL';
import { convertImageToWebP } from '/utils/convertImageToWebP';
import '/components/navigation/navigation';
import '/components/loading-button/loading-button';
import '/components/spinner/spinner';

function activeButton(btnNode, activeClass, disabledClass) {
  btnNode.removeAttribute('disabled');
  btnNode.classList.remove(disabledClass, 'cursor-not-allowed');
  btnNode.classList.add(activeClass, 'cursor-pointer');
}
function disableButton(btnNode, activeClass, disabledClass) {
  btnNode.setAttribute('disabled', true);
  btnNode.classList.remove(activeClass, 'cursor-pointer');
  btnNode.classList.add(disabledClass, 'cursor-not-allowed');
}

const ProfileDetailTemplate = document.createElement('template');
ProfileDetailTemplate.innerHTML = `
  <style>${tailwindCSS}</style>
  <form id="profile-form" name="profile-form" class="flex flex-col pt-[2.8125rem] xs:pt-[3.9375rem] sm:pt-[5.0625rem]">
    <section
      class="flex flex-col gap-[1.875rem] px-3 py-8 xs:gap-[2.625rem] xs:px-[1.05rem] xs:py-[2.8rem] sm:gap-[3.375rem] sm:px-[1.35rem] sm:py-[3.6rem]"
    >
      <h2 class="sr-only">개인 정보</h2>

      <!-- 프로필 사진 -->
      <div role="group" class="flex flex-col items-center">
        <h2 class="sr-only">프로필 사진</h2>
        <div class="relative w-1/4">
          <img src="/assets/avatar-placeholder.png" alt="프로필 사진" id="avatar-image" class="aspect-square w-full rounded-full object-cover" />

          <label
            for="avatar"
            class="absolute bottom-[0.06rem] right-[0.06rem] flex w-1/4 rounded-full bg-background p-[0.125rem] [box-shadow:0.25rem_0.25rem_0.25rem_0px_rgba(0,_0,_0,_0.15)] cursor-pointer xs:bottom-[0.084rem] xs:right-[0.084rem] xs:p-[0.175rem] sm:bottom-[0.108rem] sm:right-[0.108rem] sm:p-[0.225rem]"
          >
            <img src="/icon/pencil.svg" alt="연필" aria-hidden="true" class="aspect-square w-full" />
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept=".jpg, .png, .svg, .gif, .webp"
              class="sr-only"
              aria-label="프로필사진 업로드"
            />
          </label>
        </div>
      </div>

      <!-- 이름(별명) -->
      <div role="group" class="flex w-full flex-col gap-2 xs:gap-[0.7rem] sm:gap-[0.9rem]">
        <label for="username" class="text-base-group font-semibold leading-[150%]">이름(별명)</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="이름(별명)을 입력해주세요."
          class="text-base-group rounded-lg border-[0.03125rem] border-solid border-contentPrimary px-4 py-2 leading-[160%] xs:rounded-[0.7rem] xs:px-[1.4rem] xs:py-[0.7rem] sm:rounded-[0.9rem] sm:px-[1.8rem] sm:py-[0.9rem]"
        />
      </div>

      <!-- 성별 -->
      <fieldset class="flex w-full flex-col">
        <legend class="text-base-group mb-2 font-semibold leading-[150%] xs:mb-[0.7rem] sm:mb-[0.9rem]">
          성별
        </legend>

        <div
          role="radiogroup"
          aria-label="성별 선택"
          class="flex cursor-pointer rounded-lg bg-[#C4C7D2] xs:rounded-[0.7rem] sm:rounded-[0.9rem]"
        >
          <div class="flex-grow">
            <input tabindex="0" type="radio" name="gender" id="male" value="M" class="peer sr-only" />
            <label
              for="male"
              class="text-base-group flex cursor-pointer items-center justify-center rounded-lg py-[0.375rem] font-semibold text-background peer-checked:z-10 peer-checked:border peer-checked:border-tertiary peer-checked:bg-background peer-checked:text-secondary xs:rounded-[0.7rem] xs:py-[0.525rem] sm:rounded-[0.9rem] sm:py-[0.675rem]"
            >
              남자
            </label>
          </div>
          <!-- js에서 버튼을 클릭하면 z-10, border-tertiary, border, bg-background, text-secondary를 클릭한 쪽으로 옮겨야함 -->
          <div class="flex-grow">
            <input tabindex="0" type="radio" name="gender" id="female" value="F" class="peer sr-only" />
            <label
              for="female"
              aria-pressed="true"
              class="text-base-group -ml-[0.3125rem] flex cursor-pointer items-center justify-center rounded-lg py-[0.375rem] font-semibold text-background peer-checked:z-10 peer-checked:border peer-checked:border-tertiary peer-checked:bg-background peer-checked:text-secondary xs:-ml-[0.4375rem] xs:rounded-[0.7rem] xs:py-[0.525rem] sm:-ml-[0.5625rem] sm:rounded-[0.9rem] sm:py-[0.675rem]"
            >
              여자
            </label>
          </div>
        </div>
      </fieldset>

      <!-- 주소 -->
      <div role="group" class="flex flex-col gap-2 xs:gap-[0.7rem] sm:gap-[0.9rem]">
        <label for="address" class="text-base-group font-semibold leading-[150%]">주소</label>
        <input
          id="address"
          type="text"
          placeholder="검색하기 버튼을 통해 주소를 검색해주세요."
          name="address"
          readonly
          class="text-base-group rounded-lg border-[0.03125rem] border-solid border-contentPrimary px-3 py-[0.5625rem] leading-[160%] xs:rounded-[0.7rem] xs:py-[0.7875rem] sm:rounded-[0.9rem] sm:py-[1.0125rem]"
        />
        <button
          id="search-btn"
          type="button"
          class="flex items-center justify-center gap-1 rounded-lg border border-solid border-[#D3D3D3] px-[2.0625rem] py-2 xs:gap-[0.35rem] xs:rounded-[0.7rem] sm:gap-[0.45rem] sm:rounded-[0.9rem]"
        >
          <img
            src="/icon/search.svg"
            alt="돋보기 아이콘"
            aria-hidden="true"
            class="w-6 xs:w-[2.1rem] sm:w-[2.7rem]"
          />
          <span class="text-base-group font-semibold leading-[150%]">검색하기</span>
        </button>
      </div>
    </section>

    <!-- 동의 사항 -->
    <fieldset id="agree-matters">
      <legend class="sr-only">동의 사항</legend>

      <!-- 전체 동의 -->
      <div
        role="group"
        class="flex items-center justify-between border-t border-solid border-contentSecondary px-3 py-[0.875rem] xs:px-[1.05rem] xs:py-[1.225rem] sm:px-[1.35rem] sm:py-[1.575rem]"
      >
        <div class="flex items-center">
          <input
            type="checkbox"
            id="agree-all"
            name="agree-all"
            class="mr-3 min-h-4 min-w-4 cursor-pointer xs:mr-[1.05rem] xs:min-h-[1.4rem] xs:min-w-[1.4rem] sm:mr-[1.35rem] sm:min-h-[1.8rem] sm:min-w-[1.8rem]"
          />
          <label for="agree-all" class="text-base-group font-semibold leading-[150%]"
            >아래 내용에 전체 동의합니다.</label
          >
        </div>
        <span class="text-sm-group leading-[160%] text-negative">필수동의</span>
      </div>

      <div
        class="flex flex-col gap-[1.125rem] border-t-[0.03rem] border-solid border-contentSecondary px-3 pb-2 pt-4 xs:gap-[1.575rem] xs:px-[1.05rem] xs:pb-[0.7rem] xs:pt-[1.4rem] sm:gap-[2.025rem] sm:px-[1.35rem] sm:pb-[0.9rem] sm:pt-[1.8rem]"
      >
        <!-- 항목 1 -->
        <div role="group">
          <div class="mb-[0.5625rem] flex items-center xs:mb-[0.7875rem] sm:mb-[1.0125rem]">
            <input
              type="checkbox"
              id="agree-collection"
              name="agree-collection"
              required
              class="mr-3 min-h-4 min-w-4 cursor-pointer xs:mr-[1.05rem] xs:min-h-[1.4rem] xs:min-w-[1.4rem] sm:mr-[1.35rem] sm:min-h-[1.8rem] sm:min-w-[1.8rem]"
            />
            <label for="agree-collection" class="text-sm-group font-semibold leading-[150%]">
              [ 필수 ] 개인 정보 수집 및 이용 동의
            </label>
          </div>
          <p class="text-sm-group ml-7 leading-[160%] text-contentSecondary xs:ml-[2.45rem] sm:ml-[3.15rem]">
            입력한 별명, 프로필 사진, 하는 일, 프로필 키워드, 성별, 연령, 회사, 학교, 자격은 엔터이듬 서비스 내
            프로필 페이지, 답변자 정보 영역, 엔터이듬 홈 및 서비스 내 프로필 공개를 목적으로 합니다.
          </p>
          <p class="text-sm-group ml-7 font-semibold leading-[160%] text-secondary xs:ml-[2.45rem] sm:ml-[3.15rem]">
            수집된 정보는 언제든지 직접 삭제할 수 있고, 탈퇴 시에는 바로 파기됩니다.
          </p>
        </div>

        <!-- 항목 2 -->
        <div role="group" class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              type="checkbox"
              id="agree-promotion"
              name="agree-promotion"
              class="mr-3 min-h-4 min-w-4 cursor-pointer xs:mr-[1.05rem] xs:min-h-[1.4rem] xs:min-w-[1.4rem] sm:mr-[1.35rem] sm:min-h-[1.8rem] sm:min-w-[1.8rem]"
            />
            <label for="agree-promotion" class="text-sm-group font-semibold leading-[150%]">
              [ 필수 ] 프로필 정보 노출 영역 확인
            </label>
          </div>
          <a
            href="#"
            aria-label="프로필 정보 노출 영역 확인 자세히 보기"
            class="text-sm-group font-semibold leading-[150%] text-contentSecondary"
          >
            자세히&gt;
          </a>
        </div>

        <div role="group" class="flex">
          <input
            type="checkbox"
            id="agree-marketing"
            name="agree-marketing"
            class="mr-3 min-h-4 min-w-4 cursor-pointer xs:mr-[1.05rem] xs:min-h-[1.4rem] xs:min-w-[1.4rem] sm:mr-[1.35rem] sm:min-h-[1.8rem] sm:min-w-[1.8rem]"
          />
          <label for="agree-marketing" class="text-sm-group font-semibold leading-[150%]">
            [ 필수 ] 사실과 다른 정보를 기재하여 발생한 문제에 대해서는 본인이 일체의 책임을 부담하겠습니다.
          </label>
        </div>
      </div>
    </fieldset>

    <div class="flex flex-col items-center gap-[1.125rem] p-3 xs:p-[1.05rem] sm:p-[1.35rem]">
      <div class="flex w-full gap-[0.5625rem] xs:gap-[0.7875rem] sm:gap-[1.0125rem]">
        <a
          role="button"
          href="/pages/edit-profile/"
          class="text-base-group flex flex-1 justify-center items-center rounded-lg border border-solid border-[#D3D3D3] bg-[#E9E9E9] py-2 font-semibold leading-[150%] xs:rounded-[0.7rem] xs:py-[0.7rem] sm:rounded-[0.9rem] sm:py-[0.9rem]"
        >
          취소
        </a>

        <button
          id="save-btn"
          is="c-loading-button"
          data-spinner-classes="w-3 h-3"
          type="submit"
          disabled
          class="flex flex-1 justify-center items-center text-base-group cursor-not-allowed rounded-lg border border-solid border-[#D3D3D3] bg-[#D8D9E1] py-2 font-semibold leading-[150%] xs:rounded-[0.7rem] xs:py-[0.7rem] sm:rounded-[0.9rem] sm:py-[0.9rem]"
        >
          저장
        </button>
      </div>
      <a href="#" class="text-sm-group leading-[160%] text-contentSecondary">정보 초기화 및 이용 동의 철회</a>
    </div>
  </form>

  <!-- 모달창 배경 -->
  <div id="confirm-modal" aria-hidden="true" class="hidden fixed left-0 top-0 z-50 h-screen w-full bg-contentTertiary bg-opacity-20">
    <!-- 모달창 -->
    <dialog
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      class="fixed left-1/2 top-1/2 flex w-[70%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-5 rounded-[1.25rem] bg-background px-[1.125rem] pb-[1.125rem] pt-5 [box-shadow:0_0.25rem_0.25rem_0_rgba(0,_0,_0,_0.25)]"
    >
      <h2 id="modal-title" class="text-base-group leading-[160%]">저장 완료!</h2>
      <p id="modal-description" class="text-sm-group leading-[160%] text-contentSecondary">
        내 질문&답변의 프로필 카드, 프로필 홈에서 변경된 프로필 정보를 확인 할 수 있어요.
      </p>
      <a
        role="button"
        href="/pages/edit-profile/"
        aria-label="확인 및 모달 닫기"
        class="text-base-group w-full text-center cursor-pointer rounded-lg bg-primary py-2 text-background"
      >
        확인
      </a>
    </dialog>
  </div>
`;

class ProfileDetail extends HTMLElement {
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

  handleSearch() {
    const address = this.shadowRoot.getElementById('address');

    new daum.Postcode({
      oncomplete: function (data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
        // 예제를 참고하여 다양한 활용법을 확인해 보세요.
        address.value = data.sigungu;
      },
    }).open();
  }

  handleAgreeCheck(e, $agreeMatters) {
    const agreeCheckboxes = $agreeMatters.querySelectorAll('input[type="checkbox"]');
    const saveBtn = this.shadowRoot.getElementById('save-btn');

    const target = e.composedPath()[0].closest('input[type="checkbox"]');
    if (!target) return;

    if (target.id === 'agree-all') {
      if (target.checked) {
        agreeCheckboxes.forEach((box) => {
          box.checked = true;
        });
      } else {
        agreeCheckboxes.forEach((box) => {
          box.checked = false;
        });
      }
    }

    if (agreeCheckboxes[1].checked && agreeCheckboxes[2].checked && agreeCheckboxes[3].checked) {
      agreeCheckboxes[0].checked = true;
      activeButton(saveBtn, 'bg-secondary', 'bg-[#D8D9E1]');
    } else {
      agreeCheckboxes[0].checked = false;
      disableButton(saveBtn, 'bg-secondary', 'bg-[#D8D9E1]');
    }
  }

  handleClick = (e) => {
    const $searchBtn = this.shadowRoot.getElementById('search-btn');
    if (e.composedPath().includes($searchBtn)) {
      this.handleSearch();
    }

    const $agreeMatters = this.shadowRoot.getElementById('agree-matters');
    if (e.composedPath().includes($agreeMatters)) {
      this.handleAgreeCheck(e, $agreeMatters);
    }
  };

  handleAvatarInputChange = (e) => {
    const $avatarImage = this.shadowRoot.getElementById('avatar-image');
    $avatarImage.src = URL.createObjectURL(e.target.files[0]);
    $avatarImage.onload = function () {
      URL.revokeObjectURL($avatarImage.src);
    };
  };

  handleProfileFormSubmit = async (e) => {
    e.preventDefault();

    const saveBtn = this.shadowRoot.getElementById('save-btn');
    saveBtn.toggleAttribute('disabled', true);
    saveBtn.toggleAttribute('loading', true);

    try {
      const formData = new FormData(e.target);

      const $avatarInput = this.shadowRoot.getElementById('avatar');

      if ($avatarInput.value === '') {
        formData.delete('avatar');
      } else {
        const avatarWebP = await convertImageToWebP(formData.get('avatar'));
        formData.set('avatar', avatarWebP);
      }
      await UserService.updateUser(this.currentUser.id, formData);
    } finally {
      saveBtn.toggleAttribute('loading', false);
      saveBtn.toggleAttribute('disabled', false);
    }

    const $confirmModal = this.shadowRoot.getElementById('confirm-modal');
    $confirmModal.classList.remove('hidden');
    document.documentElement.style.overflow = 'hidden';
  };

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

    // currnetUser가 없으면 초기 시작 화면으로 redirect해둠, 따라서 로딩 이후 currentUser를 가져오지 못한 경우는 신경쓰지 않음.

    this.shadowRoot.appendChild(ProfileDetailTemplate.content.cloneNode(true));

    // template에 데이터 넣기
    const $usernameInput = this.shadowRoot.getElementById('username');
    $usernameInput.value = this.currentUser.username;

    if (this.currentUser.gender === 'M') {
      this.shadowRoot.getElementById('male').checked = true;
    } else if (this.currentUser.gender === 'F') {
      this.shadowRoot.getElementById('female').checked = true;
    }

    const $userAddressInput = this.shadowRoot.getElementById('address');
    $userAddressInput.value = this.currentUser.address;

    if (this.currentUser.avatar) {
      const $avatarImage = this.shadowRoot.getElementById('avatar-image');
      $avatarImage.src = getPbImageURL(this.currentUser, 'avatar');
    }

    const $avatarInput = this.shadowRoot.getElementById('avatar');
    $avatarInput.addEventListener('change', this.handleAvatarInputChange);

    const $profileForm = this.shadowRoot.getElementById('profile-form');
    $profileForm.addEventListener('submit', this.handleProfileFormSubmit);
  }
}

customElements.define('c-profile-detail', ProfileDetail);
