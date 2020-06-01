

const quizForm = document.querySelector("form");
const scoreUi = document.querySelector("[data-score]");

const questionsAndAnswersBank = [
  {
    question: "Which one of the following soils is ideal for growing cotton?",
    options: ["Regur soil", "Laterite soil", "Desert soil"],
    correctAnswerIndex: "0",
  },
  {
    question: "What is the largest organ of the human body?",
    options: ["Heart", "Skin", "Liver"],
    correctAnswerIndex: "1",
  },
  {
    question: "Soil is formed by the process of",
    options: ["Denudation", "Gradation", "Weathering"],
    correctAnswerIndex: "2",
  },
  {
    question:
      "Land left without cultivation for one or less than one agricultural year is called",
    options: ["Cultural waste land", "Current fallow land", "Waste land"],
    correctAnswerIndex: "1",
  },
  {
    question:
      "There is enough for everybody’s need but not for anybody’s greed. Who said this?",
    options: ["Jawahar Lai Nehru", "Atal Bihari Vajpai", "M. K. Gandhi"],
    correctAnswerIndex: "2",
  },
  {
    question:
      "Resources which are surveyed and their quantity and quality have been determined for utilisation are known as",
    options: ["Potential resources", "Stock", "Developed resources"],
    correctAnswerIndex: "2",
  },
  {
    question:
      "Which one of the following statements is correct as regard to international resources?",
    options: [
      "Resources which are regulated by international institutions.",
      "Resources which lie beyond the territorial waters.",
      "Resources which are found along the international frontier.<br> (d) Resources which are not yet developed.",
    ],
    correctAnswerIndex: "0",
  },
  {
    question: "The first International Earth Summit was held in",
    options: ["Geneva", "New York", "Rio de Janeiro "],
    correctAnswerIndex: "2",
  },
  {
    question: "The most widespread relief feature of India is",
    options: ["Mountains", "Plains", "Forests"],
    correctAnswerIndex: "1",
  },
  {
    question:
      "Resources which are found in a region, but have not been utilised",
    options: ["Renewable", "Potential", "Developed"],
    correctAnswerIndex: "1",
  },
  {
    question:
      "Which one of the following statements is true about the term resources?",
    options: [
      "They are the functions of human activities.",
      "Things which cannot be used to fulfill our needs.",
      "All those things which are found in nature.",
    ],
    correctAnswerIndex: "0",
  },
  {
    question: "The red soil is red in colour because",
    options: [
      "it is rich in humus.",
      "it is rich in iron compounds.",
      "it is derived from volcanic origin.",
    ],
    correctAnswerIndex: "1",
  },
  {
    question: "Which one of the following type of resource is iron ore?",
    options: ["Renewable", "Biotic", "Non-renewable"],
    correctAnswerIndex: "2",
  },
  {
    question:
      "What percentage of our land should be under forest according to the National Forest Policy (1952)?",
    options: ["33", "25.5", "40"],
    correctAnswerIndex: "0",
  },
  {
    question: "India’s territorial water extends upto a distance of:",
    options: ["12 km", "12 nautical miles", "200 nautical miles"],
    correctAnswerIndex: "1",
  },
  {
    question: "Which of the following is not important for soil formation?",
    options: ["Relief", "Parent rock", "Duration of the day"],
    correctAnswerIndex: "2",
  },
  {
    question: " Which of the following is not a measure for soil conservation?",
    options: ["Strip cropping", "Terrace", "Overdrawing of ground water"],
    correctAnswerIndex: "2",
  },
  {
    question: " Which of the following is not a measure for soil conservation?",
    options: ["Strip cropping", "Terrace", "Overdrawing of ground water"],
    correctAnswerIndex: "2",
  },
];


// const questionsAndAnswersBank = [
//   {
//     question: "How would one say goodbye in Spanish?",
//     options: ["O digba", "Adios", "Au Revoir"],
//     correctAnswerIndex: "1",
//   },
//   {
//     question: "What is the largest organ of the human body?",
//     options: ["Heart", "Skin", "Liver"],
//     correctAnswerIndex: "1",
//   },
//   {
//     question:
//       "Virgin Trains, Virgin Atlantic and Virgin Racing, are all companies owned by which famous entrepreneur?",
//     options: ["Richard Branson", "Alan Sugar", "Bill Gates"],
//     correctAnswerIndex: "0",
//   },
//   {
//     question: "What do the letters of the fast food chain KFC stand for?",
//     options: [
//       "Kentucky Food Court",
//       "Kentucky Fries Court",
//       "Kentucky Fried Chicken",
//     ],
//     correctAnswerIndex: "2",
//   },
//   {
//     question: "What geometric shape is generally used for stop signs?",
//     options: ["Circle", "Octagon", "Hexagon"],
//     correctAnswerIndex: "1",
//   },
// ];
const answeredQuestions = [];

const ScoreManager = function () {
  this.score = 0;
};

ScoreManager.prototype.increaseScoreBy = function (increment) {
  this.score += increment;
  return this;
};

ScoreManager.prototype.updateScoreUi = function (element) {
  element.innerHTML = `${this.score} question${
    this.score === 0 || this.score > 1 ? "s" : ""
  } answered correctly`;
  return this;
};

const scoreManager = new ScoreManager();

const generateQAMarkup = (questionIndex) => {
  const question = questionsAndAnswersBank[questionIndex].question;
  const optionsMarkup = questionsAndAnswersBank[questionIndex].options.reduce(
    (accum, option, optionIndex) => {
      accum += `
      <label data-option="opt-${optionIndex}">
        <input type="radio" name="q${
          questionIndex + 1
        }" value="${optionIndex}" onclick="markAnswer(event, ${questionIndex})">
          ${option}
      </label>`;
      return accum;
    },
    ""
  );
  const markup = `
    <h2 class="question-count">Question ${questionIndex + 1}</h2>
    <h3>${question}</h3>
    <div class="answers">
      ${optionsMarkup}
    </div>
    <button type="button" onclick="displayNext(${questionIndex + 1})">
      ${
        questionIndex === questionsAndAnswersBank.length - 1 ? "Finish" : "Next"
      }
    </button>
  `;
  return markup;
};

const markAnswer = (event, questionIndex) => {
  if (answeredQuestions.includes(questionIndex)) {
    event.preventDefault();
    return;
  }
  const selectedOpt = event.target.value;
  const correctOpt = questionsAndAnswersBank[questionIndex].correctAnswerIndex;

  if (selectedOpt === correctOpt) {
    scoreManager.increaseScoreBy(1).updateScoreUi(scoreUi);
    answeredQuestions.push(questionIndex);
    document
      .querySelector(`[data-option=opt-${selectedOpt}]`)
      .classList.add("correct-option");
    return;
  }
  scoreManager.increaseScoreBy(0).updateScoreUi(scoreUi);
  answeredQuestions.push(questionIndex);
  document
    .querySelector(`[data-option=opt-${selectedOpt}]`)
    .classList.add("wrong-option");
  document
    .querySelector(`[data-option=opt-${correctOpt}]`)
    .classList.add("correct-option");
};

const displayNext = (index = 0) => {
    quizForm.classList.remove("opacity");
  if (index < questionsAndAnswersBank.length) {
    quizForm.innerHTML = generateQAMarkup(index);
    quizForm.classList.toggle('opacity')
  } else {
    endGame();
  }
};

const endGame = () => {
  document.querySelector("main").removeChild(quizForm);
  document.querySelector("main").innerHTML = `
  <h2>End of quiz</h2>
  <h3>Total score obtained: ${scoreManager.score}</h3>
  `;
};

function initQuiz() {
  document.querySelector("[data-score]").innerHTML = `0 questions answered`;
  displayNext();
}

initQuiz();

// TODO: Add code intellisense

/*
Task
Build a responsive quiz game. Your quiz game should function according to these specifications:

It must have 5 questions of any topic of your choice
Each question must have a minimum of 3 options- 1 correct option and 2 or more wrong options.
A user can click an option to answer a question. If the correct option is clicked, the option is given a green background with a white text. If it's wrong, then it is given a red background with white text while the correct option is given a green background and white text.
It has a visible score counter that records how many questions have been correctly answered.
It has a next button that can be clicked to display the next question.
The game ends after the 5th question and shows the total attained score.
*/
