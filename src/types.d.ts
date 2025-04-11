export type Colours =
  | 'Red'
  | 'Green'
  | 'Blue'
  | 'Yellow'
  | 'Purple'
  | 'Orange'
  | '';

export type GameAnswers = 'Black' | 'White' | '';
export type PlayerGuess = {
  id: number;
  colours: [Colours, Colours, Colours, Colours];
};
export type GameFeedback = {
  id: number;
  colours: [GameAnswers, GameAnswers, GameAnswers, GameAnswers];
};
