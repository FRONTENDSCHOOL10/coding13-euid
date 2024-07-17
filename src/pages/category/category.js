const categoryButton = document.querySelectorAll('.category-button');
let selectedCategories = [];

categoryButton.forEach((button) => {
  const buttonText = button.querySelector('.category').textContent;
  const storageKey = `${buttonText}`;

  const saveState = localStorage.getItem(storageKey);
  if (saveState === 'active') {
    activateButton(button);
    selectedCategories.push(buttonText);
  }

  button.addEventListener('click', () => {
    const isActive = button.classList.contains('bg-primary');

    if (isActive) {
      deactivateButton(button);
      localStorage.setItem(storageKey, 'inactive');
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
  });
});

function activateButton(button) {
  const img = button.querySelector('img');
  const span = button.querySelector('.category');

  button.classList.remove('bg-[#A7A7A7]');
  button.classList.add('bg-primary');
  span.classList.add('text-white');
  img.src = '/icon/check.svg';
}

function deactivateButton(button) {
  const img = button.querySelector('img');
  const span = button.querySelector('.category');

  button.classList.remove('bg-primary');
  button.classList.add('bg-[#A7A7A7]');
  span.classList.remove('text-white');
  img.src = '/icon/category-plus.svg';
}
