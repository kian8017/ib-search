import { h } from "preact";
import { EventTargetWithValue } from "../helpers/helper";

interface TextInputProps {
  onChange: (contents: string) => void;
  size?: number;
  placeholder?: string;
}

const TextInput = (props: TextInputProps) => {
  const changeHandler = (evt: Event) => {
    const current = (evt.target as EventTargetWithValue).value;
    props.onChange(current);
  };
  return (
    <input
      className="border-2 rounded-md p-2 min-w-0 shrink"
      placeholder={props.placeholder}
      size={props.size}
      type="text"
      onChange={changeHandler}
    />
  );
};
export default TextInput;
