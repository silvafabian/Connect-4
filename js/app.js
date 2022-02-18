/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
  [7, 8, 9, 10], [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13], 
  [14, 15, 16, 17], [15, 16, 17, 18], [16, 17, 18, 19], [17, 18, 19, 20],
  [21, 22, 23, 24], [22, 23, 24, 25], [23, 24, 25, 26], [24, 25, 26, 27], 
  [28, 29, 30, 31], [29, 30, 31, 32], [30, 31, 32, 33], [31, 32, 33, 34],
  [35, 36, 37, 38], [36, 37, 38, 39], [37, 38, 39, 40], [38, 39, 40, 41],
  [42, 43, 44, 45], [43, 44, 45, 46], [44, 45, 46, 47], [45, 46, 47, 48],
  [7, 14, 21, 28], [14, 21, 28, 35], [21, 28, 35, 42], 
  [8, 15, 22, 29], [15, 22, 29, 36], [22, 29, 36, 43],
  [9, 16, 23, 30], [16, 23, 30, 37], [23, 30, 37, 44],
  [10, 17, 24, 31], [17, 24, 31, 38], [24, 31, 38, 45],
  [11, 18, 25, 32], [18, 25, 32, 39], [25, 32, 39, 46],
  [12, 19, 26, 33], [19, 26, 33, 40], [26, 33, 40, 47],
  [13, 20, 27, 34], [20, 27, 34, 41], [27, 34, 41, 48],
  [28, 22, 16, 10], [35, 29, 23, 17], [29, 23, 17, 11],
  [42, 36, 30, 24], [36, 30, 24, 18], [30, 24, 18, 12],
  [43, 37, 31, 25], [37, 31, 25, 19], [31, 25, 19, 13],
  [44, 38, 32, 26], [38, 32, 26, 20], [45, 39, 33, 27],
  [21, 29, 37, 45], [14, 22, 30, 38], [22, 38, 30, 46],
  [7, 15, 23, 31], [15, 23, 31, 39], [23, 31, 39, 47],
  [8, 16, 24, 32], [16, 24, 32, 40], [48, 40, 32, 24],
  [9, 17, 25, 33], [17, 25, 33, 41], [10, 18, 26, 34],
  [14, 22, 30, 38], [22, 30, 38, 46], [21, 29, 37, 45]
]

/*-------------------------------- Variables --------------------------------*/

let board, turn, winner, numOfTurns

/*------------------------ Cached Element References ------------------------*/

const boardArr = document.querySelectorAll(".circle")

const message = document.querySelector(".message")

const resetBtn = document.getElementById("reset")

const playBtn = document.getElementById("play")

const soundBtn = document.getElementById("sound")

const chipSound = new Audio('../audio/chip-sound.wav')

const emptyBoardSound = new Audio('../audio/empty-board.wav')

const darkBtn = document.getElementById('light-dark-mode')

const bodyColor = document.querySelector("body")

const boardColor = document.querySelector(".board")

const circleColor = document.querySelectorAll(".circle")

/*----------------------------- Event Listeners -----------------------------*/

boardArr.forEach(circle => circle.addEventListener('click', clickBoard))

resetBtn.addEventListener('click', reset)

playBtn.addEventListener('click', play)

soundBtn.addEventListener('click', toggleSound)

darkBtn.addEventListener('click', toggleDarkLight)

/*-------------------------------- Functions--------------------------------*/
message.textContent = 'Press the Play button to get started!'

checkDarkPref()

function play() {
  init() 
  playBtn.hidden = true
  message.textContent = "Player 1 🔴 is up!"
}

function init() {
  board = 
    [
      null, null, null, null, null, null, null, 
      null, null, null, null, null, null, null, 
      null, null, null, null, null, null, null, 
      null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, 
      null, null, null, null, null, null, null,
      null, null, null, null, null, null, null,
    ]

  turn = 1
  winner = null
  numOfTurns = 0
  playing = false
  
  render()
  
}

function render() {
  changeColorOnBoard() 
}

function clickBoard(evt) {
  let idxCircle = parseInt(evt.target.id.slice(3))

  const actualIdx = choiceToBottom(idxCircle)

  if (winner || board[idxCircle] === -1 || board[idxCircle] ===1) {
    return
  }

  if (actualIdx <= 6) {
    return
  }

  turn *= -1

  checkTurn()

  numOfTurns += 1

  board[actualIdx] = turn
  
  resetBtn.removeAttribute('hidden')

  if(soundBtn.classList.contains('on')) {
    playChipSound()
  }

  render()

  getWinner()
}

function changeColorOnBoard() {

  board.forEach((circle, idx) => {
    if (circle === 1){
      boardArr[idx].style.backgroundColor = 'yellow'
    }
    else if (circle === -1) {
      boardArr[idx].style.backgroundColor = 'red'
    }
  })
}

// this function takes the user choice, loops through it, and then places it at the most low part of of the function.
// it adds 42 to the index to reach the bottom row
// as long as 1 is between 0 and 48 inclusive (the number of circles on the board)
// it then subtracts 7 to get to the row right above it, all in the same vertical column
// if the index value of the board is null, it return the value and then colors it according to the turn
function choiceToBottom(idx) {
  for (let i = idx + 42; i <= 48 && i >= 0; i -= 7) {
    if (board[i] === null) {
      return i
    }
  }
}

function checkTurn () {
  if (turn === 1) { 
    message.textContent = "Player 1 🔴 is up!"
  } 
  else if (turn === -1) {
    message.textContent = "Player 2 🟡 is up!"
  } 
}

function getWinner() {
  for (let i = 0; i < winningCombos.length; i++){
    const a = winningCombos[i][0]
    const b = winningCombos[i][1]
    const c = winningCombos[i][2]
    const d = winningCombos[i][3]
  
    if(board[a] +board[b] + board[c] + board[d]=== 4){
      message.textContent = "Player 2 🟡 wins!!!"
      winner = 'R'
      confetti.start(3000)
      return
    }
    else if (board[a] +board[b] + board[c] + board[d]=== -4){
      message.textContent = "Player 1 🔴 wins!!!"
      winner = 'Y'
      confetti.start(3000)
      return
    }
  } 

  if (numOfTurns === 42 && winner === null){
    message.textContent = "How do you tie in connect 4!?!?"
    winner = 'T'
  }
}

function reset() {
  resetBtn.hidden = true
  playBtn.hidden = false
  if(soundBtn.classList.contains('on')) {
    playEmptyBoardSound()
  }
  setTimeout(window.location.reload.bind(window.location), 2000)
}

function toggleSound() {
  soundBtn.classList.toggle("on") 
  if (soundBtn.classList.contains('on')) {
    soundBtn.textContent = 'Sound 🔊'
  }
  else {
    soundBtn.textContent = 'Sound 🔇'
  }
}

function playChipSound(){ 
  chipSound.volume = .8
  chipSound.play()
}

function playEmptyBoardSound(){ 
  emptyBoardSound.volume = .5
  emptyBoardSound.play()
}

function toggleDarkLight() {
  
  if (darkBtn.textContent === 'Dark'){
    bodyColor.style.backgroundImage = 'url(../assets/game-background-dark.jpg)'
    boardColor.style.backgroundImage = 'url(../assets/grey.png)'
    document.querySelector('.title').style.color = 'white'
    
    for (let i = 7; i < circleColor.length; i++) {
      circleColor[i].style.backgroundColor = 'dimGrey'
    }

    darkBtn.textContent = 'Light'
  }
  else if (darkBtn.textContent === 'Light') {
    bodyColor.style.backgroundImage = 'url(../assets/game-background-light.jpg)'
    boardColor.style.backgroundImage = 'url(../assets/blue.png)'
    document.querySelector('.title').style.color = 'black'
    
    for (let i = 7; i < circleColor.length; i++) {
      circleColor[i].style.backgroundColor = 'white'
    }

    darkBtn.textContent = 'Dark'
  }

}

function checkDarkPref() {
  if (
    window.matchMedia("(prefers-color-scheme:dark)").matches &&
    bodyColor.className !== "dark"
  ) {
    toggleDarkLight()
  }
}