const questions = document.querySelectorAll('.question-main');
let questionsArr = [...questions];
questionsArr.forEach((el) => {
  el.style.userSelect = "all";
});