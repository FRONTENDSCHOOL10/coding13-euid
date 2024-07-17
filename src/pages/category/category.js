const categoryButton = document.querySelectorAll('.category-button');

categoryButton.forEach((button) => {
  const buttonText = button.querySelector('.category').textContent;
  const storageButton = `category-${buttonText}`;

  button.addEventListener('click', () => {
    const img = button.querySelector('img');
    const span = button.querySelector('span');

    button.classList.toggle('bg-[#A7A7A7]');
    button.classList.toggle('bg-primary');
    span.classList.toggle('text-white');
    span.classList.toggle('text-black');

    img.src = button.classList.contains('bg-primary') ? '/icon/check.svg' : '/icon/category-plus.svg';
  });
});
