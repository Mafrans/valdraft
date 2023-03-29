import { StateUpdater, useEffect, useState } from "preact/hooks";

function getStorageValue<T = any>(
  key: string,
  defaultValue: T | undefined
): T | undefined {
  // getting stored value
  const saved = localStorage.getItem(key);
  if (!saved) {
    return defaultValue;
  }

  try {
    return JSON.parse(saved) as T;
  } catch (e) {
    return saved as T | undefined;
  }
}

export function useLocalStorage<T = any>(
  key: string,
  defaultValue?: T
): [T | undefined, StateUpdater<T | undefined>] {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    if (value != null) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
}
