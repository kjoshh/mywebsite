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
    if (input.length !== 1 || !/[a-z]/.test(input)) {
      this.appendOutput('Please enter a single letter:', null);
      return { gameOver: false };
    }

    if (this.guessed.has(input)) {
      this.appendOutput('You already guessed that letter.', null);
      return { gameOver: false };
    }

    this.guessed.add(input);

    if (!this.word.toLowerCase().includes(input)) {
      this.stage++;
    }

    const display = this.word
      .split('')
      .map((char) => {
        if (char === ' ') return ' ';
        return this.guessed.has(char.toLowerCase()) ? char : '_';
      })
      .join(' ');

    const guessedLetters = Array.from(this.guessed).sort().join(', ');

    if (!display.replace(/ /g, '').includes('_')) {
      this.appendOutput(
        `${HANGMAN_STAGES[this.stage]}\n\nNice. You won. The title was: ${
          this.word
        }`,
        null
      );
      return { gameOver: true };
    }

    if (this.stage >= 7) {
      this.appendOutput(`${HANGMAN_STAGES[7]}\n\nGame Over.`, null);
      return { gameOver: true };
    }

    this.appendOutput(
      `${
        HANGMAN_STAGES[this.stage]
      }\n\nTitle: ${display}\nGuessed letters: ${guessedLetters}\n\nGuess a letter:`,
      null
    );

    return { gameOver: false };
  }
}
