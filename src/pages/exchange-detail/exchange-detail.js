import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import { getPbImageURL, getPbImagesURL } from '/api/getPbImageURL';
import pb from '/api/pocketbase.js';
import { UserService } from '/service/UserService.js';
import calcTimeDifference from '/utils/calcTimeDifference.js';
import debounce from '/utils/debounce';

import 'swiper/css';
import 'swiper/css/pagination';

// currentUser를 사용하기 위해 async함수로 감쌌음
async function exchangeDetail() {
  /* --------------------------- 로그인된 유저 정보 + 토큰 검증 --------------------------- */
  const currentUser = await UserService.currentUser();

  /* -------------------------------- DOM 요소 선택 ------------------------------- */
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  const userAvatar = document.getElementById('user-avatar');
  const userName = document.getElementById('user-name');
  const userAddress = document.getElementById('user-address');
  const postTitle = document.getElementById('post-title');
  const postCategory = document.getElementById('post-category');
  const postCreated = document.getElementById('post-created');
  const postDescription = document.getElementById('post-description');
  const postPrice = document.getElementById('post-price');
  const relatedList = document.getElementById('related-list');
  const chatBtn = document.getElementById('chat-btn');
  const interestBtn = document.getElementById('interest-btn');
  const interestIcon = interestBtn.querySelector('img');

  /* -------------------------- query string으로 판매글 식별 ------------------------- */
  const params = new URLSearchParams(location.search);
  const post_id = params.get('post');

  /* --------------------------------- 렌더링 함수 --------------------------------- */
  // post 내용 렌더링 함수
  async function renderPostDetail() {
    try {
      // post 정보 불러오기
      const data = await pb.collection('posts').getOne(post_id, {
        expand: 'user_id',
      });
      const { category, photo, title, description, price, state, created } = data;

      // 물품 사진 슬라이드 생성
      photo.forEach((item, index) => {
        // 슬라이드 템플릿
        const slideTemplate = `
      <div aria-roledescription="slide" class="swiper-slide w-screen h-[100vw]">
        <img src=${getPbImagesURL(data, index)} alt="물품사진${index + 1}" class="w-screen h-[100vw] object-cover" />
      </div>
    `;
        // 슬라이드 삽입
        swiperWrapper.insertAdjacentHTML('beforeend', slideTemplate);
      });

      // 판매자 정보 삽입
      const { username, address } = data.expand.user_id;
      userAvatar.src = getPbImageURL(data.expand.user_id, 'avatar');
      userName.textContent = username;
      userAddress.textContent = address;

      // 제목, 카테고리, 본문, 가격, 작성시간 삽입
      postTitle.textContent = title;
      postCategory.textContent = category;
      postDescription.textContent = description;
      postPrice.textContent = `${price.toLocaleString()}원`;
      postCreated.textContent = calcTimeDifference(created);

      // '관심글 등록' 버튼 아이콘 및 pressed 상태 렌더링
      if (currentUser.interesting.includes(post_id)) {
        interestIcon.src = '/icon/heart-solid.svg';
        interestBtn.ariaPressed = 'true';
      } else {
        interestIcon.src = '/icon/heart.svg';
        interestBtn.ariaPressed = 'false';
      }

      return data;
    } catch (err) {
      console.error(err);
    }
  }

  // 연관 글 목록 렌더링 함수
  async function renderRelatedList({ id, category }) {
    try {
      const list = await pb.collection('posts').getList(1, 4, {
        filter: `category = "${category}" && id != "${id}"`,
        sort: '-created',
      });
      const { items } = list;

      items.forEach((item, index) => {
        const liTemplate = `
      <li class="mb-5 w-[43.125vw] xs:mb-[1.75rem] sm:mb-[2.25rem]">
        <article>
          <img
            src=${getPbImagesURL(item, index)}
            alt="관련 글${index + 1}"
            class="mb-3 w-[43.125vw] object-cover rounded-[5.797101449275362%] [aspect-ratio:8.625/6.5] xs:mb-[1.05rem] sm:mb-[1.35rem]"
          />
          <h4 class="text-sm-group leading-[160%]">${item.title}</h4>
          <strong class="text-sm-group font-semibold">${item.price.toLocaleString()}원</strong>
        </article>
      </li>
    `;

        relatedList.insertAdjacentHTML('beforeend', liTemplate);
      });
    } catch (err) {
      console.error(err);
    }
  }

  /* -------------------------------- 이벤트 핸들링 함수 ------------------------------- */
  // '채팅하기 버튼' 클릭 핸들링함수
  function handleClickChat({ id: post_id, user_id }) {
    pb.collection('chats')
      .getFirstListItem(`post_id = "${post_id}" && sender_id = "${currentUser.id}"`)
      // 진행 중인 채팅이 있을 때
      .then((res) => {
        location.href = `/pages/chat-content/index.html?chat=${res.id}`;
      })
      .catch((err) => {
        if (err.status === 404) {
          // 진행 중인 채팅이 없을 때
          const data = {
            sender_id: currentUser.id,
            receiver_id: user_id,
            post_id: post_id,
          };
          pb.collection('chats')
            .create(data)
            // 채팅방 생성 성공
            .then((res) => {
              location.href = `/pages/chat-content/index.html?chat=${res.id}`;
            })
            // 채팅방 생성 실패
            .catch((err) => {
              console.error(err);
            });
        } else {
          console.error(err);
        }
      });
  }

  // '관심글' 서버 업데이트 함수
  async function updateInterest(postId, userId, isPressed) {
    try {
      const user = await pb.collection('users').getOne(userId);
      const post = await pb.collection('posts').getOne(postId);

      // const interestedCount = post.interested.length;
      // 사용자의 interesting 목록에 포스트 ID가 있는지 확인
      const isInterested = user.interesting.includes(postId);

      // 원래 interested였는지 && 버튼이 눌렸는지 상태에 따라 배열수정
      if (isPressed && !isInterested) {
        user.interesting.push(postId);
        post.interested.push(userId);
      } else if (!isPressed && isInterested) {
        user.interesting = user.interesting.filter((id) => id !== postId);
        post.interested = post.interested.filter((id) => id !== userId);
      }

      // 사용자, 포스트 정보 업데이트
      await pb.collection('users').update(userId, { interesting: user.interesting });
      await pb.collection('posts').update(postId, { interested: post.interested });
    } catch (error) {
      console.error('Error toggling interest:', error);
    }
  }
  // '관심글' 서버 업데이트 함수를 1초 디바운스
  const debounceInterest = debounce(updateInterest, 1000);

  // '관심글 등록 버튼' 클릭 핸들링 함수
  function handleClickInterest({ id: post_id }) {
    // 버튼의 토글 상태
    let isPressed;

    if (interestBtn.ariaPressed === 'true') {
      interestBtn.ariaPressed = 'false';
      interestIcon.src = '/icon/heart.svg';
      isPressed = false;
    } else {
      interestBtn.ariaPressed = 'true';
      interestIcon.src = '/icon/heart-solid.svg';
      isPressed = true;
    }

    debounceInterest(post_id, currentUser.id, isPressed);
  }

  /* --------------------------------- 함수 실행부 --------------------------------- */
  renderPostDetail().then((res) => {
    // 스와이퍼 정의
    const slides = document.querySelectorAll('.swiper-slide');

    const swiper = new Swiper('.swiper', {
      modules: [Pagination],
      loop: slides.length > 1,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
      keyboard: {
        enabled: true,
      },
      a11y: {
        enabled: true,
        prevSlideMessage: '이전 슬라이드',
        nextSlideMessage: '다음 슬라이드',
        firstSlideMessage: '첫 번째 슬라이드',
        lastSlideMessage: '마지막 슬라이드',
        paginationBulletMessage: '{{index}}번째 슬라이드로 이동',
      },
    });

    // 연관 글 목록 렌더링
    renderRelatedList(res);
    // '채팅하기 버튼' 핸들링
    chatBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleClickChat(res);
    });
    // '관심글 등록 버튼' 핸들링
    interestBtn.addEventListener('click', () => {
      handleClickInterest(res);
    });
  });
}

// 전체 실행
exchangeDetail();
