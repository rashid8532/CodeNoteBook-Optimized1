import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "./logo.png";
import user_logo from "./user_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import fileContext from "../../../context/FileContext";
import getUserData from "../../user/userapi";

export default function Navbar({ logout }) {
  const { user, setuser } = useContext(fileContext);
  const navigate = useNavigate();

  useEffect(() => {
    getUserData(setuser);
  }, []);

  return (
    <Disclosure
    as="nav"
    className="border-b border-gray-800 bg-[#05070b] text-white">
      <div className="mx-auto max-w-8xl px-1 pr-2">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <div className="flex items-center">
            <img
              src={logo}
              alt="CodeNoteBook"
              className="h-10 w-auto"
            />

            <div className="ml-3 hidden sm:block">
              <h1 className="text-lg font-semibold">
                Code<span className="text-blue-400">Note</span>Book
              </h1>
              <p className="text-[10px] uppercase tracking-wider text-gray-600">
                Coding Workspace
              </p>
            </div>

            {/* Navigation */}
            <div className="ml-8 hidden items-center gap-1 sm:flex">
              <Link
                to="/"
                className="rounded-lg px-3 py-2 text-sm text-gray-400 transition hover:bg-[#11161d] hover:text-blue-400 pl-7"
              >
                Home
              </Link>
            </div>
          </div>

          {/* Mobile menu */}
          <DisclosureButton className="absolute left-3 rounded-lg p-2 text-gray-400 hover:bg-[#11161d] hover:text-white sm:hidden">
            <Bars3Icon className="size-6 group-data-open:hidden" />
            <XMarkIcon className="hidden size-6 group-data-open:block" />
          </DisclosureButton>

          {/* User */}
          <Menu as="div" className="relative">
            <MenuButton className="group flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-[#11161d] ">
              <span className="text-sm font-medium text-gray-300 transition group-hover:text-white">
                {user.FirstName || "User"}
              </span>

              <img
                src={user_logo}
                alt="Profile"
                className="h-9 w-9 rounded-full border border-gray-800 object-cover transition group-hover:border-blue-500/50"
              />
            </MenuButton>

            <MenuItems className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-gray-800 bg-[#0d1117] p-1 shadow-2xl outline-none">
              <MenuItem>
                <button
                  onClick={() => navigate("/user")}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-400 data-focus:bg-[#11161d] data-focus:text-white"
                >
                  My Profile
                </button>
              </MenuItem>

              <MenuItem>
                <button
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-400 data-focus:bg-[#11161d] data-focus:text-white"
                >
                  Settings
                </button>
              </MenuItem>

              <div className="my-1 border-t border-gray-800" />

              <MenuItem>
                <button
                  onClick={logout}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-500 data-focus:bg-red-500/10 data-focus:text-red-400"
                >
                  Sign out
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>

      {/* Mobile navigation */}
      <DisclosurePanel className="border-t border-gray-800 bg-[#0d1117] sm:hidden">
        <div className="space-y-1 px-4 py-3">
          <Link
            to="/"
            className="block rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-[#11161d] hover:text-blue-400"
          >
            Home
          </Link>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}