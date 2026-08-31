import { useContext, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import EditorBar from "./editorbar";
import fileContext from "../../context/FileContext";

function EditorArea({
  FileName,
  editorRef,
  selectedLanguage,
  setSelectedLanguage,
}) {
  const {content, setcontent} = useContext(fileContext)

  const getFileContent = async (FileName) => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "http://127.0.0.1:8000/get_files_byname",
      {
        params: {
          file_name: FileName,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  };

  useEffect(() => {
    const loadContent = async () => {
      if (!FileName) return;

      const data = await getFileContent(FileName);
      setcontent(data.file_content);
    };

    loadContent();
  }, [FileName]);

  const handleEditorMount = (editor) => {
    editorRef.current = editor;
  };

  const saveFileContent = async () => {
    const filecontent = editorRef.current.getValue();
    const token = localStorage.getItem("token");

    const response = await axios.put(
      "http://127.0.0.1:8000/update_file_content",
      null,
      {
        params: {
          file_name: FileName,
          file_updated_content: filecontent,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Data is saved now");

    return response.data;
  };

  return (
    <div className="overflow-hidden border border-gray-800 bg-[#05070b]">
      <EditorBar
        savefile={saveFileContent}
        FileName={FileName}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        editorRef={editorRef}
      />

      <div className="overflow-hidden">
        <Editor
          theme="hc-black"
          height="50vh"
          language={selectedLanguage}
          value={content}
          onMount={handleEditorMount}
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            padding: { top: 12 },
            scrollBeyondLastLine: false,
          }}
        />
      </div>
    </div>
  );
}

export default EditorArea;