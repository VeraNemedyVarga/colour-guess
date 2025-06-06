export enum Colours {
  Red = '#FF0000',
  Green = '#00FF00',
  Blue = '#0000FF',
  Yellow = '#FFFF00',
  Purple = '#800080',
  Orange = '#FFA500',
}

export const allColours = Object.values(Colours) as Colours[];
type CellColour = Colours | '';
export type PlayerGuess = {
  id: number;
  colours: [CellColour, CellColour, CellColour, CellColour];
};

export enum FeedBackColour {
  Black = 'black',
  White = 'white',
}
type FeedBackCellColour = FeedBackColour | '';
export type GameFeedback = {
  id: number;
  colours: [
    FeedBackCellColour,
    FeedBackCellColour,
    FeedBackCellColour,
    FeedBackCellColour
  ];
};

export type MasterCombination = [Colours, Colours, Colours, Colours];

export enum GameResult {
  Won = 'won',
  Lost = 'lost',
  InProgress = 'inProgress',
  NotStarted = 'notStarted',
}
