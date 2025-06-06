import { useRef, useState, useEffect, useCallback } from 'react';

import {
  Colours,
  allColours,
  PlayerGuess,
  GameFeedback,
  GameResult,
  FeedBackColour,
  MasterCombination,
} from '../types';
import './Board.css';
import PlayerRow from '../PlayerRow/PlayerRow';
import FeedbackRow from '../FeedbackRow/FeedbackRow';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Board({
  howToOpened,
  settingsOpened,
  numberOfRows,
  colourRepetition,
}: Readonly<{
  howToOpened: boolean;
  settingsOpened: boolean;
  numberOfRows: number;
  colourRepetition: boolean;
}>) {
  const generateEmptyRows = <T extends PlayerGuess | GameFeedback>(
    templateRow: T,
    count: number
  ): T[] => {
    const emptyRows: T[] = [];
    for (let i = 0; i < count; i++) {
      emptyRows.push({ ...templateRow, id: i });
    }
    return emptyRows;
  };

  // Memoize helper functions defined within the component
  const memoizedGenerateEmptyRows = useCallback(generateEmptyRows, []);

  const [playerRows, setPlayerRows] = useState<PlayerGuess[]>(() =>
    memoizedGenerateEmptyRows(
      { id: 0, colours: ['', '', '', ''] },
      numberOfRows
    )
  );
  const [feedbackRows, setFeedbackRows] = useState<GameFeedback[]>(() =>
    memoizedGenerateEmptyRows(
      { id: 0, colours: ['', '', '', ''] },
      numberOfRows
    )
  );
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [gameResult, setGameResult] = useState<GameResult>(
    GameResult.NotStarted
  );

  const [activeRowIndex, setactiveRowIndex] = useState<number>(0);

  const playerCells = useRef(null);
  const qpc = gsap.utils.selector(playerCells);

  const generateMasterCombination = useCallback((): MasterCombination => {
    const randomArray = [];
    const colours: Colours[] = [...allColours] as Colours[];
    // Ensure master combination always has 4 colours, regardless of 'rows' state
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * colours.length);
      const randomColour = colours[randomIndex];
      randomArray.push(randomColour);

      // Remove the random colour from the array to avoid duplicates if colourRepetition is not allowed
      if (!colourRepetition) {
        const colourIndex = colours.indexOf(randomColour);
        colours.splice(colourIndex, 1);
      }
    }
    return randomArray as MasterCombination;
  }, [colourRepetition]); // allColours is a constant import

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
  }, [masterCombination.current]);

  useEffect(() => {
    setPlayerRows(
      memoizedGenerateEmptyRows(
        { id: 0, colours: ['', '', '', ''] },
        numberOfRows
      )
    );
    setFeedbackRows(
      memoizedGenerateEmptyRows(
        { id: 0, colours: ['', '', '', ''] },
        numberOfRows
      )
    );
    setactiveRowIndex(0);
    setGameEnded(false);
    setGameResult(GameResult.InProgress);
    masterCombination.current = generateMasterCombination();
  }, [
    numberOfRows,
    memoizedGenerateEmptyRows,
    generateMasterCombination,
    masterCombination,
    colourRepetition,
  ]);

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
      if (
        colour !== '' &&
        masterCombination.current.includes(colour as Colours)
      ) {
        if (colour === masterCombination.current[index]) {
          feedback[index] = FeedBackColour.White;
        } else {
          feedback[index] = FeedBackColour.Black;
        }
      }
    });
    const _feedbackRows = [...feedbackRows];
    _feedbackRows[activeRowIndex].colours = fisherYatesShuffle(feedback);
    setFeedbackRows(_feedbackRows);
  };

  const gameShouldEnd = () => {
    if (!playerRows[activeRowIndex].colours.includes('')) {
      if (
        arraysMatch(
          playerRows[activeRowIndex].colours as Colours[],
          masterCombination.current
        )
      ) {
        setGameResult(GameResult.Won);
        return true;
      }
    }
    if (activeRowIndex === playerRows.length - 1) {
      setGameResult(GameResult.Lost);
      return true;
    }
    return false;
  };

  // Effect to handle GSAP animations when game ends

  useGSAP(() => {
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
      } else if (gameResult === 'lost') {
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
    }
  }, [gameEnded, gameResult]);

  const arraysMatch = (arr1: Colours[], arr2: Colours[]) => {
    return (
      arr1.length === arr2.length &&
      arr1.every((value, index: number) => value === arr2[index])
    );
  };

  return (
    <div className={howToOpened || settingsOpened ? 'overlay-open' : ''}>
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
              colourRepetition={colourRepetition}
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
