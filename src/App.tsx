import './App.css';
import Board from './Board/Board';
import { useRef, useState } from 'react';
import HowToOverlay from './HowToOverlay/HowToOverlay';
import SettingsOverlay from './SettingsOverlay/SettingsOverlay';
import useOutsideClickHandler from './hooks/useOutsideClickHandler';
import useLocalStorage from './hooks/useLocalStorage';
import Toggle from './Toggle/Toggle';

function App() {
  const { getItem } = useLocalStorage();
  const [howToOpened, setHowToOpened] = useState(false);
  const [settingsOpened, setSettingsOpened] = useState(false);
  const [numberOfRows, setNumberOfRows] = useState(() => getItem('rows', 5));
  const [colourRepetition, setColourRepetition] = useState(() =>
    getItem('repetition', false)
  );
  const howtowrapper = useRef(null);
  useOutsideClickHandler(howtowrapper, () => {
    if (howToOpened) {
      // Only call the setter if the modal is actually open
      setHowToOpened(false);
    }
  });

  const settingswrapper = useRef(null);
  useOutsideClickHandler(settingswrapper, () => {
    if (settingsOpened) {
      setSettingsOpened(false);
    }
  });

  const handleHowToOpen = () => {
    if (!howToOpened) {
      setHowToOpened(true);
      setSettingsOpened(false);
    }
  };

  const handleSettingsOpen = () => {
    if (!settingsOpened) {
      setSettingsOpened(true);
      setHowToOpened(false);
    }
  };

  return (
    <>
      <div>
        <div
          className={`howto-overlay ${howToOpened ? 'opened' : 'closed'}`}
          ref={howtowrapper}
        >
          <HowToOverlay />
        </div>
        <div
          className={`settings-overlay ${settingsOpened ? 'opened' : 'closed'}`}
          ref={settingswrapper}
        >
          <SettingsOverlay
            numberOfRows={numberOfRows}
            setNumberOfRows={setNumberOfRows}
            colourRepetition={colourRepetition}
            setColourRepetition={setColourRepetition}
            setSettingsOpened={setSettingsOpened}
          />
        </div>
        <div className="header">
          <button className="how-to-button" onClick={handleHowToOpen}>
            How to play?
          </button>
          <button className="settings-button" onClick={handleSettingsOpen}>
            Settings
          </button>
          <Toggle />
        </div>
        <p className="title">Guess the colour combination</p>
      </div>

      <Board
        howToOpened={howToOpened}
        settingsOpened={settingsOpened}
        numberOfRows={numberOfRows}
        colourRepetition={colourRepetition}
      />
    </>
  );
}

export default App;
