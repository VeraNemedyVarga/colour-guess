import { useRef, useState } from 'react';

import { Colours, PlayerGuess, GameFeedback } from '../types';
import './Board.css';
import PlayerRow from '../PlayerRow/PlayerRow';
import FeedbackRow from '../FeedbackRow/FeedbackRow';

type MasterCombination = Array<{ index: number; colour: Colours }>;

export default function Board() {
  const generateEmptyRows = <T extends PlayerGuess | GameFeedback>(
    row: T,
    rows: number
  ): T[] => {
    const emptyRows: T[] = [];
    for (let i = 0; i < rows; i++) {
      emptyRows.push({ ...row, id: i });
    }
    return emptyRows;
  };

  const [playerRows, setPlayerRows] = useState<PlayerGuess[]>(
    generateEmptyRows({ id: 0, colours: ['', '', '', ''] }, 10)
  );
  const [feedbackRows, setFeedbackRows] = useState<GameFeedback[]>(
    generateEmptyRows({ id: 0, colours: ['', '', '', ''] }, 10)
  );

  const generateMasterCombination = (): MasterCombination => {
    const randomArray: MasterCombination = [];
    const colours: Colours[] = [
      'Red',
      'Green',
      'Blue',
      'Yellow',
      'Purple',
      'Orange',
    ];
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * colours.length);
      const randomColour = colours[randomIndex];
      randomArray.push({ index: i, colour: randomColour });
    }
    return randomArray;
  };

  const masterCombination = useRef<MasterCombination>(
    generateMasterCombination()
  );

  return (
    <div>
      <div className="master-row">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={`master-row__${index}`}
            className={`col-${index} master-row__colour-cell`}
          ></div>
        ))}
      </div>
      <div className="game-rows">
        <div className="player-row">
          {playerRows.map((row) => (
            <PlayerRow row={row} key={row.id} />
          ))}
        </div>
        <div className="feedback-row">
          {feedbackRows.map((row) => (
            <FeedbackRow row={row} key={row.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
