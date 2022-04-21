import { FunctionalComponent, h } from "preact";
import { Toaster } from "react-hot-toast";
import SearchResults from "../widgets/searchResults";

const style: React.CSSProperties = {
  fontSize: 24,
}

const Body: FunctionalComponent = () => {
  return (
    <div className="grow bg-slate-300">
      <SearchResults />
      <Toaster position="bottom-center" toastOptions={{
        blank: {
          duration: 8000,
          style: style,
        },
        success: {
          duration: 4000,
          style: style,
        },
        error: {
          duration: 8000,
          style: style,
        },
        loading: {
          style: style,
        },
      }} />
    </div>
  );
};
export default Body;
