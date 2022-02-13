/*-------------------------------- Constants --------------------------------*/

winningCombos = [
  [0, 1, 2, 3], [3, 4, 5, 6], [7, 8, 9, 10], [10, 11, 12, 13], [14, 15, 16, 17], 
  [17, 18, 19, 20], [21, 22, 23, 24], [24, 25, 26, 27], [28, 29, 30, 31], [31, 32, 33, 34], [35, 36, 37, 38], [38, 39, 40, 41], [0, 7, 14, 21], [1, 8, 15, 22], [2, 9, 16, 23], 
  [3, 10, 17, 24], [4, 11, 18, 25], [5, 12, 19, 26], [6, 13, 20, 27], [14, 21, 28, 35], 
  [15, 22, 29, 36], [16, 23, 30, 37], [17, 24, 31, 38], [18, 25, 32, 39], [19, 26, 33, 40], [20, 27, 34, 41], [14, 22, 30, 38], [15, 23, 31, 39], [16, 24, 32, 40], [17, 25, 33, 41], [17, 23, 29, 35], [18, 24, 30, 36], [19, 25, 31, 37], [20, 26, 32, 38], [10, 16, 22, 28], [11, 17, 23, 29], [12, 18, 24, 30], [13, 19, 25, 31], [7, 15, 23, 31], [8, 16, 24, 32], 
  [9, 17, 25, 33], [10, 18, 26, 34], [0, 8, 16, 24], [1, 9, 17, 25], [2, 10, 18, 26], 
  [3, 11, 19, 27], [3, 9, 15, 21], [4, 10, 16, 22], [5, 11, 17, 23], [6, 12, 18, 24], 
  [36, 37, 38, 39], [37, 38, 39, 40], [29, 30, 31, 32], [30, 31, 32, 33], [22, 23, 24, 25], [23, 24, 25, 26], [15, 16, 17, 18], [16, 17, 18, 19], [8, 9, 10, 11], [9, 10, 11, 12], 
  [1, 2, 3, 4], [2, 3, 4, 5], [7, 14, 21, 28], [8, 15, 22, 29], [9, 16, 23, 30], 
  [10, 17, 24, 31], [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34]
]
// console.log(winningCombos.length)


/*-------------------------------- Variables --------------------------------*/

let board, turn, winner, numOfTurns


/*------------------------ Cached Element References ------------------------*/

const boardArr = document.querySelectorAll(".circle")
// console.log(boardArr)
const message = document.querySelector(".message")
// console.log(message)
const resetBtn = document.getElementById("reset")
// console.log(resetBtn)
const playBtn = document.getElementById("play")
// console.log(playBtn)
const themeBtn = document.getElementById("theme")
// console.log(themeBtn)
const soundBtn = document.getElementById("sound")


/*----------------------------- Event Listeners -----------------------------*/

boardArr.forEach(circle => circle.addEventListener('click', clickBoard))

resetBtn.addEventListener('click', resetClick)

playBtn.addEventListener('click', playClick)

themeBtn.addEventListener('click', themeClick)

soundBtn.addEventListener('click', soundClick)

/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  board = 
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
    // console.log(board.length);
  turn = 1
  winner = null
  numOfTurns = 0
  message.textContent = 'Press the Play button to get started!'
  render()
}

function render() {
  board.forEach((circle, idx) => {
    if (circle ===1){
      boardArr[idx].textContent = 'RED'
      boardArr[idx].style.backgroundColor = 'red'
    }
    else if (circle === -1) {
      boardArr[idx].textContent = 'YELLOW'
      boardArr[idx].style.backgroundColor = 'yellow'
    }
    else {
      boardArr[idx].textContent = ''
      boardArr[idx].style.backgroundColor = 'white'
    }
  })
  // console.log('this is render')
}

function clickBoard(evt) {
  let idxCircle = parseInt(evt.target.id.slice(3))
  // console.log(idxCircle, 'this is idx of circle')

  if (winner) {
    return
  }
  
  turn *= -1
  // console.log(turn, 'this is player turn');

  checkTurn()

  numOfTurns += 1
  // console.log(numOfTurns, 'this is num of turns');

  board[idxCircle] = turn
  // console.log(board[idxCircle], 'this is board idx Circle');
  // console.log(evt.target.id)

  getWinner()
}

function resetClick(evt) {
  console.log(evt.target.id)
}

function playClick(evt) {
  console.log(evt.target.id)
}

function themeClick(evt) {
  console.log(evt.target.id)
}

function soundClick(evt) {
  console.log(evt.target.id)
}

function checkTurn () {
  if (turn === 1) { 
    message.textContent = "Player 2 is up!"
  } 
  else if (turn === -1) {
    message.textContent = "Player 1 is up!"
  } 
}

function getWinner() {
  for (let i = 0; i < winningCombos.length; i++){
    const a = winningCombos[i][0]
    const b = winningCombos[i][1]
    const c = winningCombos[i][2]
    const d = winningCombos[i][3]
  
    if(board[a] +board[b] + board[c] + board[d]=== 4){
      message.textContent = "Player 1 wins!!!"
      winner = 'X'
      confetti.start(3000)
      // endGame()
    }
    else if (board[a] +board[b] + board[c] + board[d]=== -4){
      message.textContent = "Player 2 wins!!!"
      winner = 'O'
      confetti.start(3000)
    }
  } 

  if (numOfTurns === 42 && winner === null){
    message.textContent = "How do you tie in connect 4!?!?"
    winner = 'T'
  }
}