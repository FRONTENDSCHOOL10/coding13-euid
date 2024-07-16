import tailwindCSS from '/styles/tailwind.css?inline'; // css 파일 inline 가져오기

const modalTemplate = document.createElement('template');
modalTemplate.innerHTML = `
  <style>${tailwindCSS}</style>
  <!-- 모달창 배경 -->
  <div id="modal-bg" hidden class="fixed left-0 top-0 z-50 h-screen w-full bg-contentTertiary bg-opacity-20">
  <!-- 모달창 -->
    <dialog
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      class="fixed left-1/2 top-1/2 flex w-[70%] max-w-xl -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-5 rounded-[1.25rem] bg-background px-[1.125rem] pb-[1.125rem] pt-5 [box-shadow:0_0.25rem_0.25rem_0_rgba(0,_0,_0,_0.25)] xs:gap-[1.75rem] xs:px-[1.575rem] xs:pb-[1.575rem] xs:pt-[1.75rem] sm:gap-[2.25rem] sm:px-[2.025rem] sm:pb-[2.025rem] sm:pt-[2.25rem]"
    >
      <h2 id="modal-title" class="text-base-group leading-[160%]">제목</h2>
      <p id="modal-description" class="text-sm-group leading-[160%] text-contentSecondary">내용</p>
      <div id="modal-btn-wrapper" class="flex w-full gap-1 xs:gap-[0.35rem] sm:gap-[0.45rem]">
        <button
          id="modal-okay"
          aria-label="확인 및 모달 닫기"
          class="text-base-group flex-grow cursor-pointer rounded-lg bg-primary py-2 text-background"
        >
          확인
        </button>
      </div>
    </dialog>
  </div>
`;

const cancelBtnTemplate = `
  <button
    id="modal-cancel"
    aria-label="모달 닫기"
    class="text-base-group flex-grow cursor-pointer rounded-lg bg-contentTertiary py-2 text-contentPrimary"
  >
    닫기
  </button>
`;

class Modal extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(modalTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.setModalType(this.dataset.type);
    const modalBg = this.shadowRoot.getElementById('modal-bg');
    const modalCancel = this.shadowRoot.getElementById('modal-cancel');
    modalCancel?.addEventListener('click', () => (modalBg.hidden = true));
  }

  setModalType(dataType) {
    switch (dataType) {
      case 'one-button':
        // this.shadowRoot.getElementById('modal-btn-wrapper').insertAdjacentHTML()
        break;
      case 'two-button':
        this.shadowRoot.getElementById('modal-btn-wrapper').insertAdjacentHTML('beforeend', cancelBtnTemplate);
        break;

      default:
        break;
    }
  }
}

customElements.define('c-modal', Modal);
