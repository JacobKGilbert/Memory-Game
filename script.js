const gameContainer = document.getElementById("game");
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];
let clickCount = 0
let numOfClicks = 0
let matches = 0

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

//Click Functions
function limitClicks(event) {
  let color = event.target.className
  //Check to see if same div is clicked.
  if (event.target.id === '1') {
    event.target.removeAttribute('id')
    event.target.removeAttribute('style')
    clickCount = 0
  } else if (clickCount < 2) {
    event.target.style.backgroundColor = color
    clickCount++
	  
    event.target.setAttribute('id', clickCount)
  } 
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target)
  numOfClicks++
  //Displays the current score
  document.querySelector('span').innerText = numOfClicks
  
  limitClicks(event)

  let choiceOne = document.getElementById('1')
  let choiceTwo = document.getElementById('2')

  if (choiceOne.className !== choiceTwo.className) {
    setTimeout(() => {
      choiceOne.removeAttribute('style')
      choiceOne.removeAttribute('id')
      choiceTwo.removeAttribute('style')
      choiceTwo.removeAttribute('id')
      clickCount = 0
    }, 1000);
  } else if (choiceOne.className === choiceTwo.className) {
      choiceOne.removeAttribute('id')
      choiceTwo.removeAttribute('id')
      clickCount = 0
      matches++
      if (matches === 5) {
        setTimeout(() => {
          alert('Congratulations! You won!')
          location.reload()
        }, 1000); 
      }
  }
}

//Starts a new game
document.getElementById('newGame').addEventListener('click', () => {
  location.reload()
})

//When the DOM loads
createDivsForColors(shuffledColors);