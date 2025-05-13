export type Colours =
  | 'red'
  | 'green'
  | 'blue'
  | 'yellow'
  | 'purple'
  | 'orange'
  | '';

export type FeedBackColour = 'black' | 'white' | '';
export type PlayerGuess = {
  id: number;
  colours: [Colours, Colours, Colours, Colours];
};

export type GameFeedback = {
  id: number;
  colours: [FeedBackColour, FeedBackColour, FeedBackColour, FeedBackColour];
};

export type GameResult = 'won' | 'lost' | '';
