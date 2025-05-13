import './App.css';
import Board from './Board/Board';
import Header from './Header/Header';
import { useState } from 'react';

function App() {
  const [howToOpened, setHowToOpened] = useState(false);

  return (
    <>
      <Header howToOpened={howToOpened} setHowToOpened={setHowToOpened} />
      <Board howToOpened={howToOpened} setHowToOpened={setHowToOpened} />
    </>
  );
}

export default App;
