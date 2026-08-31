import { Delete_file } from "../dropdowns/delete_file";

export default function FileItem({
  file,
  project_name,
  projectId,
  selectedFile,
  setSelectedFile,
  setFileName,
  project,
  refreshFiles
}) {
  return (
    <div className="flex items-center">

      {/* File */}
      <button
        onClick={() => {
          setSelectedFile(file.id);
          setFileName(file.file_name);
        }}
        className={`flex flex-1 items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition
          ${
            selectedFile === file.id
              ? "bg-blue-500/10 text-blue-400"
              : "text-gray-400 hover:bg-[#11161d] hover:text-white"
          }`}
      >
        <span className="text-sm">📄</span>

        <span className="truncate">
          {file.file_name}
        </span>
      </button>

      {/* Delete */}
      <div className="px-2">
        <Delete_file
          FileName={file.file_name}
          projectId={projectId}
          project={project}
          refreshFiles={refreshFiles}
        />
      </div>

    </div>
  );
}