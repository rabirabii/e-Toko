import React from "react";
import { Bell, Menu, Moon, Search, Settings, Sun } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, toggleTheme } from "../../Redux";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
const Navbar = () => {
  const dispatch = useDispatch();
  const isSidebarCollapsed = useSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useSelector((state) => state.global.isDarkMode);

  const ButtonSidebar = () => {
    dispatch(toggleSidebar(!isSidebarCollapsed));
  };

  const toggleDarkMode = () => {
    dispatch(toggleTheme(!isDarkMode));
  };
  return (
    <div className="flex justify-between items-center w-full mb-7">
      <div className="flex justify-between items-center gap-5">
        <button
          onClick={ButtonSidebar}
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="relative">
          <Input
            type="search"
            placeholder="Search"
            className="pl-10 pr-4 py-2 w-50 md:w-60 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-500" size={20} />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-5 px-2 mr-1">
        <div className="hidden md:flex justify-between items-center">
          <div className="flex items-center px-2 mr-1">
            <button onClick={toggleDarkMode}>
              {isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          </div>
          <div className="relative">
            <Bell className="cursor-pointer text-gray-500" size={24} />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
              3
            </span>
          </div>
          <hr className="w-0 h-7 border-solid border-1 border-gray-300 mx-3" />
          <div className="flex items-center gap-3 cursor-pointer">
            <Avatar>
              <AvatarImage src="/default.png" alt="avatar" />
              <AvatarFallback>Profile</AvatarFallback>
            </Avatar>
            <span className="font-semibold">User</span>
          </div>
        </div>
        <Link>
          <Settings className="cursor-pointer text-gray-500" size={24} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
