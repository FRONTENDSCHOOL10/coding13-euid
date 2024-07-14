import pb from '/api/pocketbase';

/* 경과 시간 계산 함수 */
function getTimeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}초 전`;

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}시간 전`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}일 전`;

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `${diffInWeeks}주 전`;

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths}개월 전`;

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears}년 전`;
}

async function renderChatList() {
  const chatList = await pb.collection('chats').getFullList({
    sort: 'created',
    expand: 'sender_id, post_id',
  });

  const chatContainer = document.querySelector('.chatContainer');

  chatList.forEach((chat) => {
    const senderUsername = chat.expand.sender_id.username;
    const senderAvatar = chat.expand.sender_id.avatar;
    const avatarURL = senderAvatar ? pb.getFileUrl(chat.expand.sender_id, senderAvatar) : '/assets/profileIcon.png';
    const photo = chat.expand.post_id.photo;
    const sendTime = chat.updated;
    const timeAgo = getTimeAgo(sendTime);

    // 여러 장의 사진 처리
    let photoURL = '/assets/storyImage.png'; // 기본 이미지
    if (chat.expand.post_id.photo) {
      if (Array.isArray(chat.expand.post_id.photo)) {
        // 배열인 경우 첫 번째 사진 사용
        photoURL = pb.getFileUrl(chat.expand.post_id, chat.expand.post_id.photo[0]);
      } else {
        // 단일 사진인 경우
        photoURL = pb.getFileUrl(chat.expand.post_id, chat.expand.post_id.photo);
      }
    }

    const senderAddress = chat.expand.sender_id.address;

    const template = `
    <a href="#" class="flex gap-3 border-b p-3">
          <img
            class="h-11 w-11 flex-shrink-0 overflow-hidden rounded-md xs:h-[3.85rem] xs:w-[3.85rem] sm:h-[4.95rem] sm:w-[4.95rem]"
            src = "${avatarURL}"
            alt="채팅 상대 프로필"
          />
        

          <section class="relative flex w-full flex-col justify-center overflow-hidden" aria-label="채팅방 정보">
            <div class="flex items-center">
              <h2
                class="text-base-group mr-1 overflow-hidden text-ellipsis whitespace-nowrap font-semibold leading-[150%] xs:mr-[0.35rem] sm:mr-[0.45rem]"
              >
                ${senderUsername}
              </h2>
              <span class="text-sm-group leading-[1.6] text-contentTertiary">${senderAddress} · ${timeAgo}</span>
            </div>
            <div class="flex gap-2 xs:gap-[0.7rem] sm:gap-[0.9rem]">
              <p class="text-base-group overflow-hidden text-ellipsis whitespace-nowrap">
                채팅 내용에는 뭘 넣어야 하는가
               
              </p>
            </div>
          </section>
          <img
            src="${photoURL}"
            class="h-9 w-9 xs:h-[3.15rem] xs:w-[3.15rem] sm:h-[4.05rem] sm:w-[4.05rem]"
            alt="채팅방 내의 이미지 미리보기"
          />
        </a>
    `;
    chatContainer.insertAdjacentHTML('afterbegin', template);
  });
}

renderChatList();
