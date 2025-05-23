import { useState, useCallback } from "react";

function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [localStorageVal, setLocalStorageVal] = useState(() => {
    const jsonValue = localStorage.getItem(key);

    if (jsonValue !== null) {
      const dataFromLocal = JSON.parse(jsonValue);
      return dataFromLocal as T;
    }

    if (initialValue instanceof Function) {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (newState: T | (() => T)) => {
      const value = newState instanceof Function ? newState() : newState;
      setLocalStorageVal(value);
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key],
  );

  return [localStorageVal, setValue] as const;
}

export default useLocalStorage;
