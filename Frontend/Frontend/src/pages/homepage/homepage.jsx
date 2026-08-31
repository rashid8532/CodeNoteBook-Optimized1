import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "./logo.png";
import { Link } from "react-router-dom";

export default function Homepage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#05070b] text-white">
      {/* Navbar */}
      <header className="absolute inset-x-0 top-0 z-50 border-b border-gray-800/60">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="CodeNoteBook"
              className="h-11 w-auto"
            />

            <div className="hidden sm:block">
              <p className="text-lg font-semibold">
                Code<span className="text-blue-400">Note</span>Book
              </p>
              <p className="text-[10px] uppercase tracking-wider text-gray-600">
                Coding Workspace
              </p>
            </div>
          </Link>

      

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="
              rounded-xl
              border border-gray-800
              bg-[#11161d]
              p-2
              text-gray-400
              transition
              hover:border-blue-500/40
              hover:text-white
              sm:hidden
            "
          >
            <span className="sr-only">Open menu</span>
            <Bars3Icon className="h-6 w-6" />
          </button>
        </nav>

        {/* Mobile menu */}
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="relative z-50 sm:hidden"
        >
          <div className="fixed inset-0 bg-black/60" />

          <DialogPanel
            className="
              fixed
              inset-y-0
              right-0
              w-full
              max-w-sm
              border-l
              border-gray-800
              bg-[#0d1117]
              p-6
              shadow-2xl
            "
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={logo} alt="CodeNoteBook" className="h-9 w-auto" />
                <span className="font-semibold">
                  Code<span className="text-blue-400">Note</span>Book
                </span>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="
                  rounded-xl
                  border border-gray-800
                  bg-[#11161d]
                  p-2
                  text-gray-400
                  hover:text-white
                "
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-10 space-y-3">
              <Link
                to="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="
                  block
                  rounded-xl
                  border border-gray-800
                  bg-[#11161d]
                  px-4 py-3
                  text-center
                  text-sm
                  font-medium
                  text-gray-300
                  hover:border-blue-500/40
                  hover:text-white
                "
              >
                Sign in
              </Link>

              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="
                  block
                  rounded-xl
                  bg-linear-to-r
                  from-blue-600
                  to-cyan-500
                  px-4 py-3
                  text-center
                  text-sm
                  font-medium
                  text-white
                "
              >
                Get Started
              </Link>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* Hero */}
      <main className="relative isolate overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 -top-60 h-125 w-125 -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />

          <div className="absolute -left-40 top-1/2 h-100 w-100 rounded-full bg-cyan-500/5 blur-3xl" />

          <div className="absolute -right-40 bottom-0 h-100 w-100 rounded-full bg-blue-600/5 blur-3xl" />
        </div>

        <div
          className="
            mx-auto
            flex
            min-h-screen
            max-w-5xl
            items-center
            justify-center
            px-6
            pb-16
            pt-28
            sm:pt-32
          "
        >
          <div className="w-full text-center">

            {/* Small label */}
            <div
              className="
                mx-auto
                mb-6
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-gray-800
                bg-[#0d1117]
                px-4
                py-2
                text-xs
                font-medium
                text-gray-400
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
              Your personal coding workspace
            </div>

            {/* Logo */}
            <img
              src={logo}
              alt="CodeNoteBook"
              className="
                mx-auto
                mb-6
                h-28
                w-auto
                sm:h-36
              "
            />

            {/* Heading */}
            <h1
              className="
                mx-auto
                max-w-4xl
                text-4xl
                font-bold
                tracking-tight
                text-white
                sm:text-5xl
                lg:text-6xl
              "
            >
              Build, Run & Save Code in One
              <span className="block">
                Powerful{" "}
                <span className="text-blue-400">Note</span>
                <span className="text-cyan-400">Book</span>
              </span>
            </h1>

            {/* Description */}
            <p
              className="
                mx-auto
                mt-6
                max-w-2xl
                text-base
                leading-7
                text-gray-500
                sm:text-lg
              "
            >
              Write, run, and manage your code in one place.
              Create projects, organize files, choose your language,
              and execute your code instantly.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/signup"
                className="
                  w-full
                  rounded-xl
                  bg-linear-to-r
                  from-blue-600
                  to-cyan-500
                  px-6
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
                  sm:w-auto
                "
              >
                Start Coding
              </Link>

              <Link
                to="/signin"
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-800
                  bg-[#0d1117]
                  px-6
                  py-3
                  text-sm
                  font-medium
                  text-gray-300
                  transition
                  duration-300
                  hover:border-blue-500/40
                  hover:bg-[#11161d]
                  hover:text-white
                  sm:w-auto
                "
              >
                Sign in
              </Link>
            </div>

            {/* Feature cards */}
            <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">

              <div
                className="
                  rounded-2xl
                  border
                  border-gray-800
                  bg-[#0d1117]
                  p-5
                  text-left
                  transition
                  duration-300
                  hover:border-blue-500/30
                "
              >
                <p className="text-sm font-medium text-white">
                  Projects
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Organize your code into dedicated projects.
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-gray-800
                  bg-[#0d1117]
                  p-5
                  text-left
                  transition
                  duration-300
                  hover:border-blue-500/30
                "
              >
                <p className="text-sm font-medium text-white">
                  Multi-language
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Write and execute code in multiple languages.
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-gray-800
                  bg-[#0d1117]
                  p-5
                  text-left
                  transition
                  duration-300
                  hover:border-cyan-500/30
                "
              >
                <p className="text-sm font-medium text-white">
                  Code Editor
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  A focused workspace for writing and managing code.
                </p>
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}