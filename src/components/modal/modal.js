import tailwindCSS from '/styles/tailwind.css?inline'; // css 파일 inline 가져오기

// 모달창 템플릿
const modalTemplate = document.createElement('template');
modalTemplate.innerHTML = `
  <style>${tailwindCSS}</style>
  <!-- 모달창 -->
  <dialog
    id="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
    class="w-[70%] max-w-xl rounded-[1.25rem] bg-background px-[1.125rem] pb-[1.125rem] pt-5 [box-shadow:0_0.25rem_0.25rem_0_rgba(0,_0,_0,_0.25)] xs:px-[1.575rem] xs:pb-[1.575rem] xs:pt-[1.75rem] sm:px-[2.025rem] sm:pb-[2.025rem] sm:pt-[2.25rem]"
  >
    <section class="flex flex-col items-center justify-center gap-5 xs:gap-[1.75rem] sm:gap-[2.25rem]">
      <h2 id="modal-title" class="text-base-group leading-[160%] text-wrap">제목</h2>
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
    </section>
  </dialog>
`;

// two-button용 닫기 버튼
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
  }

  setModalType(dataType) {
    switch (dataType) {
      case 'one-button':
        // this.shadowRoot.getElementById('modal-btn-wrapper').insertAdjacentHTML()
        break;
      case 'two-button':
        this.shadowRoot.getElementById('modal-btn-wrapper').insertAdjacentHTML('beforeend', cancelBtnTemplate);
        const dialog = this.shadowRoot.getElementById('dialog');
        const modalCancel = this.shadowRoot.getElementById('modal-cancel');
        modalCancel?.addEventListener('click', () => dialog.close());
        break;

      default:
        break;
    }
  }
}

customElements.define('c-modal', Modal);
