import { createRef, FunctionalComponent, h } from "preact";
import { useContext, useState } from "preact/hooks";
import { LocationContext } from "../context/location";
import { SearchButtonContext } from "../context/search";
import { SearchHistoryUpdateContext } from "../context/searchHistory";
import { ModalContext } from "../context/modal";
import Select, { SingleValue } from "react-select";
import toast from "react-hot-toast";

import { EventTargetWithValue } from "../helpers/helper";
import QueryDropdown from "../widgets/queryDropdown";
import { ColumnDivider } from "../elements/columns";
import {
  MediumClearIcon,
  MediumMenuIcon,
  MediumSearchIcon,
} from "../elements/icons";

const useFocus = () => {
  // From https://stackoverflow.com/questions/28889826/how-to-set-focus-on-an-input-field-after-rendering
  // and https://gist.github.com/carpben/de968e377cbac0ffbdefe1ab56237573
  const htmlElRef = createRef<HTMLInputElement>();
  const setFocus = () => {
    const currentEl = htmlElRef.current;
    currentEl && currentEl.focus();
  };
  return [htmlElRef, setFocus] as const;
};

interface SelectOption {
  value: string;
  label: string;
}

const NAME_TYPES: SelectOption[] = [
  { value: "name", label: "Names" },
  { value: "place", label: "Places" },
  { value: "other", label: "Other" },
];

const Header: FunctionalComponent = () => {
  const [inputRef, setInputFocus] = useFocus(); // To auto focus on query input after clicking 'X'
  const search = useContext(SearchButtonContext);
  const locations = useContext(LocationContext);
  const setModal = useContext(ModalContext);
  const [addSearchHistory, , clickSearchHistory] = useContext(
    SearchHistoryUpdateContext
  );

  // Query
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState(null as SingleValue<SelectOption>);
  const [type, setType] = useState(null as SingleValue<SelectOption>);
  // Dropdown
  const [queryFocused, setQueryFocused] = useState(false);
  const [mousedOver, setMousedOver] = useState(false);

  const formattedLocations = locations.map((c) => {
    return { value: c.abbr, label: c.name } as SelectOption;
  });

  const changeQuery = (q: string) => {
    setQuery(q);
    if (q === "") {
      search.clear();
    }
  };

  const clearQuery = () => {
    setQuery("");
    search.clear();
  };

  const searchHistoryClicked = (q: string) => {
    clickSearchHistory(q);
    changeQuery(q);
    if (location !== null && type !== null) {
      search.search(q, location.value, type.value);
    }
  };

  const submitSearch = () => {
    let c = location === null ? "" : location.value;
    let t = type === null ? "" : type.value;

    if (c === "") {
      toast.error("Please enter a location");
    } else if (t === "") {
      toast.error("Please enter a type");
    } else if (query === "") {
      toast.error("Please enter a query");
    } else {
      addSearchHistory(query);
      search.search(query, c, t);
    }
  };

  const checkKey = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      submitSearch();
    } else if (e.key === "Escape") {
      clearQuery();
    }
  };

  return (
    <div className="bg-sky-400 flex flex-wrap items-center z-10 shadow-md">
      <h1 className="mx-1 text-2xl font-bold basis-2/3 grow -order-1 sm:basis-auto sm:grow-0">
        IndexBrain
      </h1>
      <Select<SelectOption>
        className="m-1 basis-1/2 grow sm:-order-1 sm:basis-auto lg:grow-0 lg:basis-60"
        placeholder="Location..."
        options={formattedLocations}
        onChange={(e) => setLocation(e)}
        value={location}
      />
      <Select<SelectOption>
        className="m-1 basis-1/3 sm:-order-1 sm:basis-auto"
        placeholder="Type..."
        options={NAME_TYPES}
        onChange={(e) => setType(e)}
        value={type}
      />
      <div
        className="m-1 bg-white basis-full group border-gray rounded-sm lg:-order-1 lg:basis-auto lg:grow lg:relative"
        onMouseEnter={() => setMousedOver(true)}
        onMouseLeave={() => setMousedOver(false)}
      >
        <div className="flex">
          <input
            className="bg-transparent grow shrink px-3"
            type="text"
            placeholder="Search..."
            onChange={(e) =>
              changeQuery((e.target as EventTargetWithValue).value)
            }
            value={query}
            onKeyDown={checkKey}
            onFocus={() => setQueryFocused(true)}
            onBlur={() => setQueryFocused(false)}
            ref={inputRef}
          />
          <MediumClearIcon
            onClick={() => {
              setInputFocus();
              clearQuery();
            }}
          />
          <ColumnDivider />
          <MediumSearchIcon onClick={submitSearch} />
        </div>
        <QueryDropdown
          show={queryFocused || mousedOver}
          setQuery={searchHistoryClicked}
        />
      </div>
      <MediumMenuIcon
        className="mx-1 -order-1"
        onClick={() => setModal("intro")}
      />
    </div>
  );
};

export default Header;