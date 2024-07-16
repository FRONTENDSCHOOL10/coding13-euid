import pb from '/api/pocketbase/';
import { UserService } from '/service/UserService';

UserService.currentUser();

const currentUserId = JSON.parse(localStorage.getItem('pocketbase_auth')).model.id;

const searchInput = document.querySelector('#search');
const suggestionSearchList = document.querySelector('#suggestion-search-list');
const recentSearchList = document.querySelector('#recent-search-list');
const deleteAllButton = document.querySelector('#delete-all');

// 검색어 입력하고 엔터 입력 시 해당 검색어 검색 결과 페이지로 이동
function handleSearch(e) {
  if (e.keyCode === 13) {
    e.preventDefault();

    const searchText = searchInput.value.trim();

    if (searchText.length > 0) {
      const encodeText = encodeURIComponent(searchText);
      window.location.href = `/pages/search-result/index.html?search=${encodeText}`;
    }
  }
}

// 추천 검색어 버튼 클릭 시 해당 검색어 검색 결과 페이지로 이동
function handleSuggestionList(e) {
  e.preventDefault();

  const suggestionButton = e.target.closest('button');
  const suggestionText = suggestionButton.innerText;

  if (!suggestionButton) return;

  const encodeText = encodeURIComponent(suggestionText);
  window.location.href = `/pages/search-result/index.html?search=${encodeText}`;
}

// 최근 검색어 목록 렌더링
async function renderRecentSearch() {
  const user = await pb.collection('users').getOne(currentUserId);
  const recentSearch = user.recent_search;
  const recentSearchArray = recentSearch.split(',');

  // 최근 검색어 목록이 없을 시 렌더링 되지 않도록
  if (!recentSearch) return;

  for (let item of recentSearchArray) {
    const template = `
      <li
        class="flex justify-between px-3 py-1.5 hover:bg-gray-200 xs:px-[1.05rem] xs:py-[0.525rem] sm:px-[1.35rem] sm:py-[0.675rem]"
      >
        <a
          href="/pages/search/"
          class="flex w-full items-center gap-2 text-[0.75rem] xs:gap-[0.7rem] xs:text-[1.05rem] sm:gap-[0.9rem] sm:text-[1.35rem]"
        >
          <img src="/icon/time.svg" alt="" class="aspect-square w-6 xs:w-[2.1rem] sm:w-[2.7rem]" />
          ${item}
        </a>
        <button type="button" aria-label="삭제">
          <img
            src="/icon/delete.svg"
            alt=""
            class="aspect-square w-[1.125rem] xs:w-[1.575rem] sm:w-[2.025rem]"
          />
        </button>
      </li>
    `;

    recentSearchList.insertAdjacentHTML('afterbegin', template);
  }
}

// 최근 검색어 전체 삭제
async function handleDeleteAll() {
  const data = { recent_search: '' };
  await pb.collection('users').update(currentUserId, data);

  recentSearchList.innerText = '';
}

// 최근 검색어 목록 핸들링
async function handleRecentList(e) {
  e.preventDefault();

  const user = await pb.collection('users').getOne(currentUserId);
  const recentSearch = user.recent_search;
  const recentSearchArray = recentSearch.split(',');

  const deleteButton = e.target.closest('button');
  const recentSearchItem = e.target.closest('li');
  const targetText = recentSearchItem.querySelector('a').innerText;

  if (deleteButton) {
    // 삭제 버튼 클릭 시
    // 돔에서 삭제하기
    recentSearchItem.remove();

    // 포켓베이스에서 삭제하기
    const filteredArray = recentSearchArray.filter((value) => value !== targetText);
    const data = { recent_search: filteredArray.toString() };

    await pb.collection('users').update(currentUserId, data);
  } else {
    // 그 외 부분 클릭 시
    // 해당 검색어 검색 결과 페이지로 이동
    const encodeText = encodeURIComponent(targetText);
    window.location.href = `/pages/search-result/index.html?search=${encodeText}`;
  }
}

renderRecentSearch();
searchInput.addEventListener('keypress', handleSearch);
suggestionSearchList.addEventListener('click', handleSuggestionList);
recentSearchList.addEventListener('click', handleRecentList);
deleteAllButton.addEventListener('click', handleDeleteAll);
