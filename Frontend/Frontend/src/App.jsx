import { useState } from 'react'
import './App.css'
import Homepage from './pages/homepage/homepage.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Signup from './pages/auth/signup.jsx'
import Signin from './pages/auth/signin.jsx'
import Editor from './pages/editor/editor.jsx'
import ProtectedRoute from './components/protected_routes.jsx'
import User from './pages/user/user.jsx'
import fileContext from './context/FileContext.jsx'



const router = createBrowserRouter(
  
  [
    
    {path : "/",
      element : <>
      <Homepage/>
      </>
    },
    {path : "/signup",
      element : <Signup/>
    },
    {path: "/signin",
      element : <Signin/>
    },
    {path: "/editor",
      element : (
        <ProtectedRoute>
          <Editor/>
        </ProtectedRoute>
      )
    },
    {
      path:"/user",
      element:(
        <ProtectedRoute>
          <User/>
        </ProtectedRoute>
      )
    }
  ]
)

function App() {
  // this const variables are for fileContexts 
  const [FileName,setFileName] = useState("")
  const [selectedFile, setSelectedFile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [user, setuser] = useState({
          UserName: "",
          FirstName: "",
          LastName: "",
          Email: ""
      })
  const [content, setcontent] = useState("");
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);



  return (
    <>
    <fileContext.Provider
      value={
        {
          FileName,
          setFileName,

          selectedFile,
          setSelectedFile,

          projects,
          setProjects,

          user,
          setuser,

          content,
          setcontent,

          files,
          setFiles,

          open,
          setOpen
        }
      }
    >
    {/* <Homepage/> */}
    <RouterProvider router={router}/>
    </fileContext.Provider>
    </>
  )
}

export default App
