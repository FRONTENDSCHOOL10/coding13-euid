import '/components/loading-button/loading-button';

import pb from '/api/pocketbase.js';
import { UserService } from '/service/UserService.js';
import { convertImageToWebP } from '/utils/convertImageToWebP.js';

async function writePost() {
  const currentUser = await UserService.currentUser();
  const photoList = [];

  /* ------------------------------ query string ------------------------------ */
  const params = new URLSearchParams(location.search);
  const category = params.get('category');

  /* -------------------------------- DOM 요소 선택 ------------------------------- */
  const categoryText = document.getElementById('category-text');
  const photoSection = document.getElementById('photo-section');
  const uploadPhoto = document.getElementById('upload-photo');
  const completeBtn = document.getElementById('complete-btn');
  const formTitle = document.getElementById('form-title');
  const formPrice = document.getElementById('form-price');
  const formDescription = document.getElementById('form-description');

  /* ------------------------------ pocketbase 동작 ----------------------------- */
  // pocketbase에 post생성
  async function createPost({ user_id, category, photo, title, price, description }) {
    await pb.collection('posts')
      .create({
        user_id,
        category,
        photo,
        title,
        description,
        price,
      })
      .then((res) => {
        alert('거래글이 등록되었습니다.');
        location.href = '/pages/exchange/';
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /* ------------------------------- 이벤트 핸들링 함수 ------------------------------- */
  // 사진 업로드 버튼(input)
  function handleUploadPhoto(e) {
    [...e.target.files].forEach((img) => {
      convertImageToWebP(img)
        // webp로 변환 후 실행
        .then((res) => {
          // webp로 변환한 사진을 list에 담음 (pocketbase에 전송할 것)
          photoList.push(res);
          const srcUrl = URL.createObjectURL(res);
          const imgTemplate = `
          <img src=${srcUrl} alt="" class="h-12 w-12 rounded border xs:h-[4.2rem] xs:w-[4.2rem] xs:rounded-[0.35rem] sm:h-[5.4rem] sm:w-[5.4rem] sm:rounded-[0.45rem]" />
        `;
          // 선택한 사진들을 화면에 뿌려줌
          photoSection.insertAdjacentHTML('beforeend', imgTemplate);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }

  // 완료 버튼 클릭 -> post 등록
  async function handleCompleteClick() {
    // form이 모두 입력되어야 함
    if (!category || !photoList.length || !formTitle.value || !formPrice || !formDescription) {
      alert('모든 내용을 입력해주세요.');
      return;
    }

    await createPost({
      user_id: currentUser.id,
      category: category,
      photo: photoList,
      title: formTitle.value,
      price: formPrice.value,
      description: formDescription.value,
    });
  }

  // category 표시
  categoryText.textContent = category;
  // 사진 업로드 이벤트
  uploadPhoto.addEventListener('change', handleUploadPhoto);
  // 완료 버튼 클릭 이벤트
  completeBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    completeBtn.toggleAttribute('disabled', true);
    completeBtn.classList.add('cursor-not-allowed');
    completeBtn.toggleAttribute('loading', true);

    await handleCompleteClick();

    completeBtn.toggleAttribute('loading', false);
    completeBtn.toggleAttribute('disabled', false);
    completeBtn.classList.remove('cursor-not-allowed');
  });
  console.log(!photoList);
}

writePost();
