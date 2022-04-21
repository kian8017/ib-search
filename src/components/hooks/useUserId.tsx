import { useEffect, useState } from "preact/hooks";
import { v4 as uuid, NIL as nilUUID } from "uuid";

const KEY = "user-id";

const useUserId = () => {
  const [state, setState] = useState(nilUUID);

  useEffect(() => {
    const currentId = localStorage.getItem(KEY);
    if (currentId == null) {
      let newUUID = uuid();
      localStorage.setItem(KEY, newUUID);
      setState(newUUID);
    } else {
      setState(currentId);
    }
  }, []);

  return state;
};

export { useUserId };
