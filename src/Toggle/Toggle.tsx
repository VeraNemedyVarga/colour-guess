import { useEffect, useState } from 'react';
import './Toggle.css';

const Toggle = () => {
  const [light, setLight] = useState(true);
  const toggle = () => {
    setLight(!light);
  };

  const systemPreference = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  useEffect(() => {
    setLight(!systemPreference);
  }, [systemPreference]);

  useEffect(() => {
    if (!light) {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }, [light]);

  return (
    <div className={`toggle ${light ? 'light' : 'dark'}`} onClick={toggle}>
      <span className="toggle__icon dark">🌙</span>
      <span className="toggle__icon light">🔆</span>
      <div className="toggle__slider"></div>
    </div>
  );
};

export default Toggle;
