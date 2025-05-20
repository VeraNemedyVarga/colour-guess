import { useRef, useState } from 'react';

import { Colours, PlayerGuess, GameFeedback, GameResult } from '../types';
import { allColours } from '../utils/colours';
import './Board.css';
import PlayerRow from '../PlayerRow/PlayerRow';
import FeedbackRow from '../FeedbackRow/FeedbackRow';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

type MasterCombination = Array<Colours>;

export default function Board({
  howToOpened,
}: Readonly<{
  howToOpened: boolean;
}>) {
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
    generateEmptyRows({ id: 0, colours: ['', '', '', ''] }, 5)
  );
  const [feedbackRows, setFeedbackRows] = useState<GameFeedback[]>(
    generateEmptyRows({ id: 0, colours: ['', '', '', ''] }, 5)
  );
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [gameResult, setGameResult] = useState<GameResult>('');

  const [activeRowIndex, setactiveRowIndex] = useState<number>(0);

  gsap.registerPlugin(useGSAP);
  const playerCells = useRef(null);
  const qpc = gsap.utils.selector(playerCells);

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

  const fisherYatesShuffle = (array: GameFeedback['colours']) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const masterRow = useRef(null);
  const q = gsap.utils.selector(masterRow);

  useGSAP(() => {
    gsap.set(q('.master-row__colour-cell'), {
      y: -50,
    });
    gsap.to(q('.master-row__colour-cell'), {
      y: 0,
      duration: 0.2,
      stagger: {
        amount: 0.5,
        from: 'end',
      },
    });
  }, []);

  const submitGuess = (rowId: number, colours: PlayerGuess['colours']) => {
    const _playerRows = [...playerRows];
    _playerRows.forEach((row) => {
      if (row.id === rowId) {
        row.colours = colours;
      }
    });
    setPlayerRows(_playerRows);
    giveFeedback();
    const shouldGameEnd = gameShouldEnd();
    setGameEnded(shouldGameEnd);

    if (!shouldGameEnd && activeRowIndex < playerRows.length - 1) {
      setactiveRowIndex(activeRowIndex + 1);
    }
  };

  const giveFeedback = () => {
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
    const _feedbackRows = [...feedbackRows];
    _feedbackRows[activeRowIndex].colours = fisherYatesShuffle(feedback);
    setFeedbackRows(_feedbackRows);
  };

  const gameShouldEnd = () => {
    if (
      arraysMatch(playerRows[activeRowIndex].colours, masterCombination.current)
    ) {
      setGameResult('won');
      return true;
    }
    if (activeRowIndex === playerRows.length - 1) {
      setGameResult('lost');
      return true;
    }
    return false;
  };

  useGSAP(
    () => {
      if (gameEnded) {
        gsap.to(q('.master-row__colour-cell'), {
          rotateY: 0,
          duration: 0.1,
          stagger: {
            each: 0.2,
            from: 'start',
          },
        });

        if (gameResult === 'won') {
          gsap.fromTo(
            qpc('.player-row .speed-dial'),
            {
              y: 20,
              borderColor: 'green',
            },
            {
              y: 0,
              duration: 1.2,
              borderColor: 'white',
              yoyo: true,
              stagger: {
                amount: 0.8,
                from: 'start',
                grid: [10, 4],
              },
            }
          );
        }

        if (gameResult === 'lost') {
          const tl = gsap.timeline();

          tl.fromTo(
            qpc('.player-row'),
            {
              x: 15,
            },
            {
              x: 0,
              duration: 0.1,
              repeat: 3,
              yoyo: true,
            }
          );

          tl.set(qpc('.player-row'), {
            x: 0,
          });
        }
      }
    },
    { dependencies: [gameEnded] }
  );

  const arraysMatch = (arr1: Colours[], arr2: Colours[]) => {
    return (
      arr1.length === arr2.length &&
      arr1.every((value, index: number) => value === arr2[index])
    );
  };

  return (
    <div className={howToOpened ? 'how-to-overlay-open' : ''}>
      <div
        className={(gameEnded ? 'game-ended ' : '') + 'master-row'}
        ref={masterRow}
      >
        {Array.from({ length: 4 }, (_, index) => (
          <div
            className={`col-${index} master-row__colour-cell`}
            key={`master-row__${index}-back`}
          >
            <div
              key={`master-row__${index}-back`}
              className="card-back"
              style={{ '--animation-order': index + 1 } as React.CSSProperties}
            ></div>

            <div
              className="card-front"
              style={{ backgroundColor: masterCombination.current[index] }}
            ></div>
          </div>
        ))}
      </div>
      <div className="game-result-header">
        {gameResult === 'won' ? 'Good Job! 🥳' : null}
        {gameResult === 'lost' ? "You'll get it next time 🤗" : null}
      </div>

      <div className="game-rows" ref={playerCells}>
        {playerRows.map((row, index) => (
          <div
            className={
              'game-rows__player-row ' +
              (row.id === activeRowIndex ? 'active' : 'disabled')
            }
            key={row.id}
          >
            <PlayerRow
              row={row}
              submitGuess={submitGuess}
              gameResult={gameResult}
            />
            <FeedbackRow
              row={feedbackRows[index]}
              key={feedbackRows[index].id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
