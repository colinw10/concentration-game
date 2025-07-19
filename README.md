# Marine Memory

![Game Rules](./images/rules.png)
![Game Board](./images/board.png)
![Win Result](./images/win.png)
![Loss Result](./images/loss.png)
## User Stories-
- As a user, I want a landing page when I arrive at the website to know I’m in the right place.
- As a user, I want to see all of the games instructions and rules
- As a user, I want to see all of the card images before flipping them over to become familiar with them 
- As a user, I want to see a start/reset button
- As a user, I want to see a guess counter to know how many guesses until I lose
- As a user, I want to see my matched cards stay flipped over to know which ones I have correct
- As a user, I want to see a message to tell me if I have won or lost

### Rules- 

1. There is 12 cards total on the board (6 Pairs) and the objective is to match all 6 pairs to win.
2. If you match all the pairs you win, but if you reach 15 guesses before matching all the pairs then you lose.
3. There is no time limit for the game.
4. If you want to play again press “Reset Game” and the cards will shuffle as well as the guess counter resetting.

#### Technologies Used-
- Javascript, HTML, CSS


##### Psuedocode- 
1.Define constants and variables
* Define list of card images or values 
* Define max number of wrong guesses allowed
2. Define app state variables 
* cards (array of shuffled card objects)
* firstCard (object or null)
* secondCard (object or null)
* matchedPairs (number)
* wrongGuesses (number)
3. Cache DOM elements
* game board container
* guess counter element
* message element
* play again button
4. Add event listeners
* Add a delegated event listener to the game board for card clicks
* Add click event listener to the “Play Again” button
5. Define the init function
* Shuffle and assign card values
* Reset all state variables
* Hide or reset all cards on the board
* Clear message and counter
* Call render()
6. Define the render function
* Loop through cards and show/hide based on match state
* Update guess counter in DOM
* Show win or lose message if game over
7. Wait for user to click a card
* If firstCard is null - store clicked card as firstCard
* Else - store as secondCard, then:
    * Compare first and second card
    * If match - mark both as matched, increment matchedPairs
    * If no match - wait briefly, then flip both back, increment wrongGuesses
    * Reset firstCard and secondCard
* If wrongGuesses : max allowed - show lose message
* If all pairs matched - show win message
* Call render()
8. Wait for user to click "Play Again"
* On click - invoke init() to reset game

###### Attributions-
Some coding guidance and suggestions were assisted by OpenAI's ChatGPT.