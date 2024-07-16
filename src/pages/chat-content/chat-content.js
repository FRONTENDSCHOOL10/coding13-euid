import pb from '/api/pocketbase.js';
import { UserService } from '/service/UserService';
import { getPbImagesURL } from '/api/getPbImageURL';

async function chatContent() {
  /* -------------------------------- 로그인상태 식별 -------------------------------- */
  const currentUser = UserService.currentUser();

  /* --------------------------------- 페이지 및 유저정보 --------------------------------- */
  const params = new URLSearchParams(location.search);
  const chat_id = params.get('chat');

  /* -------------------------------- DOM요소 선택 -------------------------------- */

  // 헤더
  const opponentName = document.getElementById('opponent-name');
  // 판매글 정보
  const exchangePhoto = document.getElementById('exchange-photo');
  const exchangeState = document.getElementById('exchange-state');
  const exchangeTitle = document.getElementById('exchange-title');
  const exchantePrice = document.getElementById('exchange-price');
  // 메세지 내역
  const contentArea = document.getElementById('content-area');
  // 메세지 입력 폼
  const messageInput = document.getElementById('message-input');
  const sendBtn = document.getElementById('send-btn');

  /* ------------------------------ pocketbase 작업 ----------------------------- */
  // 실시간 메세지 구독 함수
  function subscribeToMessages(chatId, callback) {
    return pb.collection('messages').subscribe('*', function (e) {
      // 발생한 메세지가 현재 채팅방의 메세지인 경우 렌더링 / read처리(update) 이벤트에는 X
      if (e.record.chat_id === chatId && e.action !== 'update') {
        callback(e.record);
        scrollTo({
          top: document.body.scrollHeight,
        });
      }
    });
  }

  // 메세지 발송 함수 (sendBtn 핸들링 함수)
  async function sendMessage(chatId, senderId, receiverId, content) {
    try {
      const messageData = {
        chat_id: chatId,
        sender_id: senderId,
        receiver_id: receiverId,
        content: content,
      };
      const record = await pb.collection('messages').create(messageData);
      messageInput.value = '';
    } catch (error) {
      console.error('메시지 전송 실패:', error);
    }
  }

  /* --------------------------------- 렌더링 함수 --------------------------------- */
  // 날짜 출력 함수
  function renderDate(date) {
    const template = `
  <span
    class="text-sm-group py-1 text-center leading-[160%] text-contentSecondary xs:py-[0.35rem] sm:py-[0.45rem]"
  >
    <span class="sr-only">메세지 전송일</span>
    ${date.getUTCFullYear()}년 ${date.getUTCMonth() + 1}월 ${date.getUTCDate()}일
  </span>
  `;
    // 삽입
    contentArea.insertAdjacentHTML('beforeend', template);
  }

  // 메세지 렌더링 함수
  function renderMessage({ id, sender_id, content, created, read }) {
    // 시간 표기를 위한 변수
    const time = new Date(created);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const period = hours >= 12 ? '오후' : '오전';

    // 보낸 메세지일 때
    if (sender_id === currentUser.id) {
      const template = `
      <div
      role="group"
      aria-label="보낸 메세지"
      class="flex items-end justify-end gap-[0.125rem] xs:gap-[0.175rem] sm:gap-[0.225rem]"
    >
      <span class="text-sm-group leading-[160%] text-contentSecondary">
        <span class="sr-only">메세지 전송 시간</span>
        ${period} ${hours}:${minutes}
      </span>
      <div
        class="text-base-group w-fit max-w-[80%] rounded-[1.25rem] bg-[#8DB0F9] px-[0.875rem] py-2 text-background xs:rounded-[1.75rem] xs:px-[1.225rem] xs:py-[0.7rem] sm:rounded-[2.25rem] sm:px-[1.575rem] sm:py-[0.9rem]"
      >
        ${content}
      </div>
    </div>
    `;
      // 템플릿 삽입
      contentArea.insertAdjacentHTML('beforeend', template);
    }
    // 받은 메세지일 때
    else {
      const template = `
      <div
      role="group"
      aria-label="받은 메세지"
      class="flex items-end justify-start gap-[0.125rem] xs:gap-[0.175rem] sm:gap-[0.225rem]"
    >
      <span class="order-1 text-sm-group leading-[160%] text-contentSecondary">
        <span class="sr-only">메세지 전송 시간</span>
        ${period} ${hours}:${minutes}
      </span>
      <div
        class="text-base-group w-fit max-w-[80%] rounded-[1.25rem] bg-[#EBECF0] px-[0.875rem] py-2 text-contentPrimary xs:rounded-[1.75rem] xs:px-[1.225rem] xs:py-[0.7rem] sm:rounded-[2.25rem] sm:px-[1.575rem] sm:py-[0.9rem]"
      >
        ${content}
      </div>
    </div>
    `;
      // 템플릿 삽입
      contentArea.insertAdjacentHTML('beforeend', template);
      // 읽음처리
      if (!read) {
        new Promise(() => {
          pb.collection('messages').update(id, { read: true });
        });
      }
    }
  }

  // 페이지 렌더링 함수
  async function renderChatContents() {
    // 채팅방 데이터 불러오기
    const data = await pb.collection('chats').getOne(chat_id, {
      expand: 'post_id, sender_id, receiver_id',
    });
    // 채팅상대 식별
    const opponent = data.sender_id === currentUser.id ? data.receiver_id : data.sender_id;

    // 헤더 정보 렌더링
    opponentName.innerText =
      data.sender_id === currentUser.id ? data.expand.receiver_id.username : data.expand.sender_id.username;
    // 판매글 정보 렌더링
    exchangePhoto.setAttribute('src', getPbImagesURL(data.expand.post_id, 0));
    exchangeState.innerText = data.expand.post_id.state;
    exchangeTitle.innerText = data.expand.post_id.title;
    exchantePrice.innerText = `${data.expand.post_id.price.toLocaleString()}원`;

    // 해당 채팅방의 메세지내역 전부 가져오기 (오래된순)
    const messageList = await pb.collection('messages').getFullList({
      filter: `chat_id = "${chat_id}"`,
      sort: 'created',
    });

    // 각 메세지 처리
    messageList.forEach((item, index) => {
      // 첫 메세지는 날짜 출력
      if (index === 0) {
        const date = new Date(item.created);
        renderDate(date);
      }
      // 두번째 메세지부터는 이전 메세지랑 날짜 다르면 출력
      else {
        const date1 = new Date(messageList[index - 1].created);
        const date2 = new Date(messageList[index].created);
        // 두 메세지의 날짜 비교
        if (
          date1.getUTCFullYear() !== date2.getUTCFullYear() ||
          date1.getUTCMonth() !== date2.getUTCMonth() ||
          date1.getUTCDate() !== date2.getUTCDate()
        ) {
          renderDate(date2);
        }
      }

      // 메세지 렌더링
      renderMessage(item);
    });

    scrollTo({
      top: document.body.scrollHeight,
    });

    return { data, opponent };
  }

  /* --------------------------------- 함수 실행부 --------------------------------- */
  renderChatContents()
    // 채팅 내역 렌더링 후에 구독
    .then(({ data, opponent }) => {
      // 해당 채팅방의 실시간 메세지 구독
      subscribeToMessages(chat_id, renderMessage);
      // 버튼 클릭시 메세지 전송
      sendBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sendMessage(chat_id, currentUser.id, opponent, messageInput.value);
      });
    });
}

chatContent();
