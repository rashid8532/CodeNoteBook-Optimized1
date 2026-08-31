import axios from "axios";
export const FetchProjects = async (setProjects) => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://127.0.0.1:8000/get_projects",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProjects(response.data);
      } catch (error) {
        console.log(error);
      }
    };