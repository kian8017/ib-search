import { h, FunctionalComponent } from "preact";

interface ResultMessageProps {
  message: string;
}

const ResultMessage: FunctionalComponent<ResultMessageProps> = (
  props: ResultMessageProps
) => {
  return (
    <div className="bg-sky-400 rounded-lg shadow-md p-2 text-center">
      {props.message}
    </div>
  );
};

export default ResultMessage;
