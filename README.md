

## Task Description

Build a small memory card game (if the game name doesn’t ring a bell, here is an article explaining the concept: [Memory (card game)](<https://en.wikipedia.org/wiki/Concentration*(card_game)>))
where you have to tap on a card to see what image is underneath it and try to find the matching image among the other cards. Once all card pairs have been found, the game is over and the user won.


## Core Concept

- Once the application has started the user can see a grid with 2 x 4 cards/tiles (4 card pairs).

- Make sure that the card stack is always shuffled again when a new round starts.

- Add a button that allows the user to reset the game and starts a new game round.

- Add an action that flips a single card (by tapping on it) that changes the card state to visible. The card's image stays visible until the user has tapped on another card in the grid.

On 2nd card flip:

- If there is a match, the 2 currently flipped cards will be eliminated from the game (either hide/remove them or leave them in the visible state)

- If both cards don’t match, they will be flipped again (faced down) after 2 seconds and return to their initial state (hidden).

Also:

- It shouldn’t be possible to flip more than 2 cards to a visible state at the same time (unless they have been matched before).

- Once all card couples/pairs have been found, the player won and the round ends.

## Additional features

- Before starting the game the user should be allowed to choose between multiple levels of difficulties.

  - Easy (2x4 grid) | 8 cards (4 different images)

  - Medium (3x4 grid) | 12 cards (6 different images)

  - Hard (4x4 grid) | 16 cards (8 different images)

- Add a card flip animation.

