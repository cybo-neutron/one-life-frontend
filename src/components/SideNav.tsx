import { Link } from "@tanstack/react-router";
import { LayoutDashboard, Timer, User } from "lucide-react";

const SideNav = () => {
  return (
    <div className=" w-10 h-full flex flex-col items-center bg-secondary-800    ">
      <div className=" mt-2 flex flex-col gap-2">
        <User
          className="text-secondary-300 shadow-md p-1  hover:bg-secondary-200 hover:text-secondary-800 cursor-pointer"
          size={30}
        />
      </div>

      <div className="mt-20 flex flex-col gap-4">
        <Link to={"/dashboard"}>
          <LayoutDashboard
            size={30}
            className="text-secondary-300 shadow-md p-1  hover:bg-secondary-200 hover:text-secondary-800 cursor-pointer"
          />
        </Link>
        <Link to={"/pomodoro"}>
          <Timer
            size={30}
            className="text-secondary-300 shadow-md p-1  hover:bg-secondary-200 hover:text-secondary-800 cursor-pointer"
          />
        </Link>
      </div>

      <div></div>
    </div>
  );
};

export default SideNav;
