import { h } from "preact";
import { cn, PropsWithChildrenAndClassname } from "../helpers/helper";

export const H1 = (props: PropsWithChildrenAndClassname) => (
  <h2 className={"text-xl font-bold " + cn(props.className)}>
    {props.children}
  </h2>
);

export const H2 = (props: PropsWithChildrenAndClassname) => (
  <h2 className={"text-l font-bold " + cn(props.className)}>
    {props.children}
  </h2>
);
