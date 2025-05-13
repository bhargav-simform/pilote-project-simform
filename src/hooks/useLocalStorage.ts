import { useCallback, useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, _setValue] = useState(() => {
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
      _setValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key]
  );

  return [value, setValue] as const;
}

export default useLocalStorage;
