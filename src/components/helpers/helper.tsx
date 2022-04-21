// Helper method for classNames
export const cn = (cn: string | undefined) => (cn !== undefined ? cn : "");

export interface PropsWithChildren {
  children: string | JSX.Element | JSX.Element[];
}

export interface PropsWithClassname {
  className?: string;
}

export interface PropsWithChildrenAndClassname
  extends PropsWithChildren,
    PropsWithClassname {}

export interface EventTargetWithValue extends EventTarget {
  value: string;
}
