import { useEffect, useState } from "preact/hooks";

const useLocalStorage = (key: string) => {
  const [state, setState] = useState(null as null | string);

  const updateState = (newState: string) => {
    setState(newState);
    localStorage.setItem(key, newState);
  };

  useEffect(() => {
    const cur = localStorage.getItem(key);
    setState(cur);
  }, []);

  return [state, updateState] as [string | null, (ns: string) => void];
};

export { useLocalStorage };
