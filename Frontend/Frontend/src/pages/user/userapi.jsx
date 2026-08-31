import axios from "axios"
import fileContext from "../../context/FileContext"
import { useContext } from "react"

const getUserData = async (setuser) => {
    const token = localStorage.getItem("token")
    const response = await axios.get(
        "http://127.0.0.1:8000/get_user_data",
        {
            headers: {
                      Authorization: `Bearer ${token}`
                    }
                }
            )


            setuser({
                UserName: response.data.UserName,
                FirstName: response.data.FirstName,
                LastName: response.data.LastName,
                Email: response.data.Email
            })
        }

export default getUserData;