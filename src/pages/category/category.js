const categoryButton = document.querySelectorAll('.category-button');
const searchInput = document.querySelector('#search');
const saveButton = document.querySelector('.save-button');
let selectedCategories = []; // 선택된 카테고리 저장

// 한글 검색을 위한 한글 분해 함수
function decomposeHangul(str) {
  return str.normalize('NFD');
}

// 카테고리 버튼 활성화 됐을 때
function activateButton(button) {
  const img = button.querySelector('img');
  const span = button.querySelector('.category');

  button.classList.remove('bg-[#A7A7A7]');
  button.classList.add('bg-primary');
  span.classList.add('text-white');
  img.src = '/icon/check.svg';
  img.alt = '선택됨';
}

// 카테고리 버튼 비활성화 됐을 때
function deactivateButton(button) {
  const img = button.querySelector('img');
  const span = button.querySelector('.category');

  button.classList.remove('bg-primary');
  button.classList.add('bg-[#A7A7A7]');
  span.classList.remove('text-white');
  img.src = '/icon/category-plus.svg';
  img.alt = '선택되지 않음';
}

// "이대로 저장할래요" 버튼 상태 업데이트 - 최소 한 개는 선택해야 저장하기 버튼 활성화
function updateSaveButton() {
  if (selectedCategories.length > 0) {
    // 카테고리 하나 이상 선택 시
    saveButton.classList.remove('bg-[#A7A7A7]');
    saveButton.classList.add('bg-primary');
    saveButton.classList.remove('pointer-events-none');
    saveButton.classList.add('pointer-events-auto');
  } else {
    // 선택된 카테고리 없을 시
    saveButton.classList.remove('bg-primary');
    saveButton.classList.add('bg-[#A7A7A7]');
    saveButton.classList.add('pointer-events-none');
    saveButton.classList.remove('pointer-events-auto');
  }
}

// 카테고리 검색하기
function handleSearch(e) {
  const searchTerm = decomposeHangul(e.target.value.toLowerCase()); // 검색어 분해 및 소문자 변환

  categoryButton.forEach((button) => {
    const categoryDetail = decomposeHangul(button.querySelector('.category-detail').textContent.toLowerCase());
    const category = decomposeHangul(button.querySelector('.category span:first-child').textContent.toLowerCase());

    // 검색 입력이 공란일 경우 버튼 스타일 초기화
    if (searchTerm === '') {
      button.style.opacity = '1';
      button.style.transform = 'scale(1)';
      button.style.transition = 'none';
    } else {
      button.style.transition = 'none'; // 조건 확인 전에 전환 없음
      if (categoryDetail.includes(searchTerm) || category.includes(searchTerm)) {
        button.style.opacity = '1';
        button.style.transform = 'scale(1.02)';
        button.style.transition = 'all 0.3s ease';
      } else {
        button.style.opacity = '0.5';
        button.style.transform = 'scale(1)';
        button.style.transition = 'none';
      }
    }
  });
}

// 카테고리 localStorage에 저장하기
categoryButton.forEach((button) => {
  const buttonText = button.querySelector('.category').textContent;
  const storageKey = `category_${buttonText}`; // locatStorage 키 생성

  const saveState = localStorage.getItem(storageKey);
  if (saveState === 'active') {
    // 저장된 상태가 활성화
    activateButton(button);
    selectedCategories.push(buttonText);
  }

  button.addEventListener('click', () => {
    const isActive = button.classList.contains('bg-primary'); // 버튼이 활성화 상태인지 확인

    if (isActive) {
      deactivateButton(button);
      localStorage.setItem(storageKey, 'inactive');

      // 현재 선택된 카테고리 버튼만 포함되도록
      selectedCategories = selectedCategories.filter((category) => category !== buttonText);
    } else {
      if (selectedCategories.length < 5) {
        activateButton(button);
        localStorage.setItem(storageKey, 'active');
        selectedCategories.push(buttonText);
      } else {
        alert('최대 다섯 개만 선택하실 수 있습니다.');
      }
    }
    updateSaveButton(); // 저장 버튼 상태 업데이트
  });
});

updateSaveButton(); // 페이지 로드 시 저장 버튼 상태 업데이트

searchInput.addEventListener('input', handleSearch);
