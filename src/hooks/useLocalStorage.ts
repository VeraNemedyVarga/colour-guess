const useLocalStorage = () => {
  const setItem = (key: string, value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = (key: string, defaultValue: unknown) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.log(error);
      return defaultValue;
    }
  };

  return {
    setItem,
    getItem,
  };
};

export default useLocalStorage;
