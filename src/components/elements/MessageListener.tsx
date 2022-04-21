import { h } from "preact";
import { useEffect } from "preact/hooks";
import { API_URL } from "../../style/consts";
import toast from "react-hot-toast";

export const MessageListener = () => {
  useEffect(() => {
    fetch(`${API_URL}/message`)
      .then((r) => r.text())
      .then((r) => {
        if (r !== "") {
          toast(r)
        } else {
          console.log("No message set on server")
        }
      });
  }, []);
  return <div />;
};
