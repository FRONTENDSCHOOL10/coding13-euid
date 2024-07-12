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

function activeButton(btnNode, activeClass, disabledClass) {
  btnNode.removeAttribute('disabled');
  btnNode.classList.remove(disabledClass, 'cursor-pointer');
  btnNode.classList.add(activeClass, 'cursor-not-allowed');
}
function disableButton(btnNode, activeClass, disabledClass) {
  btnNode.setAttribute('disabled', true);
  btnNode.classList.remove(activeClass, 'cursor-pointer');
  btnNode.classList.add(disabledClass, 'cursor-not-allowed');
}

function handleAgreeCheck(e) {
  const target = e.target.closest('input[type="checkbox"]');
  if (!target) return;

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

  if (agreeCheckboxes[1].checked && agreeCheckboxes[2].checked && agreeCheckboxes[3].checked) {
    agreeCheckboxes[0].checked = true;
    activeButton(saveBtn, 'bg-secondary', 'bg-[#D8D9E1]');
  } else {
    agreeCheckboxes[0].checked = false;
    disableButton(saveBtn, 'bg-secondary', 'bg-[#D8D9E1]');
  }
}

searchBtn.addEventListener('click', handleSearch);
agreeMatters.addEventListener('click', handleAgreeCheck);
