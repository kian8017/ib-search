import { h, FunctionalComponent } from "preact";
import { PropsWithChildren } from "../helpers/helper";
import { H1 } from "./headers";
import { MediumClearIcon } from "./icons";

interface ModalProps extends PropsWithChildren {
  title: string;
  closeDialog: () => void;
}

interface SubModalProps {
  closeDialog: () => void;
}

const Modal: FunctionalComponent<ModalProps> = (props: ModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-black/60 z-20 flex overflow-auto"
      onClick={props.closeDialog}
    >
      <div
        className="m-auto w-5/6 sm:w-2/3 lg:w-1/2 xl:w-1/3 h-auto bg-white p-2 rounded-md"
        onClick={(e: h.JSX.TargetedMouseEvent<HTMLDivElement>) =>
          e.stopPropagation()
        }
      >
        <div className="flex items-center justify-between mb-2">
          <H1>{props.title}</H1>
          <MediumClearIcon onClick={props.closeDialog} />
        </div>
        <div className="flex flex-col">{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
export { SubModalProps };
