import { h, createContext, FunctionalComponent, VNode } from "preact";
import { useState } from "preact/hooks";
import IntroModal from "../modals/introModal";

const ModalContext = createContext((s: ModalType) => {});

type ModalType = "intro" | "";

const getModalByName = (n: ModalType, dc: () => void) => {
  switch (n) {
    case "intro":
      return <IntroModal closeDialog={dc} />;
    case "":
      return null;
  }
};

const ModalProvider: FunctionalComponent = (props) => {
  const [inner, setInner] = useState(null as VNode<any> | null);

  const defaultClose = () => setInner(null);

  const setModal = (n: ModalType) => {
    setInner(getModalByName(n, defaultClose));
  };

  return (
    <ModalContext.Provider value={setModal}>
      {props.children}
      {inner}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
