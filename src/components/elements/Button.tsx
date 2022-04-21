import { h } from "preact";
import { PropsWithChildren } from "../helpers/helper";

interface ButtonProps extends PropsWithChildren {
  onClick: h.JSX.MouseEventHandler<HTMLButtonElement>;
}

export function PrimaryButton(props: ButtonProps) {
  return (
    <button
      className={`bg-sky-500 p-2 rounded-md shadow-md hover:bg-sky-400 active:bg-sky-300 text-center`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export function SecondaryButton(props: ButtonProps) {
  return (
    <button
      className={`bg-slate-500 p-2 rounded-md shadow-md hover:bg-slate-400 active:bg-slate-300 text-center`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
