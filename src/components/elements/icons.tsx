import { h } from "preact";
import { cn, PropsWithClassname } from "../helpers/helper";
import {
  XIcon,
  ClipboardCopyIcon,
  MenuIcon,
  SearchIcon,
} from "@heroicons/react/outline";

interface IconProps extends PropsWithClassname {
  onClick: React.MouseEventHandler<SVGSVGElement>;
}

const SMALL_SIZE = "h-6 w-6 ";
const MEDIUM_SIZE = "h-9 w-9 ";
const INTERACT = "cursor-pointer hover:stroke-sky-600 active:stroke-sky-300 ";

export const SmallClearIcon = (props: IconProps) => (
  <XIcon
    className={SMALL_SIZE + INTERACT + cn(props.className)}
    onClick={props.onClick}
  />
);

export const SmallClipboardIcon = (props: IconProps) => (
  <ClipboardCopyIcon
    className={SMALL_SIZE + INTERACT + cn(props.className)}
    onClick={props.onClick}
  />
);

export const MediumClearIcon = (props: IconProps) => (
  <XIcon
    className={MEDIUM_SIZE + INTERACT + cn(props.className)}
    onClick={props.onClick}
  />
);

export const MediumClipboardIcon = (props: IconProps) => (
  <ClipboardCopyIcon
    className={MEDIUM_SIZE + INTERACT + cn(props.className)}
    onClick={props.onClick}
  />
);

export const MediumMenuIcon = (props: IconProps) => (
  <MenuIcon
    className={MEDIUM_SIZE + INTERACT + cn(props.className)}
    onClick={props.onClick}
  />
);

export const MediumSearchIcon = (props: IconProps) => (
  <SearchIcon
    className={MEDIUM_SIZE + INTERACT + cn(props.className)}
    onClick={props.onClick}
  />
);
