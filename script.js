const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const resultElement = document.getElementById('result')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  resultElement.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  if (shuffledQuestions.length > currentQuestionIndex) {
    showQuestion(shuffledQuestions[currentQuestionIndex])
  } else {
    endGame()
  }
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn', 'btn-lg')
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
  } else {
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

function endGame() {
  questionContainerElement.classList.add('hide')
  resultElement.classList.remove('hide')
  resultElement.innerHTML = `<h2 class="display-4">Quiz Completed!</h2><p>Great job, you have completed all the questions.</p>`
}

const questions = [
  {
    question: 'What is the capital of France?',
    answers: [
      { text: 'Paris', correct: true },
      { text: 'London', correct: false },
      { text: 'Rome', correct: false },
      { text: 'Berlin', correct: false }
    ]
  },
  {
    question: 'Which planet is known as the Red Planet?',
    answers: [
      { text: 'Mars', correct: true },
      { text: 'Earth', correct: false },
      { text: 'Jupiter', correct: false },
      { text: 'Saturn', correct: false }
    ]
  },
  {
    question: 'Who wrote "To Kill a Mockingbird"?',
    answers: [
      { text: 'Harper Lee', correct: true },
      { text: 'J.K. Rowling', correct: false },
      { text: 'Jane Austen', correct: false },
      { text: 'Mark Twain', correct: false }
    ]
  },
  {
    question: 'What is the largest ocean on Earth?',
    answers: [
      { text: 'Pacific Ocean', correct: true },
      { text: 'Atlantic Ocean', correct: false },
      { text: 'Indian Ocean', correct: false },
      { text: 'Arctic Ocean', correct: false }
    ]
  },
  {
    question: 'Who painted the Mona Lisa?',
    answers: [
      { text: 'Leonardo da Vinci', correct: true },
      { text: 'Vincent van Gogh', correct: false },
      { text: 'Pablo Picasso', correct: false },
      { text: 'Claude Monet', correct: false }
    ]
  },
  {
    question: 'What is the smallest prime number?',
    answers: [
      { text: '2', correct: true },
      { text: '1', correct: false },
      { text: '3', correct: false },
      { text: '5', correct: false }
    ]
  },
  {
    question: 'Which element has the chemical symbol "O"?',
    answers: [
      { text: 'Oxygen', correct: true },
      { text: 'Gold', correct: false },
      { text: 'Silver', correct: false },
      { text: 'Hydrogen', correct: false }
    ]
  },
  {
    question: 'In which year did the Titanic sink?',
    answers: [
      { text: '1912', correct: true },
      { text: '1905', correct: false },
      { text: '1918', correct: false },
      { text: '1921', correct: false }
    ]
  }
]
