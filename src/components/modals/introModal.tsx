import { FunctionalComponent, h } from "preact";
import { PrimaryButton, SecondaryButton } from "../elements/Button";
import { RowDivider } from "../elements/columns";
import Modal, { SubModalProps } from "../elements/Modal";

const IntroModal: FunctionalComponent<SubModalProps> = (
  props: SubModalProps
) => {
  return (
    <Modal closeDialog={props.closeDialog} title="Welcome to IndexBrain!">
      <p>
        The IndexBrain is designed to help you with finding names for genealogy.
      </p>
      <p>Other description goes here.</p>
      <PrimaryButton onClick={props.closeDialog}>
        Let's get started!
      </PrimaryButton>
    </Modal>
  );
};

export default IntroModal;
