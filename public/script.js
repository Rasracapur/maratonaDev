let button = document.querySelector('header button');
button.addEventListener("click", () => {
  let form = document.querySelector(".form")
  form.classList.toggle('hide')
});

let sectionButton = document.querySelector(".ajuda")
sectionButton.addEventListener('click',() => {
  alert("Obrigado por sua ajuda 😊")
})
