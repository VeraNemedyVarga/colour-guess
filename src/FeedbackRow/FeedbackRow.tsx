import './FeedbackRow.css';
import { GameFeedback } from '../types';

export default function FeedbackRow({ row }: Readonly<{ row: GameFeedback }>) {
  return (
    <div key={row.id} className="feedback-row-item">
      {row.colours.map((colour, index) => {
        return (
          <div
            key={`feedback-row__${row.id}_${index}`}
            className="feedback-row__colour-cell"
            style={{
              backgroundColor: `${colour}`,
            }}
          ></div>
        );
      })}
    </div>
  );
}
