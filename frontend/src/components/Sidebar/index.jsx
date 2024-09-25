import { Icon, Menu } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const SidebarLink = ({ href, icon, label, isCollapsed }) => {
  const pathName = useLocation();

  const isActive =
    pathName.pathname === href || (pathName === "/" && href === "/dashboard");
  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        }
        hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? "bg-blue-200 text-white" : ""
        }
        `}
      >
        <Icon className="w-6 h-6 !text-gray-700" />
        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};
const Sidebar = () => {
  const dispatch = useDispatch();
  const isSidebarCollapsed = useSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const buttonSidebar = () => {
    dispatch(toggleSidebar(!isSidebarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  }
    bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;
  return (
    <div className={sidebarClassNames}>
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <Avatar>
          <AvatarImage
            src="https://github.com/rabirabii.png"
            alt="logo"
            className="w-8"
          />

          <AvatarFallback>Logo</AvatarFallback>
        </Avatar>
        <h1
          className={`${
            isSidebarCollapsed ? "hidden" : "block"
          } font-extrabold text-2xl`}
        >
          Rabi
        </h1>

        <button
          className="md:hidden px-3 py-3 bg-gray-100 hover:bg-blue-100"
          onClick={buttonSidebar}
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
