const address = document.getElementById('address');
const searchBtn = document.getElementById('search-btn');
const agreeMatters = document.getElementById('agree-matters');
const agreeCheckboxes = agreeMatters.querySelectorAll('input[type="checkbox"]');
const saveBtn = document.getElementById('save-btn');

console.log(agreeCheckboxes);

function handleSearch() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
      // 예제를 참고하여 다양한 활용법을 확인해 보세요.
      address.value = data.sigungu;
    },
  }).open();
}

function handleAgreeCheck(e) {
  const target = e.target;
  if (target.id === 'agree-all') {
    if (target.checked) {
      agreeCheckboxes.forEach((box) => {
        box.checked = true;
      });
    } else {
      agreeCheckboxes.forEach((box) => {
        box.checked = false;
      });
    }
  }

  for (let i = 1; i < agreeCheckboxes.length; i++) {
    if (!agreeCheckboxes[i].checked) {
      saveBtn.classList.remove('bg-secondary', 'cursor-pointer');
      saveBtn.classList.add('bg-[#D8D9E1]', 'cursor-not-allowed');
      saveBtn.setAttribute('disabled', true);
      return;
    }
  }
  saveBtn.removeAttribute('disabled');
  saveBtn.classList.remove('bg-[#D8D9E1]', 'cursor-not-allowed');
  saveBtn.classList.add('bg-secondary', 'cursor-pointer');
}

searchBtn.addEventListener('click', handleSearch);
agreeMatters.addEventListener('click', handleAgreeCheck);
