import { h, createContext, FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { SEARCH_HISTORY } from "../../style/consts";

type AddSearchHistoryResult = (add: string) => void;
type RemoveSearchHistoryResult = (remove: string) => void;
type ClickSearchHistoryResult = (clicked: string) => void;
type SearchHistoryUpdateType = [
  AddSearchHistoryResult,
  RemoveSearchHistoryResult,
  ClickSearchHistoryResult
];

const SearchHistoryResultsContext = createContext([] as string[]);
const SearchHistoryUpdateContext = createContext([
  () => {},
  () => {},
  () => {},
] as SearchHistoryUpdateType);

const SearchHistoryProvider: FunctionalComponent = (props) => {
  const [results, setResults] = useState([] as string[]); // Newest at front

  // Effect to grab out of localstorage
  useEffect(() => {
    const cur = localStorage.getItem(SEARCH_HISTORY.STORAGE_NAME);
    if (cur !== null) {
      const items = JSON.parse(cur) as string[];
      setResults(items);
    }
  }, []);

  const saveResults = () => {
    const str = JSON.stringify(results);
    localStorage.setItem(SEARCH_HISTORY.STORAGE_NAME, str);
  };

  const addResult = (add: string) => {
    if (results.indexOf(add) < 0) {
      // Only add if we don't already have it
      results.unshift(add);
      if (results.length > SEARCH_HISTORY.MAX_LENGTH) {
        const num = results.length - SEARCH_HISTORY.MAX_LENGTH;
        results.splice(results.length - num, num);
      }
      setResults(results.slice());
      saveResults();
    }
  };

  const removeResult = (remove: string) => {
    const ind = results.indexOf(remove);
    if (ind >= 0) {
      // We have it
      results.splice(ind, 1);
      setResults(results.slice());
      saveResults();
    }
  };

  const clickResult = (clicked: string) => {
    const ind = results.indexOf(clicked);
    if (ind >= 0) {
      const ret = results.splice(ind, 1)[0];
      results.unshift(ret);
      setResults(results.slice());
      saveResults();
    }
  };
  return (
    <SearchHistoryResultsContext.Provider value={results}>
      <SearchHistoryUpdateContext.Provider
        value={[addResult, removeResult, clickResult]}
      >
        {props.children}
      </SearchHistoryUpdateContext.Provider>
    </SearchHistoryResultsContext.Provider>
  );
};

export {
  SearchHistoryProvider,
  SearchHistoryResultsContext,
  SearchHistoryUpdateContext,
};
