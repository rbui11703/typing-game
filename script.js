// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Array of words
    const words = ["apple", "banana", "cherry", "dog", "elephant", "flower", "grape","hat","ice","jacket","kite","lion","mango","nest","orange","pencil","queen","rabbit","sun","tree","umbrella","vase","water","xylophone","yellow","zebra"];
    // Get required elements
    const gameContainer = document.getElementById("game-container");
    const inputField = document.getElementById("user-input");
    const scoreDisplay = document.getElementById("score");
    const restartBtn = document.getElementById("restart-btn");

    //Variables to keep track of game state
    let score = 0;
    let speed = 1;
    let wordElements = [];
    let gameOver = false;

    // Function to create a falling word
    function createWord() {
        if (gameOver) return; // Don't create new words if game is over

        let word = words[Math.floor(Math.random() * words.length)]; // Random word
        let wordElem = document.createElement("div");
        wordElem.classList.add("word");
        wordElem.innerText = word;
        wordElem.style.top = "0px"; // Start from top
        wordElem.style.left = `${Math.random() * 80 + 10}%`; // Random horizontal position
        gameContainer.appendChild(wordElem);

        //Store word information in an array so we can update its position
        wordElements.push({ element: wordElem, text: word, top: 0 });
    }

    // Function to move words down
    function moveWords() {
        if (gameOver) return; // Don't move words if game is over

        wordElements.forEach((wordObj, index) => {
            wordObj.top += speed; // Move word down
            wordObj.element.style.top = `${wordObj.top}px`;

            // Check if word reaches the bottom (Game Over)
            if (wordObj.top > 380) {
                endGame(); // End game
            }
        });

        requestAnimationFrame(moveWords); // Repeat
    }

    // Check user input
    inputField.addEventListener("input", function () {
        if (gameOver) return; // Stop checking if game is over

        let typedWord = inputField.value.trim();
        wordElements.forEach((wordObj, index) => {
            // Check if typed word matches any falling word, remove from screen
            if (typedWord === wordObj.text) {
                wordObj.element.remove();
                wordElements.splice(index, 1);
                inputField.value = ""; // Clear input
                score += 10; // Increase score
                scoreDisplay.innerText = score; // Update score
                speed += 0.1; // Increase speed
            }
        });
    });

    // Function to end the game
    function endGame() {
        gameOver = true;
        inputField.disabled = true; // Disable input
        restartBtn.style.display = "block"; // Show restart button
    }

    // Function to restart the game
    window.restartGame = function () {
        gameOver = false; // Reset game state
        score = 0; // Reset score
        speed = 1; // Reset speed
        wordElements.forEach(wordObj => wordObj.element.remove()); // Remove all falling words
        wordElements = [];
        scoreDisplay.innerText = score; // Reset score display
        inputField.value = "";
        inputField.disabled = false;
        restartBtn.style.display = "none"; // Hide restart button
        moveWords(); // Restart moving words
    };

    // Start game
    setInterval(createWord, 2000); // Create a new word every 2 seconds
    moveWords(); // Start moving words
});
