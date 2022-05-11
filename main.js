async function getRandomQuestion(){
    const rawResponse = await fetch("https://jservice.io/api/random")
    const parsedBody = await rawResponse.json()
    const questionObject = parsedBody[0]
    const newElement = document.createElement('div')
    newElement.innerHTML = questionObject.question
    document.body.appendChild(newElement)
}

getRandomQuestion()