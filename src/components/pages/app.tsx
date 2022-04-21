import { FunctionalComponent, h } from "preact";
import { LocationProvider } from "../context/location";
import { SearchProvider } from "../context/search";
import { SearchHistoryProvider } from "../context/searchHistory";
import { ModalProvider } from "../context/modal";
import { MessageListener } from "../elements/MessageListener";

import Header from "./header";
import Body from "./body";

const App: FunctionalComponent = () => {
  return (
    <div id="preact_root">
        <ModalProvider>
          <LocationProvider>
            <SearchProvider>
              <SearchHistoryProvider>
                <div id="main_app">
                  <div className="w-screen h-screen overflow-auto flex flex-col">
                    <Header />
                    <Body />
                    <MessageListener />
                  </div>
                </div>
              </SearchHistoryProvider>
            </SearchProvider>
          </LocationProvider>
        </ModalProvider>
    </div>
  );
};

export default App;
