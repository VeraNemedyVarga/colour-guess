import { PlayerGuess, Colours, allColours } from '../types';
import './PlayerRow.css';
import { useEffect, useState, useRef } from 'react';
import useOutsideClickHandler from '../hooks/useOutsideClickHandler';

function SpeedDial({
  id,
  cellIndex,
  pickedColours,
  setPickedColours,
  gameResult,
  colourRepetition,
}: Readonly<{
  id: number;
  cellIndex: number;
  pickedColours: PlayerGuess['colours'];
  setPickedColours: (colours: PlayerGuess['colours']) => void;
  gameResult: string;
  colourRepetition: boolean;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const overlay = useRef(null);
  useOutsideClickHandler(overlay, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const handleColourPick = (colour: Colours) => {
    setIsOpen(false);

    const newColours = [...pickedColours] as PlayerGuess['colours'];
    newColours.map((_, index) => {
      if (!colourRepetition) {
        if (newColours[index] === colour) {
          newColours[index] = '';
        }
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
      <div className={`speed-dial_colour-picks `} ref={overlay}>
        {allColours.map((colour, index) => {
          return (
            <div
              key={`speed-dial__${id}_${index}`}
              className={`col-${colour} speed-dial__colour-pick`}
              style={{
                backgroundColor: `${colour}`,
                animationDelay: isOpen ? `0.${(index + 1) % 8}s` : '0s',
              }}
              onClick={() => handleColourPick(colour)}
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
  colourRepetition,
}: Readonly<{
  row: PlayerGuess;
  submitGuess: (rowId: number, pickedColours: PlayerGuess['colours']) => void;
  gameResult: string;
  colourRepetition: boolean;
}>) {
  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);

  const [pickedColours, setPickedColours] = useState<PlayerGuess['colours']>(
    row.colours
  );

  useEffect(() => {
    if (pickedColours.includes('')) return;
    setSubmitIsDisabled(false);
  }, [pickedColours]);

  useEffect(() => {
    setPickedColours(row.colours);
  }, [row.colours]);

  return (
    <div className="player-row">
      <div key={row.id} className="player-row-item">
        {row.colours.map((_, index) => {
          return (
            <SpeedDial
              id={row.id}
              key={`player-row__${row.id}_${index}`}
              cellIndex={index}
              setPickedColours={setPickedColours}
              pickedColours={pickedColours}
              gameResult={gameResult}
              colourRepetition={colourRepetition}
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
