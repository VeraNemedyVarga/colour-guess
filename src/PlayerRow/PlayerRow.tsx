import { PlayerGuess, Colours } from '../types';
import './PlayerRow.css';
import { allColours } from '../utils/colours';
import { useEffect, useState } from 'react';

function SpeedDial({
  id,
  cellIndex,
  pickedColours,
  setPickedColours,
  gameResult,
}: Readonly<{
  id: number;
  cellIndex: number;
  pickedColours: PlayerGuess['colours'];
  setPickedColours: (colours: PlayerGuess['colours']) => void;
  gameResult: string;
}>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleColourPick = (colour: Colours) => {
    setIsOpen(false);

    const newColours = [...pickedColours] as PlayerGuess['colours'];
    newColours.map((_, index) => {
      if (newColours[index] === colour) {
        newColours[index] = '';
      }
    });
    newColours[cellIndex] = colour;
    setPickedColours(newColours);
  };

  return (
    <div className={`speed-dial cell-${cellIndex} ${isOpen ? 'open' : ''}`}>
      <button
        className="speed-dial__trigger-cell"
        onClick={() => setIsOpen(!isOpen)}
        style={{ backgroundColor: pickedColours[cellIndex] || '' }}
        disabled={gameResult.length > 0}
      >
        <span>+</span>
      </button>
      <div className={`speed-dial_colour-picks `}>
        {allColours.map((colour, index) => {
          return (
            <div
              key={`speed-dial__${id}_${index}`}
              className={`col-${colour} speed-dial__colour-pick`}
              style={{
                backgroundColor: `${colour}`,
                animationDelay: isOpen ? `0.${(index + 1) % 8}s` : '0s',
              }}
              onClick={() => handleColourPick(colour as Colours)}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default function PlayerRow({
  row,
  submitGuess,
  gameResult,
}: Readonly<{
  row: PlayerGuess;
  submitGuess: (rowId: number, pickedColours: PlayerGuess['colours']) => void;
  gameResult: string;
}>) {
  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);

  const [pickedColours, setPickedColours] = useState<PlayerGuess['colours']>(
    row.colours
  );

  useEffect(() => {
    if (pickedColours.includes('')) return;
    setSubmitIsDisabled(false);
  }, [pickedColours]);

  return (
    <div className="player-row">
      <div key={row.id} className="player-row-item">
        {row.colours.map((colour, index) => {
          return (
            <SpeedDial
              id={row.id}
              key={`player-row__${row.id}_${index}`}
              cellIndex={index}
              setPickedColours={setPickedColours}
              pickedColours={pickedColours}
              gameResult={gameResult}
            />
          );
        })}
      </div>
      <button
        key={`${row.id}-submit`}
        className="player-row__submit-button"
        onClick={() => submitGuess(row.id, pickedColours)}
        disabled={submitIsDisabled || gameResult.length > 0}
      >
        Submit
      </button>
    </div>
  );
}
