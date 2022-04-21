import { h, Fragment, FunctionalComponent } from "preact";
import { useContext } from "preact/hooks";
import { SearchEntry, SearchResultsContext } from "../context/search";
import Result from "./result";
import ResultMessage from "./resultMessage";
import { MAX_RESULTS } from "../../style/consts";

const FALLBACK_RESULTS: string = "Results from related locations:"
const EXTENDED_RESULTS: string = "Results from all other locations:";
const NO_MORE_RESULTS: string =
  "End of results. Please refine your search to narrow down the number of results.";

const SearchResults: FunctionalComponent = () => {
  const [results, fbResults, exResults, messages] = useContext(SearchResultsContext);

  const formatEntries = (entries: SearchEntry[], ex: boolean) => {
    return entries.map((m) => {
      return <Result entry={m} extended={ex} />;
    });
  };
  const fallbackResults = results.length < MAX_RESULTS && fbResults.length > 0;
  const extendedResults = (results.length + fbResults.length) < MAX_RESULTS && exResults.length > 0;
  return (
    <div className="flex flex-col gap-2 p-2 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 2xl:mx-48">
      {messages.length > 0 &&
        messages.map((m: string) => <ResultMessage message={m} />)}
      {formatEntries(results, false)}
      {fallbackResults && (
        <Fragment>
          <ResultMessage message={FALLBACK_RESULTS} />
          {formatEntries(fbResults, true)}
        </Fragment>
      )}
      {extendedResults && (
        <Fragment>
          <ResultMessage message={EXTENDED_RESULTS} />
          {formatEntries(exResults, true)}
        </Fragment>
      )}
      {results.length + exResults.length === MAX_RESULTS && (
        <ResultMessage message={NO_MORE_RESULTS} />
      )}
    </div>
  );
};
export default SearchResults;
