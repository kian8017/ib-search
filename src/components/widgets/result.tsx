import { h, FunctionalComponent, Fragment } from "preact";
import { useState } from "preact/hooks";
import { SearchEntry } from "../context/search";
import { ColumnDivider } from "../elements/columns";
import { SmallClipboardIcon } from "../elements/icons";

interface ResultProps {
  extended: boolean;
  entry: SearchEntry;
}

const Result: FunctionalComponent<ResultProps> = (props: ResultProps) => {
  const entry = props.entry.name.trim();

  const [message, setMessage] = useState("");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(entry).then(
      () => {
        setMessage("Copied");
      },
      () => {
        setMessage("Failed to copy");
      }
    );
  };
  return (
    <div className="flex bg-white rounded-lg shadow-md p-2">
      {props.extended && (
        <Fragment>
          <p>{props.entry.location.name}</p>
          <ColumnDivider className="mx-2" />
        </Fragment>
      )}
      <p className="flex-grow">{entry}</p>
      {message !== "" && <span>{message}</span>}
      <SmallClipboardIcon className="h-6 w-6" onClick={copyToClipboard} />
    </div>
  );
};
export default Result;
