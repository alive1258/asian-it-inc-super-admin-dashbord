import JoditEditor from "jodit-react";
import React, { useMemo, useRef } from "react";
const TextEditor = ({ content, setContent }) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    }),
    []
  );

  return (
    <>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        className="text-black-base bg-black-base"
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      />
    </>
  );
};

export default TextEditor;
