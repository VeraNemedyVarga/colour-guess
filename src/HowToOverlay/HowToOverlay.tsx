import { allColours } from '../utils/colours';

export default function HowToOverlay() {
  return (
    <div className="overlay-content">
      <div>
        <h4>How to play?</h4>
        <h5>
          Figure out the colour combination behind the puzzle cards at the top.
        </h5>
      </div>
      <div>
        <ul>
          <li>
            Pick four colours out of possible six
            <div>
              <div>
                {allColours.map((colour) => (
                  <span
                    key={colour}
                    aria-label={colour}
                    style={{
                      backgroundColor: colour,
                      display: 'inline-block',
                      width: 30,
                      height: 30,
                      margin: 5,
                      borderRadius: 50,
                    }}
                  ></span>
                ))}
              </div>
              <div>
                {allColours.map((colour) => (
                  <span key={`colour-name-${colour}`} className="colour-name">
                    {colour}
                  </span>
                ))}
              </div>
            </div>
          </li>
          <li>The order of the colours matters</li>
          <li>No colour is repeated in the puzzle</li>
          <li>Submit your guess to get a feedback</li>
          <li>
            Each feedback cell will either have black, white or no colour
            <ul className="feedback-colour">
              <li>
                <span
                  aria-label="black"
                  style={{
                    backgroundColor: 'black',
                    display: 'inline-block',
                    width: 20,
                    height: 20,
                    margin: 5,
                    borderRadius: 50,
                  }}
                ></span>
                <span>
                  black - you guessed a colour right, BUT it's in the WRONG
                  place.
                </span>
              </li>
              <li>
                <span
                  aria-label="black"
                  style={{
                    backgroundColor: 'white',
                    display: 'inline-block',
                    width: 20,
                    height: 20,
                    margin: 5,
                    borderRadius: 50,
                  }}
                ></span>
                <span>
                  white - you guessed a colour right, AND it's in the RIGHT
                  place.
                </span>
              </li>
              <li>
                <span
                  aria-label="black"
                  style={{
                    backgroundColor: 'transparent',
                    display: 'inline-block',
                    width: 20,
                    height: 20,
                    margin: 5,
                    borderRadius: 50,
                    border: '1px solid white',
                  }}
                ></span>
                <span>
                  no colour - you guessed a colour that isn't in the puzzle
                  combination.
                </span>
              </li>
            </ul>
          </li>
          <li>
            Use logical thinking to achieve four white cells in the feedback
            matrix to win.
          </li>
        </ul>
      </div>
    </div>
  );
}
