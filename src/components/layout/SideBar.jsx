import { Bolt, UsersRound } from "lucide-react";
import reactLogo from "../../assets/react.svg";
import { useLocation, Link } from "react-router";

export default function SideBar({ className }) {
  const location = useLocation();

  // Function untuk check apakah route sedang aktif
  const isActive = (path) => {
    return location.pathname === path;
  };
  return (
    <div
      className={
        "flex flex-col gap-4 lg:px-2 px-1 my-auto items-center justify-center border-r-[3px] border-r-blue-1/50 sticky top-0 left-0 " +
        (className ? ` ${className}` : "")
      }
    >
      <img src={reactLogo} className="lg:w-9 lg:h-9 w-7 h-7" alt="React logo" />

      <div className="my-auto flex flex-col gap-2 lg:p-4 p-1.5 items-center">
        <Link 
          to="/"
          className={`
            ${isActive('/') 
              ? 'bg-blue-3/20 border-2 border-blue-3' 
              : 'hover:bg-blue-1'
            } 
            rounded-lg cursor-pointer p-2.5 transition-all duration-200
          `}
        >
          <UsersRound 
            className={`
              ${isActive('/') ? 'stroke-blue-3' : 'stroke-cream'}
              lg:size-5 size-4
            `} 
            // size={20} 
          />
        </Link>

        {/* Settings Route */}
        <Link 
          to="/settings"
          className={`
            ${isActive('/settings') 
              ? 'bg-blue-3/20 border-2 border-blue-3' 
              : 'hover:bg-blue-1'
            } 
            rounded-lg cursor-pointer p-2.5 transition-all duration-200 
          `}
        >
          <Bolt 
            className={`
              ${isActive('/settings') ? 'stroke-blue-3' : 'stroke-cream'}
              lg:size-5 size-4
            `} 
            size={20} 
          />
        </Link>
      </div>

      <img
        src="https://picsum.photos/id/237/200/300"
        alt="Qiscus Chat UI Logo"
        className="w-8 h-8 rounded-full mt-4"
      />
    </div>
  );
}
