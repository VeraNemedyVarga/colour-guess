const useLocalStorage = () => {
  const setItem = (key: string, value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(error);
    }
  };

  const getItem = (key: string, defaultValue: unknown) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(error);
      return defaultValue;
    }
  };

  return {
    setItem,
    getItem,
  };
};

export default useLocalStorage;
