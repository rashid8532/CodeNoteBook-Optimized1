import { Button, Modal } from "@heroui/react";
import axios from "axios";

export function Delete_file({
  FileName,
  project,
  refreshFiles,
}) {

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        "http://127.0.0.1:8000/delete_file",
        {
          params: {
            file_name: FileName,
          },

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("File deleted successfully");

      // Refresh ONLY this project's files
      await refreshFiles();

    } catch (error) {

      alert(
        "Something went wrong. This file can't be deleted."
      );

      console.error(error);
    }
  };

  return (
    <Modal>

      {/* Delete button */}
      <Button
        className="
          h-7
          min-w-7
          rounded-lg
          bg-transparent
          px-2
          text-gray-600
          transition
          hover:bg-red-500/10
          hover:text-red-400
        "
      >
        ×
      </Button>

      <Modal.Backdrop>

        <Modal.Container>

          <Modal.Dialog
            className="
              w-full
              max-w-sm
              rounded-2xl
              border
              border-gray-800
              bg-[#0d1117]
              text-white
              shadow-2xl
            "
          >

            <Modal.CloseTrigger />

            <Modal.Header>

              <Modal.Heading className="text-lg font-semibold text-white">
                Delete File
              </Modal.Heading>

            </Modal.Header>

            <Modal.Body>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                <p className="text-sm text-gray-400">

                  Are you sure you want to delete

                  <span className="mx-1 font-medium text-blue-400">
                    {FileName}
                  </span>

                  ?

                </p>

                <p className="text-xs text-gray-600">
                  This action cannot be undone.
                </p>

                <Button
                  className="
                    w-full
                    rounded-xl
                    bg-red-600
                    py-2
                    text-sm
                    font-medium
                    text-white
                    transition
                    hover:bg-red-500
                  "
                  slot="close"
                  type="submit"
                >
                  Delete File
                </Button>

              </form>

            </Modal.Body>

          </Modal.Dialog>

        </Modal.Container>

      </Modal.Backdrop>

    </Modal>
  );
}