import { h } from "preact";
import { PropsWithChildren } from "../helpers/helper";

export const Code = (props: PropsWithChildren) => {
  return <code className="bg-slate-300 px-1">{props.children}</code>;
};
