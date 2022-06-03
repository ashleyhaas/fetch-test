let currentQuestionObject = {};
let player1PointValue = 0;
let player2PointValue = 0;
let currentPlayer = 1;
let categoryQuestions = {};
let categoryIds = [21, 105, 253]
let currentQuestionNumber = 0
let currentBoxElement

function createGrid() {
  for (let i = 0; i < 6; i++) {
    let currentBox = putElementOnPage('div', '', 'box' + i)
    currentBox.style.width = '150px'
    currentBox.style.height = '150px'
    currentBox.style.border = '1px solid black'
    let currentQuestion = categoryQuestions[21][i]
    currentBox.innerHTML = currentQuestion.value
    if (i !== 0) {
      currentBox.addEventListener('click', () => {
        currentQuestionObject = currentQuestion
        currentBoxElement = currentBox
        currentBox.innerHTML = currentQuestion.value + " " + currentQuestion.question
        document.querySelector('#submitButton').disabled = false
      })
    }
  }
  document.querySelector('#box0').innerHTML = "Animals"
}
// async function getRandomQuestion() {
//   const rawResponse = await fetch("https://jservice.io/api/random");
//   const parsedBody = await rawResponse.json();
//   const questionObject = parsedBody[0];
//   return questionObject;
// }

// async function newQuestionButtonHandler() {
//   currentQuestionObject = currentCategoryQuestions[currentQuestionNumber];
//   currentQuestionNumber++
//   const questionDiv = document.querySelector("#question");
//   const pointDiv = document.querySelector('#currentQuestionPoints')
//   const subButton = document.querySelector('#submitButton')
//   subButton.disabled = false
//   const questionContainer = document.querySelector('#questionContainer')
//   if (questionDiv) {
//     questionDiv.innerHTML = currentQuestionObject.question
//   } else {
//     putElementOnPage("div", currentQuestionObject.question, "question", questionContainer);
//   }

//   if (pointDiv) {
//     pointDiv.innerHTML = "Current Question Point Value: " + currentQuestionObject.value
//   } else {
//     putElementOnPage("div", "Current Question Point Value: " + currentQuestionObject.value, "currentQuestionPoints", questionContainer)
//   }
// }

function submitHandler() {
  const textValue = document.querySelector("#answerInput").value;
  let answerStatusDiv = document.querySelector("#answerStatus")
  const subButton = document.querySelector('#submitButton')
  subButton.disabled = true

  if (
    textValue.toLowerCase() === currentQuestionObject.answer.toLowerCase()
  ) {
    if (currentPlayer === 1) {
      player1PointValue += currentQuestionObject.value
    } else {
      player2PointValue += currentQuestionObject.value
    }
    answerStatusDiv.innerHTML = "correct!"
  } else {
    if (currentPlayer === 1) {
      player1PointValue -= currentQuestionObject.value
    } else {
      player2PointValue -= currentQuestionObject.value
    }
    answerStatusDiv.innerHTML = "Incorrect!" + " The correct answer was: " + currentQuestionObject.answer
  }

  currentBoxElement.innerHTML = ""
  currentBoxElement.removeEventListener('click')

  setTimeout(() => {
    answerStatusDiv.innerHTML = ""
  }, 3000)

  let currentScoreDiv = document.querySelector("#currentScore" + currentPlayer)
  if (currentPlayer === 1) {
    currentScoreDiv.innerHTML = "Player 1 Current Score: " + player1PointValue
    currentPlayer = 2
  } else {
    currentScoreDiv.innerHTML = "Player 2 Current Score: " + player2PointValue
    currentPlayer = 1
  }
  if (player1PointValue >= 1500) {
    alert('Player 1 Wins!')
  } else if (player2PointValue >= 1500) {
    alert('Player 2 Wins!')
  }
  document.querySelector('#currentPlayer').innerHTML = "Current Player: " + currentPlayer
}

// function categoryButtonHandler(categoryInput) {
//   document.querySelector('#qButton').disabled = false
//   categoryId = categoryInput
//   getCategory()
// }  

function getCategoryTitle(id) {
  let categoryTitledById = { 21: "Animals", 105: "Three Letter Words", 253: "Food and Drinks" }
  if (categoryTitledById[id]) {
    return categoryTitledById[id]
  } else {
    return "No Category Selected"
  }
}

async function initialPageSetup() {
  putElementOnPage('div', 'Current Player:' + currentPlayer, 'currentPlayer')
  // putElementOnPage('div', 'Current Category:' + getCategoryTitle(categoryId), 'currentCat')
  // putElementOnPage('div', 'Choose Your Category', 'chooseCategory')
  // let catHolderDiv = putElementOnPage('div', '', 'categoryHolder')
  // const animalButton = putElementOnPage('button', 'Animals', 'aniButton', catHolderDiv)
  // animalButton.addEventListener("click", () => { categoryButtonHandler(21) })

  // const threeLetterButton = putElementOnPage('button', 'Three Letter Words', '3LetterButton', catHolderDiv)
  // threeLetterButton.addEventListener("click", () => { categoryButtonHandler(105) })

  // const fAndDButton = putElementOnPage('button', 'Food and Drinks', 'fAndDButton', catHolderDiv)
  // fAndDButton.addEventListener("click", () => { categoryButtonHandler(253) })

  // const qButton = putElementOnPage("button", "New Question", "qButton");
  // qButton.addEventListener("click", newQuestionButtonHandler);
  // qButton.disabled = true

  putElementOnPage("input", "", "answerInput");
  const submitButton = putElementOnPage("button", "submit", "submitButton");
  submitButton.disabled = true
  submitButton.addEventListener("click", submitHandler);

  // putElementOnPage('div', "", "questionContainer")
  let scoreElement1 = putElementOnPage("div", "Player 1 Current Score: " + player1PointValue, "currentScore1")
  scoreElement1.style.border = "1px solid black"
  scoreElement1.style.width = "200px"

  let scoreElement2 = putElementOnPage("div", "Player 2 Current Score: " + player2PointValue, "currentScore2")
  scoreElement2.style.border = "1px solid black"
  scoreElement2.style.width = "200px"
  putElementOnPage("div", "", "answerStatus")

  for (let i = 0; i < categoryIds.length; i++) {
    await getCategory(categoryIds[i])
  }
  createGrid()
}
initialPageSetup()


async function getCategory(categoryId) {
  const rawResponse = await fetch("https://jservice.io/api/clues?category=" + categoryId);
  const parsedBody = await rawResponse.json();
  categoryQuestions[categoryId] = (parsedBody.filter((questionObject) =>
    questionObject.value !== null))
}

// Utility functions
function putElementOnPage(elementType, inputString, id, parentElement) {
  const newElement = document.createElement(elementType);
  newElement.id = id;
  newElement.innerHTML = inputString;
  if (parentElement) {
    parentElement.appendChild(newElement)
  } else {
    document.body.appendChild(newElement)
  }
  return newElement;
}

//add visuals & let them select a point value to see the questions
//put the question on the page after clicking a value
//edit submit handler to connect the question selected with the answer