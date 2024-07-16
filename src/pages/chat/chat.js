import calcTimeDifference from '/utils/calcTimeDifference';
import pb from '/api/pocketbase';
import { UserService } from '/service/UserService';

const chatContainer = document.querySelector('.chatContainer');

// pocketbase에서 채팅 목록 가져오기
async function fetchChatList() {
  // 현재 로그인 된 사용자 정보 가져오기
  const currentUser = await UserService.currentUser();

  try {
    // 현재 사용자와 관련된 채팅 목록을 필터링하여 가져오기
    return await pb.collection('chats').getFullList({
      filter: `sender_id = "${currentUser.id}" || receiver_id = "${currentUser.id}"`,
      sort: 'created', // 최근 생성된 순 정렬
      expand: 'sender_id, receiver_id, post_id, id',
    });
  } catch (error) {
    console.error('Failed to fetch chat list:', error);
    return [];
  }
}

// 상대방 프로필 사진 불러오기
function getAvatarURL(user) {
  return user.avatar ? pb.getFileUrl(user, user.avatar) : '/assets/profileIcon.png';
}

// 채팅 내의 사진 불러오기
function getPhotoURL(post) {
  if (!post || !post.photo) return null;

  if (Array.isArray(post.photo)) {
    return pb.getFileUrl(post, post.photo[0]);
  }

  return pb.getFileUrl(post, post.photo);
}

// 채팅 항목에 대한 HTML 템플릿 생성
function createChatTemplate({ chatId, username, avatarURL, address, timeAgo, photoURL, latestMessage }) {
  return `
    <a href="/pages/chat-content/index.html?chat=${chatId}" class="flex gap-3 border-b p-3">
      <img
        class="h-11 w-11 flex-shrink-0 overflow-hidden rounded-full xs:h-[3.85rem] xs:w-[3.85rem] sm:h-[4.95rem] sm:w-[4.95rem]"
        src="${avatarURL}"
        alt="채팅 상대 프로필"
      />
      <section class="relative flex w-full flex-col justify-center overflow-hidden" aria-label="채팅방 정보">
        <div class="flex items-center">
          <h2 class="text-base-group mr-1 overflow-hidden text-ellipsis whitespace-nowrap font-semibold leading-[150%] xs:mr-[0.35rem] sm:mr-[0.45rem]">
            ${username}
          </h2>
          <span class="text-sm-group leading-[1.6] text-contentTertiary">${address} · ${timeAgo}</span>
        </div>
        <div class="flex gap-2 xs:gap-[0.7rem] sm:gap-[0.9rem]">
          <p class="text-base-group overflow-hidden text-ellipsis whitespace-nowrap">
            ${latestMessage}
          </p>
        </div>
      </section>
      ${
        photoURL
          ? `
        <img
          src="${photoURL}"
          class="h-9 w-9 xs:h-[3.15rem] xs:w-[3.15rem] sm:h-[4.05rem] sm:w-[4.05rem]"
          alt="채팅방 내의 이미지 미리보기"
        />
      `
          : ''
      }
    </a>
  `;
}

// 채팅 목록 가져와서 처리, 생성된 HTML을 컨테이너에 삽입
async function renderChatList() {
  // 채팅 목록 가져오기
  const chatList = await fetchChatList();
  const currentUser = await UserService.currentUser();

  for (const chat of chatList) {
    const user = chat.sender_id === currentUser.id ? chat.expand.receiver_id : chat.expand.sender_id;
    const post = chat.expand.post_id;

    // 각 채팅에 대한 최신 메시지 가져오기
    try {
      const message = await pb.collection('messages').getFirstListItem(`chat_id = "${chat.id}"`, {
        sort: '-created',
      });

      let latestMessageContent = message.content;

      const chatData = {
        chatId: chat.id,
        username: user.username,
        avatarURL: getAvatarURL(user),
        address: user.address,
        timeAgo: calcTimeDifference(chat.updated),
        photoURL: getPhotoURL(post),
        latestMessage: latestMessageContent,
      };

      const template = createChatTemplate(chatData);
      chatContainer.insertAdjacentHTML('afterbegin', template);
    } catch (err) {
      if (err.status === 404) {
        // 메시지 없는 채팅방은 건너뛰기
        continue;
      } else {
        console.error('Error fetching message:', err);
      }
    }
  }
}

renderChatList();
