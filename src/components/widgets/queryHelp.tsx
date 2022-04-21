import { h } from "preact";
import { A } from "../elements/A";
import { Code } from "../elements/Code";
import { RowDivider } from "../elements/columns";

const QueryTab = (
  <div className="p-2">
    <p>
      The IndexBrain uses a tweaked version of regular expressions, called
      BrainSpell, to enable you to search for names most effectively.
    </p>
    <p>
      If you don't know how to use BrainSpell, please refer back to{" "}
      <A href="#">the lessons</A> to get started! If you just need a refresher,
      here's a list of the most common search terms:
    </p>
    <RowDivider />
    <p>
      Use <Code>^</Code> and <Code>$</Code> to match the beginning and end of
      the line, respectively.
    </p>
    <p>
      <strong>^test$</strong> matches <strong>test</strong> and only{" "}
      <strong>test</strong>.
    </p>
    <RowDivider />
    <p>
      <Code>*</Code> matches zero or more of the previous character. For
      example, <strong>abc*</strong> matches <strong>ab</strong> followed by 0
      or more of the letter <strong>c</strong>.
    </p>
    <RowDivider />
    <p>
      <Code>+</Code> is similar, but only matches one or more of the previous
      character. <strong>abc+</strong> matches <strong>ab</strong> with 1 or
      more <strong>c</strong>, but not just <strong>ab</strong>.
    </p>
    <RowDivider />
    <p>
      <Code>?</Code> works on the same principle, but only matches 0 or 1 of the
      previous character. <strong>abc?</strong> only matches <strong>ab</strong>{" "}
      or <strong>abc</strong>.
    </p>
  </div>
);

export default QueryTab;
