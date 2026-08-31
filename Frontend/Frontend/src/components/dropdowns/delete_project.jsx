import { Button, Modal } from "@heroui/react";
import { useState,useContext } from "react";
import axios from "axios";
import { FetchProjects } from "../sidebar/fetchproject";
import fileContext from "../../context/FileContext";


export function Delete_project() {
  const [formData, setFormData] = useState({
    project_name: "",
  });
  const {setProjects} = useContext(fileContext)
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

      await axios.delete(
        "http://127.0.0.1:8000/delete_project",
        {
          params: {
            project_name: formData.project_name,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      FetchProjects(setProjects)
      alert("Project Deleted Successfully");
    } catch (error) {
      if (error.response?.status === 409) {
        alert("This project contains files and cannot be deleted.");
        return;
      }
      alert("This Project does not exist");
      console.error(error);
    }


  };

  return (
    <Modal>
      {/* Delete button */}
      <div className="px-3 py-3">
        <Button
          className="
            w-full
            rounded-xl
            border border-gray-800
            bg-[#11161d]
            text-sm
            font-medium
            text-gray-400
            transition
            duration-300
            hover:border-red-500/40
            hover:bg-red-500/10
            hover:text-red-400
          "
        >
          Delete Project
        </Button>
      </div>

      <Modal.Backdrop className="bg-black/70 backdrop-blur-sm">
        <Modal.Container>
          <Modal.Dialog
            className="
              w-full
              max-w-md
              rounded-2xl
              border border-gray-800
              bg-[#0d1117]
              shadow-2xl
            "
          >
            <Modal.CloseTrigger />

            <Modal.Header className="border-b border-gray-800 px-6 py-4">
              <Modal.Heading className="text-lg font-semibold text-white">
                Delete Project
              </Modal.Heading>

              <p className="mt-1 text-sm text-gray-500">
                Enter the project name to delete it.
              </p>
            </Modal.Header>

            <Modal.Body className="px-6 py-5">
              <form onSubmit={handleSubmit} className="space-y-5">
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
                    value={formData.project_name}
                    onChange={handleChange}
                    type="text"
                    required
                    placeholder="Enter project name"
                    className="
                      w-full
                      rounded-xl
                      border border-gray-800
                      bg-[#11161d]
                      px-4 py-2.5
                      text-sm text-white
                      placeholder:text-gray-600
                      outline-none
                      transition
                      duration-300
                      focus:border-blue-500
                      focus:ring-1
                      focus:ring-blue-500/30
                    "
                  />
                </div>

                <Button
                  className="
                    w-full
                    rounded-xl
                    bg-red-500/10
                    border border-red-500/20
                    py-2.5
                    text-sm
                    font-medium
                    text-red-400
                    transition
                    duration-300
                    hover:bg-red-500/20
                    hover:border-red-500/40
                  "
                  slot="close"
                  type="submit"
                >
                  Delete Project
                </Button>
              </form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}