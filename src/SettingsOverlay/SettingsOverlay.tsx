import './SettingsOverlay.css';
import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export default function SettingsOverlay({
  numberOfRows,
  setNumberOfRows,
  colourRepetition,
  setColourRepetition,
  setSettingsOpened,
}: Readonly<{
  numberOfRows: number;
  setNumberOfRows: (rows: number) => void;
  colourRepetition: boolean;
  setColourRepetition: (repetition: boolean) => void;
  setSettingsOpened: (opened: boolean) => void;
}>) {
  const { setItem } = useLocalStorage();
  const [rows, setRows] = useState(numberOfRows);
  const [repetition, setRepetition] = useState(colourRepetition);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    let newValidatedRows;
    if (isNaN(numberOfRows) || typeof rows !== 'number') {
      newValidatedRows = 1;
    } else {
      newValidatedRows = Math.max(1, Math.min(rows, 10));
    }

    // If the current 'rows' state is not the 'newValidatedRows' (e.g., it was NaN or out of bounds),
    // update 'rows' to the corrected value and exit this effect run.
    // The effect will run again with the corrected 'rows' value.
    if (rows !== newValidatedRows) {
      setRows(newValidatedRows);
      return;
    }

    setItem('repetition', repetition);
    setColourRepetition(repetition);
    setItem('rows', rows);
    setNumberOfRows(rows);
    setSettingsOpened(false);
  };

  return (
    <div className="overlay-content">
      <form action="" onSubmit={(e) => submit(e)} className="settings-form">
        <fieldset className="settings-fieldset">
          <label htmlFor="rows">Number of rows</label>
          <input
            type="number"
            name="rows"
            id="rows"
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
          />
        </fieldset>
        <fieldset className="settings-fieldset">
          <label htmlFor="repetition">Allow colour repetition</label>
          <input
            type="checkbox"
            name="repetition"
            id="repetition"
            defaultChecked={repetition}
            onChange={(e) => setRepetition(e.target.checked)}
          />
        </fieldset>
        <button type="submit">Save settings</button>
      </form>
    </div>
  );
}
