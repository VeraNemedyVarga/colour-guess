import { PlayerGuess } from '../types';
import './PlayerRow.css';

export default function PlayerRow({ row }: Readonly<{ row: PlayerGuess }>) {
  const allColours = ['Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Orange'];
  return (
    <div className="player-row">
      <div key={row.id} className="player-row-item">
        {row.colours.map((colour, index) => {
          return (
            <div
              key={`player-row__${row.id}_${index}`}
              className={`col-${colour} player-row__colour-cell`}
            ></div>
          );
        })}
      </div>
      <div className="player-row__colour-picks">
        {allColours.map((colour, index) => {
          return (
            <div
              key={`player-row__${row.id}_${index}`}
              className={`col-${colour} player-row__colour-pick`}
              style={{ backgroundColor: colour.toLowerCase() }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
