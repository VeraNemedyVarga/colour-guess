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
        callbackFunction();
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, callbackFunction]);
};

export default useOutsideClickHandler;
