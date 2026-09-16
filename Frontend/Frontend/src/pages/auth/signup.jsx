import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./logo.png";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
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
      const response = await axios.post(
        "http://127.0.0.1:8000/signup",
        formData
      );

      alert("Signup Successful");
      navigate("/signin");
    } catch (error) {
      if(error.response?.status === 409){
        alert("write down the Valid email")
      }
      console.log(error.response?.data);
      console.error(error);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#05070b] px-4 py-10">

      {/* Background glow */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Signup card */}
      <div className="relative w-full max-w-md rounded-3xl border border-gray-800 bg-[#0d1117] p-6 shadow-2xl shadow-black/40 sm:p-8">

        {/* Logo */}
        <div className="mb-6 text-center">
          <img
            src={logo}
            alt="CodeNoteBook"
            className="mx-auto h-16 w-auto object-contain"
          />

          <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">
            Create your account
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Start your coding workspace with CodeNoteBook
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-400"
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
              className="mt-1.5 w-full rounded-xl border border-gray-800 bg-[#11161d] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
            />
          </div>

          {/* First + Last name */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div>
              <label
                htmlFor="first_name"
                className="text-sm font-medium text-gray-400"
              >
                First name
              </label>

              <input
                id="first_name"
                name="first_name"
                type="text"
                value={formData.first_name}
                onChange={handleChange}
                required
                autoComplete="given-name"
                className="mt-1.5 w-full rounded-xl border border-gray-800 bg-[#11161d] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
              />
            </div>

            <div>
              <label
                htmlFor="last_name"
                className="text-sm font-medium text-gray-400"
              >
                Last name
              </label>

              <input
                id="last_name"
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={handleChange}
                required
                autoComplete="family-name"
                className="mt-1.5 w-full rounded-xl border border-gray-800 bg-[#11161d] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
              />
            </div>

          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-400"
            >
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="mt-1.5 w-full rounded-xl border border-gray-800 bg-[#11161d] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-400"
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
              autoComplete="new-password"
              className="mt-1.5 w-full rounded-xl border border-gray-800 bg-[#11161d] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 flex w-full items-center justify-center rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition duration-300 hover:from-blue-500 hover:to-cyan-400 hover:shadow-blue-500/30 active:scale-[0.99]"
          >
            Create Account
          </button>

        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signin")}
            className="font-medium text-blue-400 transition hover:text-cyan-400"
          >
            Sign in
          </button>
        </p>

      </div>
    </div>
  );
}