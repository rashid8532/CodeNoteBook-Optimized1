import { useContext, useState } from "react";
import axios from "axios";
import { Create_new_file } from "../dropdowns/new_file";
import FileItem from "./fileItems";
import fileContext from "../../context/FileContext";

export default function ProjectItem({ project, selectedFile }) {
  const {
    setSelectedFile,
    setFileName,
  } = useContext(fileContext);

  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);

  // Fetch files belonging to THIS project
  const fetchProjectFiles = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://127.0.0.1:8000/get_files?project_id=${project.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFiles(response.data);
      setOpen(true);

    } catch (error) {
      console.log(error);
    }
  };

  const toggleProject = async () => {
    if (open) {
      setOpen(false);
      return;
    }

    await fetchProjectFiles();
  };

  return (
    <div>

      {/* Project */}
      <div className="flex items-center rounded-lg hover:bg-[#11161d]">

        <button
          onClick={toggleProject}
          className="flex flex-1 items-center gap-2 px-3 py-2 text-left text-sm text-gray-300 transition hover:text-white"
        >

          <span className="w-3 text-xs text-gray-500">
            {open ? "▼" : "▶"}
          </span>

          <span className="text-blue-400">
            📁
          </span>

          <span className="truncate font-medium">
            {project.project_name}
          </span>

        </button>

        <div className="px-2">

          <Create_new_file
            projectId={project.id}
            project={project}
            refreshFiles={fetchProjectFiles}
          />

        </div>

      </div>

      {/* Files */}
      {open && (
        <div className="ml-5 border-l border-gray-800 pl-2">

          {files.map((file) => (
            <FileItem
              key={file.id}
              file={file}
              project_name={project.project_name}
              projectId={project.id}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              setFileName={setFileName}
              project={project}
              refreshFiles={fetchProjectFiles}
            />
          ))}

        </div>
      )}

    </div>
  );
}