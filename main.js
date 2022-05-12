let currentQuestionObject = {};

async function getRandomQuestion() {
  const rawResponse = await fetch("https://jservice.io/api/random");
  const parsedBody = await rawResponse.json();
  const questionObject = parsedBody[0];
  return questionObject;
}

async function newQuestionButtonHandler() {
  currentQuestionObject = await getRandomQuestion();
  const questionDiv = document.querySelector("#question");
  const answerDiv = document.querySelector("#answer");
  if (questionDiv) {
    questionDiv.remove();
  }
  if (answerDiv) {
    answerDiv.remove();
  }
  putElementOnPage("div", currentQuestionObject.question, "question");
}

function answerButtonHandler() {
  const answerDiv = document.querySelector("#answer");
  if (!answerDiv) {
    putElementOnPage("div", currentQuestionObject.answer, "answer");
  }
}

function initialPageSetup() {
  const qButton = putElementOnPage("button", "New Question", "qButton");
  qButton.addEventListener("click", newQuestionButtonHandler);

  const aButton = putElementOnPage("button", "Reveal Answer", "aButton");
  aButton.addEventListener("click", answerButtonHandler);

  putElementOnPage("input", "", "answerInput");
  const submitButton = putElementOnPage("button", "submit", "submitButton");
  submitButton.addEventListener("click", () => {
    const textValue = document.querySelector("#answerInput").value;
    if (
      textValue.toLowerCase() === currentQuestionObject.answer.toLowerCase()
    ) {
      alert("correct");
    } else {
      alert("incorrect");
    }
  });
}

initialPageSetup();

// Utility functions
function putElementOnPage(elementType, inputString, id) {
  const newElement = document.createElement(elementType);
  newElement.id = id;
  newElement.innerHTML = inputString;
  document.body.appendChild(newElement);
  return newElement;
}
