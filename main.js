async function getRandomQuestion(){
    const rawResponse = await fetch("https://jservice.io/api/random")
    const parsedBody = await rawResponse.json()
    const questionObject = parsedBody[0]
    const newElement = document.createElement('div')
    newElement.innerHTML = questionObject.question
    document.body.appendChild(newElement)
    return questionObject
}

async function getTheAnswer(){
    const questionObject = getRandomQuestion()
    const newElement = document.createElement('div')
    newElement.innerHTML = questionObject.answer
    document.body.appendChild(newElement)
}

function newQuestionButton() {
    const qButton = document.createElement('button')
    document.body.appendChild(qButton)
    qButton.innerHTML = "New Question"
    qButton.addEventListener("click", getRandomQuestion)
}
newQuestionButton()

function revealAnswerButton() {
    const aButton = document.createElement('button')
    document.body.appendChild(aButton)
    aButton.innerHTML = "Reveal Answer"
    aButton.addEventListener("click", getTheAnswer )
}
revealAnswerButton()