import pb from '/api/pocketbase/';
import { getPbImagesURL } from '/api/getPbImageURL/';

async function renderPostList() {
  const postList = await pb.collection('posts').getFullList({
    sort: 'created',
  });

  for (let item of postList) {
    const postCreator = await pb.collection('users').getOne(item.user_id);
    const ul = document.querySelector('#exchange-list');

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

    ul.insertAdjacentHTML('afterbegin', template);

    function renderState() {
      const state = ul.querySelector('li > a > section > div > span');

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

    renderState();

    function renderTime() {
      const time = ul.querySelector('li > a > section > span');

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

    renderTime();
  }
}

renderPostList();

const plusButton = document.querySelector('#plus-button');

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

plusButton.addEventListener('click', handleClick);
