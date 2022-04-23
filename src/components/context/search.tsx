import { h, createContext, FunctionalComponent } from "preact";
import { useRef, useState } from "preact/hooks";
import toast from "react-hot-toast";
import { Location } from "./location";
import { API_URL, MAX_RESULTS, MT } from "../../style/consts";
import { SmallClearIcon } from "../elements/icons";
import { useUserId } from "../hooks/useUserId";

export type SearchType = "specific" | "fallback" | "extended";

interface SearchEntry {
  name: string;
  type: string;
  location: Location;
}

interface JsonError {
  error: string;
}

type SearchResult = [SearchEntry[], SearchEntry[], SearchEntry[], string[]]; // specific, fallback, extended results, messages

type SearchFuncType = (query: string, loc: string, type: SearchType) => void;

interface SearchButton {
  search: SearchFuncType;
  clear: () => void;
}

const TOAST_ID = "searchToastId"; // FIXME

const formatNumber = (num: number) => {
  // From https://github.com/component/humanize-number
  let n = num.toString().split(".");
  n[0] = n[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + ",");
  return n.join(".");
};

interface Counts {
  specific: number;
  fallback: number;
  extended: number;
}

const GetCounts = async (loc: string, typ: SearchType): Promise<Counts> => {
  let response = await fetch(
    `${API_URL}/counts?location=${loc}&entry_type=${typ}`
  );
  return (await response.json()) as Counts;
};

const sayCount = (typ: SearchType, count: number, clear: () => void) => {
  let num = formatNumber(count);
  let text = "";
  switch (typ) {
    case "specific":
      text = `Loading search results (searching through ${num} characters)`;
      break;
    case "fallback":
      text = `Loading search results from related locations (searching through ${num} characters)`;
      break;
    case "extended":
      text = `Loading search results from everywhere else (searching through ${num} characters)`;
      break;
  }

  toast.loading(
    <div style="display: flex;">
      <span>{text}</span>
      <SmallClearIcon onClick={clear} />
    </div>,
    {
      id: TOAST_ID,
    }
  );
};

interface CouldBe {
  key: string;
  val: string;
}

const FormatCouldBe = (cb: CouldBe): string => {
  let placement = "contains";
  let actualText = cb.key;

  if (cb.key.startsWith("^")) {
    placement = "starts with";
    actualText = actualText.substring(1);
  }

  return `Your search ${placement} "${actualText}" which, depending on the handwriting, could actually be "${cb.val}". Try your search with "${cb.val}" if you aren't seeing the results you need.`;
};

const GetCouldBes = async (query: string) => {
  let response = await fetch(`${API_URL}/couldbes?query=${query}`);
  let cbs = (await response.json()) as CouldBe[];
  return cbs.map((cb) => FormatCouldBe(cb));
};

const searchHelper = async (
  searchTyp: SearchType,
  query: string,
  loc: string,
  type: string,
  userId: string
): Promise<[SearchEntry[], string]> => {
  let response = await fetch(
    `${API_URL}/search?type=${searchTyp}&location=${loc}&entry_type=${type}&query=${encodeURIComponent(
      query
    )}&user_id=${userId}`
  );
  let body = await response.json();
  if (response.status !== 200) {
    return [[] as SearchEntry[], (body as JsonError).error];
  }

  return [body as SearchEntry[], ""];
};

const SearchResultsContext = createContext({} as SearchResult);
const SearchButtonContext = createContext({} as SearchButton);

const SearchProvider: FunctionalComponent = (props) => {
  const userId = useUserId();
  const [results, setResults] = useState([] as SearchEntry[]);
  const [fallbackResults, setFallbackResults] = useState([] as SearchEntry[]);
  const [extendedResults, setExtendedResults] = useState([] as SearchEntry[]);
  const [couldBes, setCouldBes] = useState([] as string[]);

  const search: SearchFuncType = async (
    query: string,
    loc: string,
    type: SearchType
  ) => {
    setResults([]);
    setFallbackResults([]);
    setExtendedResults([]);
    setCouldBes([]);

    setCouldBes(await GetCouldBes(query));
    let counts = await GetCounts(loc, type);

    // start specific count
    sayCount("specific", counts.specific, clear);
    let [specificResults, err] = await searchHelper(
      "specific",
      query,
      loc,
      type,
      userId
    );

    if (err !== "") {
      switch (err) {
        case "invalid query":
          toast.error(
            "Invalid query. Please check your search and try again.",
            { id: TOAST_ID }
          );
          break;
        default: // make sure we don't leave that toast just hanging there.
          console.error("unhandled search error", err);
          toast.dismiss(TOAST_ID);
          break;
      }
      return;
    }
    let fallbackResults = [] as SearchEntry[];
    let extendedResults = [] as SearchEntry[];
    setResults(specificResults);

    if (specificResults.length < MAX_RESULTS) {
      sayCount("fallback", counts.fallback, clear);
      [fallbackResults] = await searchHelper(
        "fallback",
        query,
        loc,
        type,
        userId
      );
      setFallbackResults(fallbackResults);
    }

    if (specificResults.length + fallbackResults.length < MAX_RESULTS) {
      sayCount("extended", counts.extended, clear);
      [extendedResults] = await searchHelper(
        "extended",
        query,
        loc,
        type,
        userId
      );
      setExtendedResults(extendedResults);
    }

    if (
      specificResults.length + fallbackResults.length + extendedResults.length >
      0
    ) {
      toast.success("Finished loading results.", { id: TOAST_ID });
    } else {
      toast.error("No results. Please check your search and try again.", {
        id: TOAST_ID,
      });
    }
  };

  const clear = () => {
    // cancel search
    toast.dismiss(TOAST_ID);
    setResults([]);
    setFallbackResults([]);
    setExtendedResults([]);
    setCouldBes([]);
  };

  return (
    <SearchButtonContext.Provider
      value={
        {
          search: search,
          clear: clear,
        } as SearchButton
      }
    >
      <SearchResultsContext.Provider
        value={
          [results, fallbackResults, extendedResults, couldBes] as SearchResult
        }
      >
        {props.children}
      </SearchResultsContext.Provider>
    </SearchButtonContext.Provider>
  );
};

export {
  SearchEntry,
  SearchProvider,
  SearchButtonContext,
  SearchResultsContext,
};
