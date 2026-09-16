import { Button, Modal } from "@heroui/react";
import { useContext, useState } from "react";
import axios from "axios";
import fileContext from "../../context/FileContext";
import { FetchProjects } from "../sidebar/fetchproject";

export function Create_new_project() {
  const [formData, setFormData] = useState({
    project_name: "",
    description: "",
  });
  const{setProjects} = useContext(fileContext)

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:8000/new_project",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      FetchProjects(setProjects)
      alert("Project Created Successfuly");
    } catch (error) {
      alert("something went wrong this cant be save");
      console.error(error);
    }
  };

  return (
    <Modal>
      {/* Trigger */}
      <div className="flex items-center">
        <Button
          className="
            rounded-xl
            border border-gray-800
            bg-[#11161d]
            px-4
            py-2
            text-sm
            font-medium
            text-gray-300
            transition
            duration-300
            hover:border-blue-500/40
            hover:bg-[#151b23]
            hover:text-white
          "
        >
          + New Project
        </Button>
      </div>

      <Modal.Backdrop className="bg-black/70 backdrop-blur-sm">
        <Modal.Container>
          <Modal.Dialog
            className="
              w-full
              max-w-md
              rounded-3xl
              border
              border-gray-800
              bg-[#0d1117]
              text-white
              shadow-2xl
              shadow-black/50
            "
          >
            <Modal.CloseTrigger />

            {/* Header */}
            <Modal.Header className="border-b border-gray-800 px-6 py-5">
              <Modal.Heading className="text-xl font-semibold text-white">
                Create New Project
              </Modal.Heading>

              <p className="mt-1 text-sm text-gray-500">
                Create a new workspace for your code.
              </p>
            </Modal.Header>

            {/* Form */}
            <Modal.Body className="px-6 py-6">
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Project Name */}
                <div>
                  <label
                    htmlFor="project_name"
                    className="mb-2 block text-sm font-medium text-gray-400"
                  >
                    Project Name
                  </label>

                  <input
                    id="project_name"
                    name="project_name"
                    type="text"
                    value={formData.project_name}
                    onChange={handleChange}
                    required
                    placeholder="My awesome project"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-800
                      bg-[#11161d]
                      px-4
                      py-3
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-gray-600
                      transition
                      duration-300
                      focus:border-blue-500/60
                      focus:ring-1
                      focus:ring-blue-500/20
                    "
                  />
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium text-gray-400"
                  >
                    Description
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    placeholder="What is this project about?"
                    className="
                      w-full
                      resize-none
                      rounded-xl
                      border
                      border-gray-800
                      bg-[#11161d]
                      px-4
                      py-3
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-gray-600
                      transition
                      duration-300
                      focus:border-blue-500/60
                      focus:ring-1
                      focus:ring-blue-500/20
                    "
                  />
                </div>

                {/* Create */}
                <Button
                  className="
                    w-full
                    rounded-xl
                    bg-linear-to-r
                    from-blue-600
                    to-cyan-500
                    py-3
                    font-medium
                    text-white
                    shadow-lg
                    shadow-blue-500/20
                    transition
                    duration-300
                    hover:from-blue-500
                    hover:to-cyan-400
                  "
                  slot="close"
                  type="submit"
                >
                  Create Project
                </Button>

              </form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}