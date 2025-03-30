// Constants
export const HANGMAN_STAGES = [
  `
    +---+
        |
        |
        |
        |
        |
  =========`,
  `
    +---+
    |   |
        |
        |
        |
        |
  =========`,
  `
    +---+
    |   |
    O   |
        |
        |
        |
  =========`,
  `
    +---+
    |   |
    O   |
    |   |
        |
        |
  =========`,
  `
    +---+
    |   |
    O   |
   /|   |
        |
        |
  =========`,
  `
    +---+
    |   |
    O   |
   /|\\  |
        |
        |
  =========`,
  `
    +---+
    |   |
    O   |
   /|\\  |
   /    |
        |
  =========`,
  `
    +---+
    |   |
    O   |
   /|\\  |
   / \\  |
        |
  =========`,
];

export const WORD_LIST = [
  'Winterreise',
  'Sommerherz',
  'Deformer',
  'Raised By Wolves',
  'The Ballad of Sexual Dependency',
  'Wires Crossed',
  'Ravens',
  'Love on the Left Bank',
  'Rays a Laugh',
  'Girl Pictures',
  'Rays a Laugh',
  'Experimental Relationship',
  'Cafe Lehmitz',
  'Anyone in Love with You',
];

export class HangmanGame {
  constructor(appendOutputWithTyping) {
    this.appendOutput = appendOutputWithTyping;
    this.word = '';
    this.guessed = new Set();
    this.stage = 0;
  }

  start() {
    this.word = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    this.guessed.clear();
    this.stage = 0;

    const display = this.word
      .split('')
      .map((char) => (char === ' ' ? ' ' : '_'))
      .join(' ');

    this.appendOutput(
      `\n${HANGMAN_STAGES[0]}\n\nTitle: ${display}\nGuessed letters: \n\nGuess a letter:`,
      null
    );
  }

  handleGuess(input) {
    // Validate input (allow letters only)
    if (input.length !== 1 || !/[a-z]/.test(input)) {
      this.appendOutput('Please enter a single letter:', null);
      return { gameOver: false };
    }

    // Check if letter was already guessed
    if (this.guessed.has(input)) {
      this.appendOutput('You already guessed that letter.', null);
      return { gameOver: false };
    }

    // Add letter to guessed set
    this.guessed.add(input);

    // Check if letter is in word and increment stage if wrong
    if (!this.word.toLowerCase().includes(input)) {
      this.stage++;
    }

    // Create display word with guessed letters and spaces
    const display = this.word
      .split('')
      .map((char) => {
        if (char === ' ') return ' ';
        return this.guessed.has(char.toLowerCase()) ? char : '_';
      })
      .join(' ');

    // Create guessed letters display
    const guessedLetters = Array.from(this.guessed).sort().join(', ');

    // Check win condition (ignoring spaces)
    if (!display.replace(/ /g, '').includes('_')) {
      this.appendOutput(
        `${HANGMAN_STAGES[this.stage]}\n\nNice. You won. The title was: ${
          this.word
        }`,
        null
      );
      return { gameOver: true };
    }

    // Check lose condition
    if (this.stage >= 7) {
      this.appendOutput(`${HANGMAN_STAGES[7]}\n\nGame Over.`, null);
      return { gameOver: true };
    }

    // Show current game state
    this.appendOutput(
      `${
        HANGMAN_STAGES[this.stage]
      }\n\nTitle: ${display}\nGuessed letters: ${guessedLetters}\n\nGuess a letter:`,
      null
    );

    return { gameOver: false };
  }
}
