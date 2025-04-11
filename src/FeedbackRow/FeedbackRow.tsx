import './FeedbackRow.css';
import { GameFeedback } from '../types';

export default function FeedbackRow({ row }: Readonly<{ row: GameFeedback }>) {
  return (
    <div key={row.id} className="feedback-row-item">
      {row.colours.map((feedback, index) => {
        return (
          <div
            key={`feedback-row__${row.id}_${index}`}
            className={`col-${feedback} feedback-row__colour-cell`}
          ></div>
        );
      })}
    </div>
  );
}
