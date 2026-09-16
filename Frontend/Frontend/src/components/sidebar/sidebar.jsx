import { useEffect, useContext } from "react";
import axios from "axios";
import ProjectItem from "./projectItems";
import { Create_new_project } from "../dropdowns/new_project";
import fileContext from "../../context/FileContext";
import { Delete_project } from "../dropdowns/delete_project";
import { FetchProjects } from "./fetchproject";

export default function Sidebar() {
const { projects, setProjects, selectedFile, setSelectedFile } = useContext(fileContext);

  useEffect(() => {
    FetchProjects(setProjects);
  }, []);

  return (
    <aside className="flex h-full w-64 flex-col border-r border-gray-800 bg-[#0d1117] text-white">

      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b border-gray-800 px-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-blue-400">
            Explorer
          </p>
        </div>

        <Create_new_project />
      </div>

      {/* Projects */}
      <div className="flex-1 overflow-y-auto p-2">
        {projects.map((project) => (
          <ProjectItem
            key={project.id}
            project={project}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
        ))}
      </div>

      {/* Delete */}
      <div className="border-t border-gray-800 p-3">
        <Delete_project />
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 px-4 py-3">
        <span className="text-xs text-gray-500">
          {projects.length} {projects.length === 1 ? "Project" : "Projects"}
        </span>
      </div>

    </aside>
  );
}