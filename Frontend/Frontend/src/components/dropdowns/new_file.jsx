import { Button, Modal } from "@heroui/react";
import { useState } from "react";
import axios from "axios";

export function Create_new_file({
  projectId,
  project,
  refreshFiles,
}) {

  const [formData, setFormData] = useState({
    file_name: "",
    project_id: projectId,
  });

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

      await axios.post(
        "http://127.0.0.1:8000/create_file",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`File ${formData.file_name} created successfully`);

      // Refresh ONLY this project's files
      await refreshFiles();

      // Clear input
      setFormData({
        file_name: "",
        project_id: projectId,
      });

    } catch (error) {

      alert("Something went wrong. This file can't be saved.");

      console.error(error);
    }
  };

  return (
    <Modal>

      {/* Trigger */}
      <Button
        className="
          h-8
          w-8
          rounded-lg
          border
          border-gray-800
          bg-[#11161d]
          p-0
          text-lg
          font-medium
          text-gray-400
          transition
          duration-300
          hover:border-blue-500/40
          hover:bg-[#151b23]
          hover:text-blue-400
        "
      >
        +
      </Button>

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
                Create New File
              </Modal.Heading>

              <p className="mt-1 text-sm text-gray-500">
                Add a new file to this project.
              </p>

            </Modal.Header>

            {/* Body */}
            <Modal.Body className="px-6 py-6">

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                <div>

                  <label
                    htmlFor="file_name"
                    className="mb-2 block text-sm font-medium text-gray-400"
                  >
                    File Name
                  </label>

                  <input
                    id="file_name"
                    name="file_name"
                    type="text"
                    value={formData.file_name}
                    onChange={handleChange}
                    required
                    placeholder="example.py"
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
                  Create File
                </Button>

              </form>

            </Modal.Body>

          </Modal.Dialog>

        </Modal.Container>

      </Modal.Backdrop>

    </Modal>
  );
}