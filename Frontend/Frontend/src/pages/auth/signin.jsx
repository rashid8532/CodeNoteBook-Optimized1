import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";

export default function Signin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const data = new URLSearchParams();

  data.append("username", formData.username);
  data.append("password", formData.password);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/signin",
        data
      );


      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user_id", response.data.user_id);


      alert("Signin Successful");

      navigate("/editor");
    } catch (error) {
      alert("something is wrong check username or password");

    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#05070b] px-6 py-12">

      {/* Background glow */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Sign in card */}
      <div
        className="
          relative
          w-full
          max-w-md
          rounded-3xl
          border
          border-gray-800
          bg-[#0d1117]
          p-8
          shadow-2xl
          shadow-black/40
          sm:p-10
        "
      >

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img
            src={logo}
            alt="CodeNoteBook"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-blue-400">
            Welcome back
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            Sign in
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to continue to your coding workspace.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-gray-400"
            >
              Username
            </label>

            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              autoComplete="username"
              placeholder="Enter your username"
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

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-400"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              placeholder="Enter your password"
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

          {/* Sign in */}
          <button
            type="submit"
            className="
              w-full
              rounded-xl
              bg-linear-to-r
              from-blue-600
              to-cyan-500
              px-4
              py-3
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-blue-500/20
              transition
              duration-300
              hover:from-blue-500
              hover:to-cyan-400
              hover:shadow-blue-500/30
              active:scale-[0.99]
            "
          >
            Sign in
          </button>

        </form>

        {/* Footer */}
        <div className="mt-8 border-t border-gray-800 pt-6 text-center">
          <p className="text-xs text-gray-600">
            CodeNoteBook · Your coding workspace
          </p>
        </div>

      </div>
    </div>
  );
}