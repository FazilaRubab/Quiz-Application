const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else{
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
  
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is the correct HTML element for inserting a line break?',
    answers: [
      { text: '<br>', correct: true },
      { text: '<break>', correct: false },
      { text: '<lb>', correct: false }
    ]
  },
  {
    question: 'Choose the correct HTML element for the largest heading:',
    answers: [
      { text: '<h6>', correct: false },
      { text: ' <h1>', correct: true },
      { text: ' <heading>', correct: false },
      { text: '<head>', correct: false }
    ]
  },
  {
    question: 'What does HTML stand for?',
    answers: [
      { text: 'Hyperlinks and text markup language', correct: false },
      { text: 'Hyper text markup language', correct: true },
      { text: 'Home tool markup language', correct: false },
    ]
  },
  {
    question: 'Choose the correct HTML element to define important text',
    answers: [
      { text: '<important>', correct: false },
      { text: '<b>', correct: false },
      { text: '<strong>', correct: true },
      { text: '<i>', correct: false }
    ]
  },
 {
    question: 'Choose the correct HTML element to define emphasized text',
    answers: [
      { text: '<i>', correct: false },
      { text: '<italics>', correct: false },
      { text: '<em>', correct: true }
    ]
  } 
]
