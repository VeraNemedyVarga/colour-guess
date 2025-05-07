import { useRef, useState } from 'react';

import { Colours, PlayerGuess, GameFeedback } from '../types';
import { allColours } from '../utils/colours';
import './Board.css';
import PlayerRow from '../PlayerRow/PlayerRow';
import FeedbackRow from '../FeedbackRow/FeedbackRow';

type MasterCombination = Array<Colours>;

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
    const colours: Colours[] = [...allColours] as Colours[];
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * colours.length);
      const randomColour = colours[randomIndex];
      randomArray.push(randomColour);

      // Remove the random colour from the array to avoid duplicates
      const colourIndex = colours.indexOf(randomColour);
      colours.splice(colourIndex, 1);
    }
    return randomArray;
  };

  const masterCombination = useRef<MasterCombination>(
    generateMasterCombination()
  );

  const [activeRowIndex, setactiveRowIndex] = useState<number>(0);

  const fisherYatesShuffle = (array: GameFeedback['colours']) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const submitGuess = (rowId: number, colours: PlayerGuess['colours']) => {
    const _playerRows = [...playerRows];
    _playerRows.forEach((row) => {
      if (row.id === rowId) {
        row.colours = colours;
      }
    });
    setPlayerRows(_playerRows);
    compareGuessToMaster();
  };

  const compareGuessToMaster = () => {
    const feedback: GameFeedback['colours'] = ['', '', '', ''];
    playerRows[activeRowIndex].colours.forEach((colour, index) => {
      if (masterCombination.current.includes(colour)) {
        if (colour === masterCombination.current[index]) {
          feedback[index] = 'white';
        } else {
          feedback[index] = 'black';
        }
      }
    });

    console.log('feedback', feedback);

    const _feedbackRows = [...feedbackRows];
    _feedbackRows[activeRowIndex].colours = fisherYatesShuffle(feedback);
    setFeedbackRows(_feedbackRows);
    setactiveRowIndex(activeRowIndex + 1);
  };

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
              <PlayerRow row={row} submitGuess={submitGuess} />
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
