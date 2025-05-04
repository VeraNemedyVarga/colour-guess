export type Colours =
  | 'red'
  | 'green'
  | 'blue'
  | 'yellow'
  | 'purple'
  | 'orange'
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
