import { FunctionalComponent, h } from "preact";
import { useState, useContext } from "preact/hooks";
import {
  SearchHistoryResultsContext,
  SearchHistoryUpdateContext,
} from "../context/searchHistory";

import QueryHelp from "./queryHelp";
import { ColumnDivider } from "../elements/columns";
import { SmallClearIcon } from "../elements/icons";

interface QueryDropdownProps {
  show: boolean;
  setQuery: (q: string) => void;
}

const QueryDropdown: FunctionalComponent<QueryDropdownProps> = (
  props: QueryDropdownProps
) => {
  const searchHistory = useContext(SearchHistoryResultsContext);
  const [, removeSearchHistory] = useContext(SearchHistoryUpdateContext);

  const [showSearchHistory, setShowSearchHistory] = useState(true);

  const formattedSearchHistory = searchHistory.map((e) => (
    <div
      className="flex p-2 justify-between hover:bg-slate-300 active:bg-slate-400 border-b"
      onClick={() => {
        props.setQuery(e);
      }}
    >
      <p>{e}</p>
      <SmallClearIcon
        onClick={(ev: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
          ev.stopPropagation();
          removeSearchHistory(e);
        }}
      />
    </div>
  ));

  const helpText =
    searchHistory.length > 0 ? "Search history:" : "No search history";

  const tab = showSearchHistory ? formattedSearchHistory : QueryHelp;

  const activeTabStyle = (isSearchHistoryTab: boolean) => {
    if (
      (isSearchHistoryTab && showSearchHistory) ||
      (!isSearchHistoryTab && !showSearchHistory)
    ) {
      return "bg-sky-200";
    } else {
      return "";
    }
  };

  return (
    <div className="bg-white hidden group-hover:block group-focus-within:block lg:absolute lg:top-9 lg:inset-x-0">
      <div className="flex border-2">
        <div
          className={
            "basis-1/2 text-center p-1 hover:bg-slate-300 active:bg-slate-400 " +
            activeTabStyle(true)
          }
          onClick={() => setShowSearchHistory(true)}
        >
          {helpText}
        </div>
        <ColumnDivider />
        <div
          className={
            "basis-1/2 text-center p-1 hover:bg-slate-300 active:bg-slate-400 " +
            activeTabStyle(false)
          }
          onClick={() => setShowSearchHistory(false)}
        >
          Help
        </div>
      </div>
      {tab}
    </div>
  );
};

export default QueryDropdown;
