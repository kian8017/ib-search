import { h } from "preact";
import { PropsWithChildren } from "../helpers/helper";

interface aProps extends PropsWithChildren {
  href: string;
}

export const A = (props: aProps) => {
  return (
    <a
      className="underline decoration-2 font-medium text-sky-600 active:text-sky-800"
      href={props.href}
    >
      {props.children}
    </a>
  );
};
