import React, { useState } from "react";
import { executeCode } from "./outputAPI";

function Output({ editorRef, selectedLanguage }) {
  const [output, setoutput] = useState("");

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();

    if (!sourceCode) return;

    try {
      const result = await executeCode(selectedLanguage, sourceCode);

      setoutput(
        result.stdout ||
        result.stderr ||
        result.compile_output ||
        result.message ||
        ""
      );
    } catch {
      alert("this is not working");
    }
  };

  return (
    <div className="h-76 border-t border-gray-800 bg-[#05070b] text-white">

      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b border-gray-800 px-4">

        <span className="text-sm font-medium text-gray-400">
          Output
        </span>

        <button
          onClick={runCode}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 active:scale-95"
        >
          Run Code
        </button>

      </div>

      {/* Output */}
      <div className="h-[calc(100%-56px)] overflow-auto bg-[#0d1117] p-4">
        <pre className="whitespace-pre-wrap wrap-break-word font-mono text-sm text-green-400">
          {output || "Output will appear here..."}
        </pre>
      </div>

    </div>
  );
}

export default Output;