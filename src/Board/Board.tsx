import { useRef, useState } from 'react';

import { Colours, PlayerGuess, GameFeedback } from '../types';
import { allColours } from '../utils/colours';
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
    const colours: Colours[] = allColours as Colours[];
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

  const [activeRowIndex, setactiveRowIndex] = useState<number>(0);

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
        <div>
          {playerRows.map((row) => (
            <div
              className={
                'game-rows__player-row ' +
                (row.id === activeRowIndex ? 'active' : 'disabled')
              }
              key={row.id}
            >
              <PlayerRow row={row} />
              <button key={`${row.id}-submit`}>Submit</button>
            </div>
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
