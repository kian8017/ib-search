import { h } from "preact";
import { cn, PropsWithClassname } from "../helpers/helper";

export const ColumnDivider = ({ className }: PropsWithClassname) => (
  <div className={"bg-slate-300 w-px my-1 " + cn(className)} />
);

export const RowDivider = ({ className }: PropsWithClassname) => (
  <hr className={"my-2 " + cn(className)} />
);
