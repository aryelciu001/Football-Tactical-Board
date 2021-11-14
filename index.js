const MAXPLAYERWIDTH = 40
const PITCHRATIO = 105/68
const MAXPITCHWIDTH = 500

/**
 * @param {*} pitchWidth 
 * @param {*} number 
 * @param {*} side 
 * @param {*} playerWidth 
 * @returns [yCoordinate, xCoordinate]
 */
function getPlayerCoordinate(pitchWidth, number, side, playerWidth) {
  const pitchHeight = PITCHRATIO * pitchWidth
  const vertical = (pitchHeight / 8)
  const horizontalLevel = pitchWidth / 5

  switch(number) {
    case 1:
      return [vertical * 0 + playerWidth, pitchWidth/2 - playerWidth/2]
    case 2:
      return [vertical * 1, horizontalLevel * 1  - playerWidth/2]
    case 3:
      return [vertical * 1, horizontalLevel * 4 - playerWidth/2]
    case 4:
      return [vertical * 1, horizontalLevel * 2  - playerWidth/2]
    case 5:
      return [vertical * 1, horizontalLevel * 3  - playerWidth/2]
    case 6:
      return [vertical * 2, horizontalLevel * 2  - playerWidth/2]
    case 8:
      return [vertical * 2, horizontalLevel * 3  - playerWidth/2]
    case 7:
      return [vertical * 2, horizontalLevel * 1  - playerWidth/2]
    case 11:
      return [vertical * 2, horizontalLevel * 4  - playerWidth/2]
    case 10:
      return [vertical * 3, horizontalLevel * 2  - playerWidth/2]
    case 9:
      return [vertical * 3, horizontalLevel * 3  - playerWidth/2]
    default:
      return [50, 50]
  }
}

/**
 * @description calculate pitch height and set to element
 */
function calcPitchHeight () {
  const pitch = document.getElementsByClassName('pitch')[0]
  const pitchWidth = pitch.offsetWidth
  pitch.style.height = `${pitchWidth * PITCHRATIO}px`
}

/**
 * @description create players and put on the pitch
 */
function insertPlayers () {
  const pitch = document.getElementsByClassName('pitch')[0]
  if (pitch.children.length) {
    pitch.innerHTML = ''
  }
  const pitchWidth = pitch.offsetWidth
  let playerWidth = MAXPLAYERWIDTH/MAXPITCHWIDTH * pitchWidth
  for (let i = 1; i<12; i++) {
    let node = document.createElement("DIV")
    node.addEventListener('mousedown', (e) => {
      dragMouseDownTop(e)
    })
    node.addEventListener('touchstart', (e) => {
      touchTop(e)
    })
    node.classList.add(`player`)
    node.classList.add(`topplayer`)
    node.classList.add(`topplayer${i}`)
    node.style.width = `${playerWidth}px`
    node.style.height = `${playerWidth}px`
    let coordinate = getPlayerCoordinate(pitchWidth, i, 'top', playerWidth)
    node.style.top = `${coordinate[0]}px`
    node.style.left = `${coordinate[1]}px`
    pitch.appendChild(node)
  }
  for (let i = 1; i<12; i++) {
    let node = document.createElement("DIV")
    node.addEventListener('mousedown', (e) => {
      dragMouseDownBottom(e)
    })
    node.addEventListener('touchstart', (e) => {
      touchBottom(e)
    })
    node.classList.add(`player`)
    node.classList.add(`bottomplayer`)
    node.classList.add(`bottomplayer${i}`)
    node.style.width = `${playerWidth}px`
    node.style.height = `${playerWidth}px`
    let coordinate = getPlayerCoordinate(pitchWidth, i, 'bottom', playerWidth)
    node.style.bottom = `${coordinate[0]}px`
    node.style.left = `${coordinate[1]}px`
    pitch.appendChild(node)
  }
}

function dragMouseDownTop(e) {
  let node = e.target
  e.preventDefault()
  nodeRect = node.getBoundingClientRect();
  let initialXPosition = nodeRect.left + (nodeRect.right - nodeRect.left) / 2
  let initialYPosition = nodeRect.top + (nodeRect.bottom - nodeRect.top) / 2
  let initialLeft = Number(node.style.left.replace(/px/g, ''))
  let initialTop = Number(node.style.top.replace(/px/g, ''))
  document.onmousemove = (e) => {
    e.preventDefault
    let xDisp = e.clientX - initialXPosition
    let yDisp = e.clientY - initialYPosition
    node.style.left = `${initialLeft + xDisp}px`
    node.style.top = `${initialTop + yDisp}px`
  }
  document.onmouseup = releaseMouse
}

function dragMouseDownBottom(e) {
  let node = e.target
  e.preventDefault()
  nodeRect = node.getBoundingClientRect();
  let initialXPosition = nodeRect.left + (nodeRect.right - nodeRect.left) / 2
  let initialYPosition = nodeRect.top + (nodeRect.bottom - nodeRect.top) / 2
  let initialLeft = Number(node.style.left.replace(/px/g, ''))
  let initialBottom = Number(node.style.bottom.replace(/px/g, ''))
  document.onmousemove = (e) => {
    e.preventDefault
    let xDisp = e.clientX - initialXPosition
    let yDisp = e.clientY - initialYPosition
    node.style.left = `${initialLeft + xDisp}px`
    node.style.bottom = `${initialBottom - yDisp}px`
  }
  document.onmouseup = releaseMouse
}

function releaseMouse() {
  document.onmousemove = null
}

function touchTop(e) {
  let node = e.target
  e.preventDefault()
  nodeRect = node.getBoundingClientRect();
  let initialXPosition = nodeRect.left + (nodeRect.right - nodeRect.left) / 2
  let initialYPosition = nodeRect.top + (nodeRect.bottom - nodeRect.top) / 2
  let initialLeft = Number(node.style.left.replace(/px/g, ''))
  let initialTop = Number(node.style.top.replace(/px/g, ''))
  document.ontouchmove = (e) => {
    e.preventDefault
    let xDisp = e.touches[0].clientX - initialXPosition
    let yDisp = e.touches[0].clientY - initialYPosition
    node.style.left = `${initialLeft + xDisp}px`
    node.style.top = `${initialTop + yDisp}px`
  }
  document.ontouchend = releaseTouch
}

function touchBottom(e) {
  let node = e.target
  e.preventDefault()
  nodeRect = node.getBoundingClientRect();
  let initialXPosition = nodeRect.left + (nodeRect.right - nodeRect.left) / 2
  let initialYPosition = nodeRect.top + (nodeRect.bottom - nodeRect.top) / 2
  let initialLeft = Number(node.style.left.replace(/px/g, ''))
  let initialBottom = Number(node.style.bottom.replace(/px/g, ''))
  document.ontouchmove = (e) => {
    e.preventDefault
    let xDisp = e.touches[0].clientX - initialXPosition
    let yDisp = e.touches[0].clientY - initialYPosition
    node.style.left = `${initialLeft + xDisp}px`
    node.style.bottom = `${initialBottom - yDisp}px`
  }
  document.ontouchend = releaseTouch
}

function releaseTouch() {
  document.ontouchmove = null
}

window.onload = () => {
  calcPitchHeight()
  insertPlayers()
}

window.onresize = () => {
  calcPitchHeight()
  insertPlayers()
}