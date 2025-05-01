import { PlayerGuess } from '../types';
import './PlayerRow.css';
import { allColours, cssColours } from '../utils/colours';
import { useState } from 'react';

function SpeedDial({
  id,
  cellIndex,
  activeCell,
}: Readonly<{
  id: number;
  cellIndex: number;
  activeCell: number | null;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const [pickedColour, setPickedColour] = useState('');

  const handleColourPick = (colour: string) => {
    setIsOpen(false);
    setPickedColour(colour);
  };

  return (
    <div
      className={`speed-dial cell-${cellIndex} ${isOpen ? 'open' : ''} ${
        activeCell === cellIndex && cellIndex >= 0 ? 'active' : ''
      }`}
    >
      <button
        className="speed-dial__trigger-cell"
        onClick={() => setIsOpen(!isOpen)}
        style={{ backgroundColor: pickedColour || '' }}
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
              onClick={() => handleColourPick(colour)}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default function PlayerRow({ row }: Readonly<{ row: PlayerGuess }>) {
  const [pickedColours, setPickedColours] = useState<
    [string, string, string, string]
  >(['', '', '', '']);
  const [activeRow, setActiveRow] = useState<number>(0);
  const [activeCell, setActiveCell] = useState<number | null>(0);
  const [pickedColoursInARow, setPickedColoursInARow] = useState<string[]>([]);

  return (
    <div className="player-row">
      <div key={row.id} className="player-row-item">
        {row.colours.map((colour, index) => {
          return (
            <SpeedDial
              id={row.id}
              key={`player-row__${row.id}_${index}`}
              cellIndex={index}
              onClick={() => {
                return setActiveCell(index);
              }}
              activeCell={activeCell}
            />
          );
        })}
      </div>
      <button key={`${row.id}-submit`}>Submit</button>
    </div>
  );
}
