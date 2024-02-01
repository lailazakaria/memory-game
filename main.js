// Select The Start Game Button
document.querySelector(".control-buttons span").onclick = function () {
  startp()
 // Remove Splash Screen
  document.querySelector(".control-buttons").remove();
};
// Effect Duration
let duration = 1000;
// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");
// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);
// Create Range Of Keys
let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);
blocksContainer.classList.add("no-clicking");
// Add Order Css Property To Game Blocks
function startp(){
blocks.forEach((block, index) => {
  // Add CSS Order Property
  block.style.order = orderRange[index];
  block.children[0].style.cssText = "transform:rotateY(360deg);";
  block.children[1].style.cssText = "transform:rotateY(360deg);";
  setTimeout(() => {
    block.children[0].style.cssText = "transform:rotateY(-360deg);";
    block.children[1].style.cssText = "transform:rotateY(-180deg);";
    blocksContainer.classList.remove("no-clicking");
  }, 5000);
  // Add Click Event
  block.addEventListener("click", function () {
    // Trigger The Flip Block Function
    flipBlock(block);
  });
});
}

// Flip Block Function
function flipBlock(selectedBlock) {
  // Add Class is-flipped
  selectedBlock.classList.add("is-flipped");
  // Collect All Flipped Cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  // If Theres Two Selected Blocks
  if (allFlippedBlocks.length === 2) {
    // Stop Clicking Function
    stopClicking();
    // Check Matched Block Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
   if (diditWon() === true) {
     let congrat = document.querySelector(".Congrat");
     congrat.style.display = "block";
     document.querySelector(".Congrat .butt .yes").onclick = function () {
       location.reload();
     };
     document.querySelector(".Congrat .butt .no").onclick = function () {
       window.close();
     };
   }
}

// Stop Clicking Function
function stopClicking() {
  // Add Class No Clicking on Main Container
  blocksContainer.classList.add("no-clicking");
  // Wait Duration
  setTimeout(() => {
    // Remove Class No Clicking After The Duration
    blocksContainer.classList.remove("no-clicking");
  }, duration);
  
}

// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");

    document.getElementById("success").play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
   if (triesElement.innerHTML >= 8) {
     let gameOver = document.querySelector(".game-over");
     gameOver.style.display = "block";
     document.querySelector(".game-over .butt .yes").onclick = function () {
       location.reload();
     };
     document.querySelector(".game-over .butt .no").onclick = function () {
       window.close();
     };
   }
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);

    document.getElementById("fail").play();
  }
}

// Shuffle Function
function shuffle(array) {
  // Settings Vars
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    // Get Random Number
    random = Math.floor(Math.random() * current);

    // Decrease Length By One
    current--;

    // [1] Save Current Element in Stash
    temp = array[current];

    // [2] Current Element = Random Element
    array[current] = array[random];

    // [3] Random Element = Get Element From Stash
    array[random] = temp;
  }
  return array;
}
function diditWon() {
  didHeWon = true;
  blocks.forEach((block) => {
    if (!block.classList.contains("has-match")) {
      didHeWon = false;
    }
  });
  return didHeWon;
}



