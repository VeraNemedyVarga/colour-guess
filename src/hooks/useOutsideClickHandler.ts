import React, { useEffect } from 'react';

const useOutsideClickHandler = (
  ref: React.RefObject<unknown>,
  callbackFunction: () => void
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        ref.current &&
        !(ref.current as HTMLElement).contains(e.target as Node)
      ) {
        e.preventDefault();
        callbackFunction();
      }
    };

    document.addEventListener('mousedown', handleClick, true);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, callbackFunction]);
};

export default useOutsideClickHandler;
